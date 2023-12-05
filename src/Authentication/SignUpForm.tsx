import { useForm } from "@mantine/form";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Stack,
} from "@mantine/core";

export function SignUpForm(props: PaperProps) {
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
      name: (val) => (val.length < 2 ? "Please enter correct name" : null),
      terms: (val) => (val ? null : "Please Tick the Checkbox"),
    },
  });
  const onSubmit = async (values: any) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        form.reset();
        navigate("/login");
        // ...
      })
      .catch((error) => {
        debugger;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  // console.log(form);
  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      {...props}
      style={{ background: "#f0f0f0" }}
    >
      <Text size="xl" fw={500}>
        Welcome to Mantine, Register with
      </Text>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your name"
            {...form.getInputProps("name")}
            radius="md"
          />

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

          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Text size="sm">
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </Text>
          <Button type="submit" radius="sm">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
export default SignUpForm;
