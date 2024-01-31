import {
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SignUpForm() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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

  return (
    <form onSubmit={form.onSubmit(() => {})}>
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
  );
}
