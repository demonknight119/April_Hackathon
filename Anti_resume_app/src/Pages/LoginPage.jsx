import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Header Component
const Header = () => (
  <Box
    bg="teal.500"
    color="white"
    py={4}
    textAlign="center"
    width="100%"
    position="relative"
    zIndex="1"
  >
    <Heading size="lg">Anti-Resume Platform</Heading>
  </Box>
);

// Footer Component
const Footer = () => (
  <Box
    bg="teal.500"
    color="white"
    py={4}
    textAlign="center"
    width="100%"
    position="relative"
    zIndex="1"
    mt="auto"
  >
    <Text>© 2025 Anti-Resume Platform</Text>
    <Text>Follow us on social media</Text>
  </Box>
);

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userDoc = await getDoc(doc(db, "users", user.uid));
      // eslint-disable-next-line no-unused-vars
      const role = userDoc.data()?.role;

      toast({ title: "Logged in successfully!", status: "success" });
      navigate("/dashboard"); // ProtectedRoute handles the redirection
    } catch (err) {
      console.error(err);
      toast({ title: "Login failed", status: "error" });
    }
  };

  return (
    <Flex direction="column" minH="100vh" position="relative" overflow="hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "#f7fafc",
            },
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#38B2AC",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: false,
            },
            size: {
              value: 3,
              random: true,
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#38B2AC",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
          },
          retina_detect: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        maxW="md"
        mx="auto"
        my="auto"
        p={8}
        borderRadius="md"
        bg="white"
        boxShadow="lg"
        zIndex="1"
        position="relative"
      >
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        <Stack spacing={4}>
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            size="lg"
            bg="white"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            size="lg"
            bg="white"
          />
          <Button colorScheme="teal" onClick={handleLogin} size="lg" mt={2}>
            Login
          </Button>
          <Box textAlign="center" mt={4}>
            New user?{" "}
            <Button
              variant="link"
              colorScheme="teal"
              onClick={() => navigate("/register")}
            >
              Register here
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  );
}

export default LoginPage;
