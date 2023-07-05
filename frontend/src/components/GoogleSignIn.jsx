import React from "react";
import { Button, Heading, Box, Flex } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import firebase from "../firebase/config";
import instance from "../axios";
import { useNavigate } from "react-router-dom";

function GoogleSignIn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in:", user);

        const userData = {
          name: user.displayName,
          email: user.email,
        };

        instance
          .post("/api/user", userData)
          .then((response) => {
            console.log("User details saved to MongoDB:", response.data);
            console.log("ID", response.data._id);

            localStorage.setItem("userId", response.data._id);

            navigate("/weather");
          })
          .catch((error) => {
            console.error("Error saving user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      zIndex={999}
      bg="rgba(0, 0, 0, 0.1)"
    >
      <Box textAlign="center" p={8} bg="white" borderRadius="md" boxShadow="lg">
        <Heading as="h2" size="lg" mb={4}>
          Sign In
        </Heading>
        <Button
          leftIcon={<FaGoogle />}
          colorScheme="blue"
          onClick={handleSignIn}
        >
          Sign In with Google
        </Button>
      </Box>
    </Flex>
  );
}

export default GoogleSignIn;
