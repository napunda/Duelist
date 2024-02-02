import {
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Checkbox,
  LoadingOverlay,
  Box,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { auth } from "../../../services/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import WarningDialog from "./WarningDialog";


export default function SignUpForm() {

  const [loading, setLoading] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },

    validate: {
      name: (val) =>
        val.length <= 3 ? "Name should include at least 3 characters" : null,
      terms: (val) =>
        val === false ? "You should accept terms and conditions" : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  async function handleSubmit() {
    setLoading(true);
    const { email, password } = form.values;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: form.values.name });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      open();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            radius="md"
            error={
              form.errors.name && "Name should include at least 3 characters"
            }
          />

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

          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
            error={form.errors.terms && "You should accept terms and conditions"}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
      <WarningDialog message="Sorry, something went wrong. Please try again later." opened={opened} close={close} />
    </Box>
  );
}
