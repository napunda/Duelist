import { useToggle } from "@mantine/hooks";
import { Text, Paper, Group, Divider, Container, Anchor } from "@mantine/core";
import { SocialButton } from "../../components/SocialButton";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Link } from "react-router-dom";

type AuthPageProps = {
  type: "login" | "register";
};

export default function AuthPage({ type }: Readonly<AuthPageProps>) {
  const [currentType, toggle] = useToggle(["login", "register"]);

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
          <SocialButton icon={FaGoogle} radius="xl">
            Google
          </SocialButton>
          <SocialButton icon={FaTwitter} radius="xl">
            Twitter
          </SocialButton>
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
