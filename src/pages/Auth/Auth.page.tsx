import { useToggle } from "@mantine/hooks";
import {
  Text,
  Paper,
  Group,
  Divider,
  Container,
  Anchor,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Link } from "react-router-dom";
import useAuthStore from "../../states/AuthState";

type AuthPageProps = {
  type: "login" | "register";
};

export default function AuthPage({ type }: Readonly<AuthPageProps>) {
  const [currentType, toggle] = useToggle(["login", "register"]);
  const { loginWithGoogle, loginWithGithub } = useAuthStore((state) => state);

  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    toggle(type);
  }, [toggle, type]);

  return (
    <Container size={400} pt={64}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Duelist, {currentType} with
        </Text>
        <Group grow mb="md" mt="md">
          <Button
            variant="default"
            radius="xl"
            leftSection={<FcGoogle />}
            onClick={() => loginWithGoogle()}
          >
            Google
          </Button>
          <Button
            variant="default"
            radius="xl"
            leftSection={
              <FaGithub color={colorScheme == "dark" ? "white" : "default"} />
            }
            onClick={() => loginWithGithub()}
          >
            Github
          </Button>
        </Group>
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
        {currentType === "login" ? <LoginForm /> : <SignUpForm />}
        <Link to={currentType === "register" ? "/login" : "/sign-up"}>
          <Anchor component="button" type="button" c="dimmed" size="xs">
            {currentType === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
        </Link>
      </Paper>
    </Container>
  );
}
