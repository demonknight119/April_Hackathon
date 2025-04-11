import {
  Box,
  Button,
  Input,
  Stack,
  Select,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: formData.email,
        name: formData.name,
        role: formData.role,
      });
      toast({ title: "Registered successfully!", status: "success" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({ title: "Error registering", status: "error" });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={4}>Register</Heading>
      <Stack spacing={4}>
        <Input name="name" placeholder="Name" onChange={handleChange} />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Select name="role" onChange={handleChange}>
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
        </Select>
        <Button colorScheme="teal" onClick={handleSubmit}>
          Register
        </Button>
        <Box textAlign="center">
          Already registered?{" "}
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default RegisterPage;
