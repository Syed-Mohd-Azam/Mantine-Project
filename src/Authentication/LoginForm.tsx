import { useState } from "react";
import { useForm } from "@mantine/form";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
export function LoginForm(props: PaperProps) {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const onLogin = (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(true);
      });
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      {...props}
      style={{ background: "#f0f0f0" }}
    >
      <Text size="xl" fw={500}>
        Welcome to Mantine, Login with
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      {error && <Text c="blue">Wrong Password or Email. Try Again!</Text>}
      <form
        onSubmit={form.onSubmit((values) => {
          onLogin(values);
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="Your Email address"
            {...form.getInputProps("email")}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Text size="sm">
            Don't have an account? <NavLink to="/signup">Register</NavLink>
          </Text>
          <Button type="submit" radius="sm">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
export default LoginForm;
