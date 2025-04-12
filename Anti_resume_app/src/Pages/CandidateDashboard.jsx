import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Progress,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import fakeJobs from "../Data/fakeJobs";
import fakeChallenges from "../Data/fakeChallenges";
import ChallengeCard from "../Components/ChallengeCard";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [userScores, setUserScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) return;
      try {
        const submissionSnapshot = await getDocs(
          collection(db, `users/${user.uid}/challengeSubmissions`)
        );

        const scores = {};
        submissionSnapshot.forEach((doc) => {
          const data = doc.data();
          const percentage = (data.score / data.total) * 10;
          scores[data.challengeId] = Math.round(percentage);
        });

        setUserScores(scores);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user]);

  const calculateMatchScore = (job) => {
    const total = Object.keys(job.requiredScores).length;
    const matched = Object.entries(job.requiredScores).filter(
      ([challengeId, requiredScore]) => userScores[challengeId] >= requiredScore
    ).length;

    return (matched / total) * 100;
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="6xl" mx="auto" mt={10}>
      <Heading mb={6}>Welcome Candidate!</Heading>

      <Heading size="md" mb={4}>
        Job Matches
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={10}>
        {fakeJobs.map((job) => {
          const matchScore = calculateMatchScore(job);
          return (
            <Box
              key={job.id}
              p={5}
              borderWidth={1}
              borderRadius="lg"
              shadow="md"
            >
              <Heading size="md" mb={2}>
                {job.title}
              </Heading>
              <Text fontSize="sm" mb={3}>
                {job.description}
              </Text>
              <VStack spacing={2} align="stretch">
                <Text>Match Score: {Math.round(matchScore)}%</Text>
                <Progress value={matchScore} colorScheme="teal" size="sm" />
              </VStack>
            </Box>
          );
        })}
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Available Challenges
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {fakeChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CandidateDashboard;
