import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import fakeChallenges from "../Data/fakeChallenges";
import ChallengeCard from "../Components/ChallengeCard";

const CandidateDashboard = () => {
  return (
    <Box maxW="6xl" mx="auto" mt={10}>
      <Heading mb={6}>Welcome Candidate!</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {fakeChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CandidateDashboard;
