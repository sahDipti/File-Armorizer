import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import BackgroundImage from '../components/BackgroundImage'
import { Box, Button, Flex, Image, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import axios from 'axios';
import { saveAs } from 'file-saver';

export default function HomePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);
    // const [pdfFile, setPdfFile] = useState(null);
    const [userPassword, setUserPassword] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    console.log(`Box ${boxNumber} clicked`);
    // Add your logic for box click handling here
    };

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleSubmitPdf = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userPassword', userPassword);

        axios.post('http://172.20.193.141:8000/password', formData, { responseType: 'blob' })
            .then(response => {
                // Create a Blob object from the response data
                setUserPassword("")
                const blob = new Blob([response.data]);

                // Save the Blob object as a file using FileSaver.js
                saveAs(blob, 'modified_file.pdf');
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

  return (
    <>
        <Navbar />
        <Box
            as="header"
            bgColor="black"
            bgSize="cover"
            bgPosition="center"
            h="200vh"
            >
            <Flex
              justify="center"
              align="center"
              h="calc(100vh + 120px)" // Subtracting the height of Navbar from viewport height
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
                      <Flex color="white" alignItems="center" justifyContent="center">
                        <Text fontSize="24px" >Please choose your file type.</Text>
                      </Flex>
                      <Flex mt={8} justifyContent="center" flexWrap="wrap">
                                        {[1, 2, 3, 4, 5, 6].map((boxNumber) => (
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
