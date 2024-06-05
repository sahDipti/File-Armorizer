import { Box, Text, Flex, Image } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useState } from "react";

// Sample data for the cards
const cardData = [
  {
    name: "Arjun Khare",
    image: "data:image/jpeg;base64,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", // Replace with actual image URL
  },
  {
    name: "Dipti Raj Sah",
    image: "data:image/jpeg;base64,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", // Replace with actual image URL
  }
];

export default function AboutUs() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <>
      <Navbar />
      <Box
        as="header"
        bgColor="black"
        bgSize="cover"
        bgPosition="center"
        h="100vh"
      >
        <Flex
          direction="column"
          alignItems="center"
          justify="center"
          h="calc(110vh - 68px)"
        //   h="100%"
        >
          <Text fontSize="70px" fontWeight="bold" color="white" mb="1" >
            About Us
          </Text>
          <Text fontSize="20px" color="white" textAlign="center" maxWidth="1000px">
          Welcome to our cryptography hub! We're two passionate Computer Science and Engineering students from NIT Warangal, specializing in steganography and password protection techniques. Our mission is to make cryptography accessible and user-friendly, empowering individuals to safeguard their digital assets with confidence.
          </Text>
          <Flex mt="8" justify="center" flexWrap="wrap" gap="60px">
            {cardData.map((person, index) => (
              <Box
                key={index}
                m="1"
                position="relative"
                onMouseEnter={() => setSelectedPerson(person)}
                onMouseLeave={() => setSelectedPerson(null)}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  width="200px"
                  height="200px"
                  objectFit="cover"
                  borderRadius="50%"
                  transition="transform 0.3s ease-in-out, border-radius 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.3)" , borderRadius: "5%" }}
                />
                <Text
                  fontSize="24px"
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  mt="6"
                >
                  {person.name}
                </Text>
                <Text
                  fontSize="16px"
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  mt="1"
                >
                  B.Tech CSE 3rd Year
                </Text>
                {/* {selectedPerson && selectedPerson.name === person.name && (
                  <Box
                    bgColor="rgba(0, 0, 0, 0.8)"
                    color="white"
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p="4"
                    textAlign="center"
                    borderRadius="md"
                  >
                    <Text>{person.description}</Text>
                  </Box>
                )} */}
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
