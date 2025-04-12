import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Heading,
  Stack,
  Text,
  Spinner,
  Divider,
  Button,
} from "@chakra-ui/react";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CompanyDashboard = () => {
  const toast = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const snapshot = await getDocs(
          collectionGroup(db, "challengeSubmissions")
        );
        const subs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          userId: doc.ref.path.split("/")[1], // Extract user ID from path
        }));
        setSubmissions(subs);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const groupByChallenge = () => {
    const grouped = {};
    submissions.forEach((sub) => {
      if (!grouped[sub.challengeId]) grouped[sub.challengeId] = [];
      grouped[sub.challengeId].push(sub);
    });
    return grouped;
  };

  const groupedSubmissions = groupByChallenge();

  const handleInvite = (userId) => {
    toast({
      title: "Interview Invite Sent!",
      description: `An interview invite has been sent to user with ID: ${userId}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="6xl" mx="auto" mt={10}>
      <Heading mb={6}>Company Dashboard</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        Object.entries(groupedSubmissions).map(([challengeId, subs]) => (
          <Box
            key={challengeId}
            mb={10}
            p={4}
            borderWidth={1}
            borderRadius="lg"
          >
            <Heading size="md" mb={2}>
              Challenge: {challengeId}
            </Heading>
            <Divider mb={4} />
            <Stack spacing={4}>
              {/* Sort by score in descending order */}
              {subs
                .sort((a, b) => b.score - a.score)
                .map((sub) => (
                  <Box key={sub.userId} p={3} borderWidth={1} borderRadius="md">
                    <Text>
                      <strong>User ID:</strong> {sub.userId}
                    </Text>
                    <Text>
                      <strong>Score:</strong> {sub.score} / {sub.total}
                    </Text>
                    <Text>
                      <strong>Submitted At:</strong>{" "}
                      {new Date(
                        sub.submittedAt.seconds * 1000
                      ).toLocaleString()}
                    </Text>
                    <Button
                      colorScheme="teal"
                      mt={4}
                      onClick={() => handleInvite(sub.userId)}
                    >
                      Send Interview Invite
                    </Button>
                  </Box>
                ))}
            </Stack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CompanyDashboard;
