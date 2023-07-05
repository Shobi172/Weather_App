import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");

    navigate("/");
  };

  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      <Heading as="h1" size="lg">
        Weather App
      </Heading>
      {isLoggedIn && (
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Flex>
  );
}

export default Navbar;
