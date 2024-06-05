// Navbar.js
import { Flex,Link, Spacer,Menu,MenuButton , Avatar, MenuList, MenuItem, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="flex-end"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      bgColor="black"
      zIndex="1000"
    >
      <Spacer />
      <Flex gap="10px" p="25px"> 
        {/* <Link fontSize="30px" href="#" color="white">Home</Link> */}
        <Link fontSize="30px" href = "/about" color="white">About Us</Link>
        {/* <Link fontSize="30px" href="#" color="white">Contact</Link> */}
      </Flex>
      <Box p="15px">
        <Menu>
            <MenuButton
            as={Avatar}
            size="md"
            bg="teal.500"
            _hover={{
                cursor: "pointer",
                }}
                />
            <MenuList p="5px" boxSize="45px" justifyContent="center">
            <MenuItem color="red" >
                Sign Out
            </MenuItem>
            {/* Add more menu items as needed */}
            </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
