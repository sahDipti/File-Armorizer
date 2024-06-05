import cv2
import os

import numpy as np
from stepic import encode as en
from stepic import decode as de
from os import system
from eyed3 import load
from PIL import Image
from flask import Flask, request, send_file , send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
from io import BytesIO
import PyPDF2

app = Flask(__name__)
CORS(app)

def data2binary(data):
    if type(data) == str:
        p = ''.join([format(ord(i), '08b')for i in data])
    elif type(data) == bytes or type(data) == np.ndarray:
        p = [format(i, '08b')for i in data]
    return p

def hidedata(img, data):
    data += "$$"                                   #'$$'--> secrete key
    d_index = 0
    b_data = data2binary(data)
    len_data = len(b_data)

    for value in img:
        for pix in value:
            r, g, b = data2binary(pix)
            if d_index < len_data:
                pix[0] = int(r[:-1] + b_data[d_index])
                d_index += 1
            if d_index < len_data:
                pix[1] = int(g[:-1] + b_data[d_index])
                d_index += 1
            if d_index < len_data:
                pix[2] = int(b[:-1] + b_data[d_index])
                d_index += 1
            if d_index >= len_data:
                break
    return img

def find_data(img):
    bin_data = ""
    for value in img:
        for pix in value:
            r, g, b = data2binary(pix)
            bin_data += r[-1]
            bin_data += g[-1]
            bin_data += b[-1]

    all_bytes = [bin_data[i: i + 8] for i in range(0, len(bin_data), 8)]

    readable_data = ""
    for x in all_bytes:
        readable_data += chr(int(x, 2))
        if readable_data[-2:] == "$$":
            break
    return readable_data[:-2]


def encode(img2,message):
    img_name = img2
    image = cv2.imread(img_name)
    img = Image.open(img_name, 'r')
    w, h = img.size
    data = message
    if len(data) == 0:
        raise ValueError("Empty data")
    enc_img = "encoded_file.png"
    enc_data = hidedata(image, data)
    cv2.imwrite(enc_img, enc_data)
    img1 = Image.open(enc_img, 'r')
    img1 = img1.resize((w, h),Image.LANCZOS)
    # optimize with 65% quality
    if w != h:
        img1.save(enc_img, optimize=True, quality=65)
    else:
        img1.save(enc_img)
    return enc_img

def decode(img1):
    img_name = img1
    image = cv2.imread(img_name)
    img=Image.open(img_name,'r')
    msg = find_data(image)
    return msg



def add_password_protection(input_pdf, output_pdf, user_password, owner_password=None):
    with open(input_pdf, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        writer = PyPDF2.PdfWriter()

        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            writer.add_page(page)

        writer.encrypt(user_password, owner_password)
        
        with open(output_pdf, 'wb') as output_file:
            writer.write(output_file)

@app.route('/')
def hello():
    print("Default")
    return "Hello, World!"

@app.route('/steganograph', methods=['POST'])
def upload_files():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    
    user_message = request.form['message']
    filetype = int(request.form['filetype'])
    enc = int(request.form["encode"])

    print(user_message)
    print(filetype)
    print(enc)

    if filetype==1:     #Image
        if enc==1:
            filename = secure_filename(file.filename)
            temp_file_path = f'temp_{filename}'
            file.save(temp_file_path)
            encode(temp_file_path, user_message)
            print(decode("encoded_file.png"))

            image_directory = os.getcwd()
            image_name = "encoded_file.png"
            return send_from_directory(image_directory,image_name,as_attachment=True)
            # return send_file("encoded_file.png", mimetype='image/png')
            # image_path = 'encoded_file.png'
            # return Response(image_binary, mimetype='image/png')
        else:
            filename = secure_filename(file.filename)
            temp_file_path = f'temp_{filename}'
            file.save(temp_file_path)
            msg =  decode(temp_file_path)
            print(msg)
            return msg
    else:
        if enc==1:
            filename = secure_filename(file.filename)
            temp_file_path = f'temp_{filename}'
            file.save(temp_file_path)
            audio = temp_file_path
            img_name = "bright.png"

            audio=load(audio)

            img = Image.open(img_name)
            img_stegno = en(img, user_message.encode())
            img_stegno.save(img_name)

            audio.initTag()
            audio.tag.images.set(3,open(img_name,"rb").read(), "image/png")
            audio.tag.save()
            return send_file(temp_file_path, as_attachment=True)
        else:
            filename = secure_filename(file.filename)
            temp_file_path = f'temp_{filename}'
            file.save(temp_file_path)
            audio = temp_file_path
            audio= load(audio)

            img= open("temp-img.png","wb")
            img.write(audio.tag.images[0].image_data)
            img.close()

            img = Image.open("temp-img.png")
            text=de(img)
            system("del temp-img.png")
            print("Data is ",str(text))
            return str(text)

    


@app.route('/password', methods=['POST'])
def protect():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    

    user_password = request.form['userPassword']

    temp_file_path = 'temp_file.pdf'  # Provide a suitable temporary file path
    file.save(temp_file_path)

    # Create a unique output file path for the modified PDF
    output_file_path = 'modified_file.pdf'  # Provide a suitable output file path

    # Add password protection to the uploaded PDF
    add_password_protection(temp_file_path, output_file_path, user_password)

    return send_file(output_file_path, as_attachment=True,download_name="protected.pdf")

if __name__ == '__main__':
    app.run(host="192.168.204.24" ,port=8000, debug=True)