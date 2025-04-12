import { Box, Flex, Heading, Button, Spacer } from "@chakra-ui/react";
//import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <Box
      as="header"
      bg="teal.500"
      color="white"
      py={4}
      px={8}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex alignItems="center" maxW="8xl" mx="auto">
        <Heading
          size="lg"
          cursor="pointer"
          onClick={() => navigate(user ? "/dashboard" : "/")}
        >
          Anti-Resume Platform
        </Heading>

        <Spacer />

        <Flex alignItems="center" gap={4}>
          {/* <Button
            size="sm"
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{ bg: "teal.600" }}
            leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          >
            {colorMode === "light" ? "Dark" : "Light"}
          </Button> */}

          {user ? (
            <Button
              size="sm"
              onClick={handleLogout}
              variant="outline"
              _hover={{ bg: "teal.600" }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                _hover={{ bg: "teal.600" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                variant="outline"
                _hover={{ bg: "teal.600" }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
