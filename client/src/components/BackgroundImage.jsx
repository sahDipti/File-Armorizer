import { Box, Text, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaLockOpen } from 'react-icons/fa';

const BackgroundImage = () => {
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <Box
      as="header"
      bgColor="black"
      bgSize="cover"
      bgPosition="center"
      h="200vh"
    >
       <Text
        fontSize="100px"
        fontWeight="bold"
        color="White"
        position="absolute"
        top="20%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="100"
      >
        File Armorizer
      </Text> 

    </Box>
  );
};

export default BackgroundImage;
