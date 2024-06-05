import Navbar from '../components/Navbar'
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useState , useRef } from 'react'
import BackgroundImage from '../components/BackgroundImage'
import { Box, Button, Flex, Image, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, Heading, Tooltip,Radio, RadioGroup,Stack,Input} from '@chakra-ui/react'
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function DisplayPage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [userPassword, setUserPassword] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [encode,setEncode] = useState(1);
    const [textInput, setTextInput] = useState("");
    const [receivedMessage,setReceivedMessage] = useState("");
    const [imageSrc, setImageSrc] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageSrc('');
    setAudioSrc('')
  };

  const handleEncodeDecodeChange = (value) => {
    setEncode(value);
    console.log(encode);
  };

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    console.log(`Box ${boxNumber} clicked`);
    setSubmitDisabled(false);
    };

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleSubmitFileType = () => {
        setSubmitted(true);
    }

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleStegFileSend = () => {
        const formData = new FormData();
        formData.append('file',selectedFile);
        formData.append('filetype',selectedBox);
        formData.append('encode',encode);
        formData.append('message',textInput);

        axios.post('http://192.168.204.24:8000/steganograph', formData,{
          responseType: 'arraybuffer',
        })
            .then(response => {
              
              if(selectedBox===1){
                if(encode === "1"){
                  const blob = new Blob([response.data], { type: 'image/png' });
                  const imageUrl = URL.createObjectURL(blob);
                  setImageSrc(imageUrl);
                }
                else{
                  const uint8Array = new Uint8Array(response.data);
                  setReceivedMessage(String.fromCharCode.apply(null, uint8Array));
                }
              }
              else{
                if(encode === "1"){
                  console.log("here")
                  const blob = new Blob([response.data], { type: 'audio/mpeg' });
                  const audioUrl = URL.createObjectURL(blob);
                  console.log(audioUrl)
                  setAudioSrc(audioUrl);
                }
                else{
                  console.log("here")
                  const uint8Array = new Uint8Array(response.data);
                  setReceivedMessage(String.fromCharCode.apply(null, uint8Array));
                }
              }
            })
            .catch(error => {
                console.error(error);
            })

    }
    
    const handleSubmitPdf = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userPassword', userPassword);

        axios.post('http://192.168.204.24:8000/password', formData, { responseType: 'arraybuffer' })
            .then(response => {
                // Create a Blob object from the response data
                const blob = new Blob([response.data], { type: 'image/jpeg' });

                // Save the Blob object as a file using FileSaver.js
                saveAs(blob, 'modified_file.pdf');
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    const handleTextInputChange = (event) => {
      setTextInput(event.target.value);
    };

    const getImageAcceptAttribute = () => ".png";
    const getAudioAcceptAttribute = () => ".mp3";

  return (
    <>
        <Navbar />
        <Box
            as="header"
            bgColor="black"
            bgSize="cover"
            bgPosition="center"
            position="relative"
            h="70vh"
            >
            <Text
                fontSize="100px"
                fontWeight="bold"
                color="White"
                position="absolute"
                top="20vh"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="100"
            >
                File Armorizer
            </Text> 
            <Flex
            direction="column"
            justify="center"
            align="center"
            position="absolute"
            top="30vh"
            left="50%"
            transform="translateX(-50%)"
            w="100%"
            zIndex="100"
          >
            <Flex
              justify="space-around"
              align="center"
              gap="20px"
              p="20px"
              color="white"
            >
              <Box
                flex="1"
                p="20px"
                bgColor="transparent"
                _hover={{ 
                  boxShadow: "0 0 10px white" // Add white box shadow on hover
                }}
                display="flex"
                gap="15px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="50%"
              >
                <Heading as="h1">Steganography</Heading>
                <Text fontSize="18px" textAlign="center">Steganography is the technique of hiding data within an ordinary, nonsecret file or message to avoid detection; the hidden data is then extracted at its destination. Steganography use can be combined with encryption as an extra step for hiding or protecting data.</Text>
              </Box>
              <Box
                flex="1"
                p="20px"
                bgColor="transparent"
                _hover={{ 
                  boxShadow: "0 0 10px white" // Add white box shadow on hover
                }}
                display="flex"
                gap="15px"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="50%"
              >
                <Heading as="h1">Password protection</Heading>
                <Text fontSize="18px" textAlign="center">A password-protected PDF is a type of PDF document that requires a password to be entered before the document can be viewed, edited, printed, or otherwise accessed. When a PDF file is encrypted with a password, it adds a layer of security by restricting unauthorized access to the contents of the document.</Text>

              </Box>
            </Flex>
          </Flex>
        </Box>
        
          <Box
          as="header"
          bgColor="black"
          // bgSize="cover"
          bgPosition="center"
          h="150vh"
          >
          <Flex
            justify="center"
            align="center"
            // h="calc(100vh + 120px)" // Subtracting the height of Navbar from viewport height
            >
            <Box width="70%">
              <Tabs isFitted variant="unstyled">
                <TabList>
                  <Tab fontSize="30px" color="white" _hover={{ color: 'white'}}>Steganography</Tab>
                  <Tab fontSize="30px" color="white" _hover={{ color: 'white'}}>Password Protection</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="3px"
                  bg="blue.500"
                  borderRadius="2px"
                  />
                <TabPanels>
                  <TabPanel>
                  {submitted ? (
                    <>
                    <IconButton
                      aria-label="Go back"
                      icon={<ArrowBackIcon />}
                      onClick={() => setSubmitted(false)}
                      colorScheme="blue"
                      variant="outline"
                      _hover={{ bg: "blue.500", color: "white" }}
                    />
                    <Flex direction="column" color="white" alignItems="center" justifyContent="center">
                      {selectedBox === 1 ? <Text fontSize="3xl" >IMAGE</Text> : <Text fontSize="3xl">AUDIO</Text>}

                      <Box textAlign="center" p="8" mt="20px" borderWidth="2px" borderRadius="lg" boxShadow="lg" h="200px" w="50%" bg="white">
                        <Text color="black" fontSize="2xl"  fontWeight="bold">Upload Your File</Text>
                        <input
                          type="file"
                          accept={selectedBox === 1 ? getImageAcceptAttribute() : getAudioAcceptAttribute()}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <Button mt="30px" colorScheme="blue" cursor="pointer" variant="outline" _hover={{ bg: "blue.500", color: "white" }} onClick={handleButtonClick}>
                            Choose File
                        </Button>
                        </Box>
                        {selectedFile && (
                          <Box mt="4" >
                            <Flex direction="column" justifyItems="center" alignItems="center">
                              <Flex p="4px" gap="10px">   
                                <Text fontWeight="bold">Selected File:</Text>
                                <Text color="blue.500">{selectedFile.name}</Text>
                                <Text fontWeight="bold">File Size:</Text>
                                <Text color="blue.500">{(selectedFile.size / 1024).toFixed(2)} KB</Text>
                                <Text fontWeight="bold">File Type:</Text>
                                <Text color="blue.500">{selectedFile.type}</Text>
                              </Flex>
                              {imageSrc && <img src={imageSrc} alt="Server Image" />}
                              {audioSrc && (
                                <audio controls>
                                  <source src={audioSrc} type="audio/mpeg" />
                                  Your browser does not support the audio element.
                                </audio>
                              )}
                              <RadioGroup onChange={handleEncodeDecodeChange} value={encode}>
                                <Stack direction="row">
                                  <Radio value="1">Encode</Radio>
                                  <Radio value="2" >Decode</Radio>
                                </Stack>
                              </RadioGroup>
                              {encode==="1" && (
                                  <Input mt="10px" placeholder="Enter your text" value={textInput} onChange={handleTextInputChange} size="md" variant="outline" />
                              )}
                              {receivedMessage && (
                                <Text mt="4" fontWeight="bold">Your secret message is:<Text color="blue" fontWeight="none"> {receivedMessage}</Text></Text>
                              )}
                              <Button size="lg" colorScheme="blue" mt={4} onClick={handleStegFileSend} isDisabled={submitDisabled}>Submit</Button>
                            </Flex>
                          </Box>
                        )}
                    </Flex>
                  </>
                    ) : (
                    <Flex direction="column" color="white" alignItems="center" justifyContent="center">
                      <Text fontSize="24px" >Please choose your file type.</Text>
                    <Flex mt={8} justifyContent="center" flexWrap="wrap">
                                      {[1, 2].map((boxNumber) => (
                                        <Box
                                        key={boxNumber}
                                        color="white"
                                        onClick={() => handleBoxClick(boxNumber)}
                                        borderRadius="md"
                                        borderWidth="2px"
                                        _hover={
                                            {borderColor:"blue.500"}
                                          }
                                          w="200px"
                                          h="200px"
                                          m={2}
                                          textAlign="center"
                                          lineHeight="100px"
                                          cursor="pointer"
                                          borderColor={selectedBox === boxNumber ? "blue.500" : "white"}
                                          
                                          
                                          >
                                            <Image alignItems="center" justifyContent="center" h="100%" w="100%" 
                                              src={require(`./image${boxNumber}.png`)}
                                              alt={`image${boxNumber}.png`} 
                                              
                                              />
                                          </Box>
                                      ))}
                                  </Flex>
                                  <Tooltip label="Please select file type first" isOpen={submitDisabled}>
                                    <Button size="lg" colorScheme="blue" mt={4} onClick={handleSubmitFileType} isDisabled={submitDisabled}>Next</Button>
                                  </Tooltip>
                            </Flex>
      )}
                  </TabPanel>
                  <TabPanel>
                  <Flex color="white" flexDirection="column" alignItems="center">
                      <Text fontSize="24px">Upload a PDF file for password protection:</Text>
                      <input type="file" onChange={handleFileChange} style={{ marginTop: '10px' }} />
                      <Text fontSize="24px" mt={4}>Enter User Password:</Text>
                      <input type="password" value={userPassword} onChange={handleUserPasswordChange} style={{ marginTop: '10px' ,color:"black"}} />
                      <Button colorScheme="blue" mt={4} onClick={handleSubmitPdf}>Submit</Button>
                  </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
      </Box>
        
        
        
        

    </>
  )
}
