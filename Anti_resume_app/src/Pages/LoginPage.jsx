import { Box, Button, Input, Stack, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

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
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={4}>Login</Heading>
      <Stack spacing={4}>
        <Input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        <Box textAlign="center">
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
  );
}

export default LoginPage;
