import { Stack, TextInput, PasswordInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import WarningDialog from "./WarningDialog";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../states/AuthState";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [opened, { close, open }] = useDisclosure(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { login, loginError, isLoggedIn } = useAuthStore((state) => state);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loginError) {
      setMessage(loginError);
      open();
    }
  }, [loginError, open]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todos");
    }
  }, [isLoggedIn, navigate]);

  async function handleSubmit() {
    const { email, password } = form.values;

    await login({ email, password });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          label="Email"
          placeholder="email@duelist.dev"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
          radius="md"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          error={
            form.errors.password &&
            "Password should include at least 6 characters"
          }
          radius="md"
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Button type="submit" radius="xl">
          Login
        </Button>
      </Group>
      <WarningDialog message={message} opened={opened} close={close} />
    </form>
  );
}
