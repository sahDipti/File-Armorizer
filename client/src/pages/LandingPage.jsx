import React from 'react'
import Navbar from '../components/Navbar'
import { Box, Text, Flex, Button, Heading } from '@chakra-ui/react'

export default function LandingPage() {
  return (
    <>
        <Navbar />
        <Box
            as="header"
            bgColor="black"
            bgSize="cover"
            bgPosition="center"
            position="relative"
            h="100vh"
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
                <Text fontSize="18px" textAlign="center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, optio libero? Quaerat beatae quam, dicta quo sapiente veritatis aliquam tempora blanditiis sunt dolore id aliquid eligendi vitae a vero labore.</Text>
                <Button>Button 1</ Button>
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
                <Text fontSize="18px" textAlign="center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, optio libero? Quaerat beatae quam, dicta quo sapiente veritatis aliquam tempora blanditiis sunt dolore id aliquid eligendi vitae a vero labore.</Text>
                <Button>Button 2</Button>
              </Box>
            </Flex>
          </Flex>
        </Box>
        {/* <Flex
        justify="space-around"
        align="center"
        h="80vh"
        p="20px"
        bgColor="black"
        color="white"
      >
        <Box
          w="45%"
          h="100%"
          bgColor="transparent"
          _hover={{ 
            boxShadow: "0 0 10px white" // Add white box shadow on hover
          }}
        >
          <Text fontSize="24px" textAlign="center">Partition 1</Text>
        </Box>
        <Box
          w="45%"
          h="100%"
          bgColor="transparent"
          _hover={{ 
            boxShadow: "0 0 10px white" // Add white box shadow on hover
          }}
        >
          <Text fontSize="24px" textAlign="center">Partition 2</Text>
        </Box>
      </Flex> */}
        
        

    </>
  )
}
