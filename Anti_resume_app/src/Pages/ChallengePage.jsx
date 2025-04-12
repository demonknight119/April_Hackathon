// src/pages/ChallengePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDoc } from "firebase/firestore";
import { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Text,
  useToast,
} from "@chakra-ui/react";
import fakeChallenges from "../Data/fakeChallenges";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ChallengePage = () => {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const challenge = fakeChallenges.find((ch) => ch.id === id);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkSubmission = async () => {
      if (!user) return;
      const submissionRef = doc(
        db,
        `users/${user.uid}/challengeSubmissions`,
        id
      );
      const submissionSnap = await getDoc(submissionRef);
      if (submissionSnap.exists()) {
        setAlreadySubmitted(true);
      }
    };
    checkSubmission();
  }, [user, id]);

  if (alreadySubmitted) {
    return (
      <Box textAlign="center" mt={10}>
        <Heading size="md">You’ve already attempted this challenge!</Heading>
        <Text>You cannot retake it.</Text>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const handleOptionChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== challenge.questions.length) {
      toast({ title: "Please answer all questions.", status: "warning" });
      return;
    }

    setSubmitting(true);

    let score = 0;
    challenge.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score += 1;
    });

    const submission = {
      score,
      total: challenge.questions.length,
      answers,
      challengeId: id,
      submittedAt: new Date(),
    };

    try {
      await setDoc(
        doc(db, `users/${user.uid}/challengeSubmissions`, id),
        submission
      );
      toast({ title: "Challenge submitted!", status: "success" });
      navigate("/submit-success");
    } catch (err) {
      console.error(err);
      toast({ title: "Error submitting challenge.", status: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!challenge) return <Text>Challenge not found</Text>;

  return (
    <Box maxW="3xl" mx="auto" mt={10}>
      <Heading mb={6}>{challenge.title}</Heading>
      <Stack spacing={6}>
        {challenge.questions.map((q, index) => (
          <Box key={index}>
            <Text mb={2}>
              {index + 1}. {q.question}
            </Text>
            <RadioGroup
              onChange={(value) => handleOptionChange(index, value)}
              value={answers[index] || ""}
            >
              <Stack spacing={2}>
                {q.options.map((opt, i) => (
                  <Radio key={i} value={opt}>
                    {opt}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        ))}
      </Stack>
      <Button
        mt={8}
        colorScheme="teal"
        onClick={handleSubmit}
        isLoading={submitting}
      >
        Submit Challenge
      </Button>
    </Box>
  );
};

export default ChallengePage;
