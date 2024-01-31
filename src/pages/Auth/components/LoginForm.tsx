import { Stack, TextInput, PasswordInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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

  return (
    <form onSubmit={form.onSubmit(() => {})}>
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
    </form>
  );
}
