// src/pages/SubmitSuccess.jsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SubmitSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="lg" mx="auto" mt={16} textAlign="center">
      <Heading size="lg" mb={4}>
        🎉 Challenge Submitted Successfully!
      </Heading>
      <Text fontSize="lg" mb={6}>
        Your answers have been recorded and your score is now saved.
      </Text>
      <Button colorScheme="teal" onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default SubmitSuccess;
