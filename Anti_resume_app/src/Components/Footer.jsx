import { Box, Flex, Text, Link, HStack, Icon } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" py={6} mt="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="8xl"
        mx="auto"
        px={8}
        justify="space-between"
        align="center"
        gap={4}
      >
        <Text>&copy; 2025 Anti-Resume Platform. All rights reserved.</Text>

        <HStack spacing={4}>
          <Link href="#" isExternal>
            <Icon as={FaTwitter} boxSize={5} />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaLinkedin} boxSize={5} />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaGithub} boxSize={5} />
          </Link>
        </HStack>

        <HStack spacing={6}>
          <Link href="#">About</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Contact</Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
