// src/components/ChallengeCard.jsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" shadow="md">
      <Heading size="md" mb={2}>
        {challenge.title}
      </Heading>
      <Text mb={4}>{challenge.description}</Text>
      <Button
        colorScheme="teal"
        onClick={() => navigate(`/challenge/${challenge.id}`)}
      >
        Start Challenge
      </Button>
    </Box>
  );
};

export default ChallengeCard;
