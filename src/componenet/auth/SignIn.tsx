import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import cogoToast from "cogo-toast";
import { Formik, FormikHelpers } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { ICreateUser, useAuthUserMutation } from "../../generated/graphql";
import { useAppState } from "../../store";

const initialValues: ICreateUser = { hash: "", username: "" };

const validationSchema = Yup.object().shape({
  hash: Yup.string().min(8).required("password is required"),
  username: Yup.string().required("username is required"),
});

const SignIn: FC<{
  closeToggle: VoidFunction;
  toggleLogin: VoidFunction;
}> = ({ closeToggle, toggleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthTrue } = useAppState();
  const [registerUser] = useAuthUserMutation();

  const handleSubmit = async (
    val: ICreateUser,
    action: FormikHelpers<ICreateUser>
  ) => {
    action.setSubmitting(true);

    const response = await registerUser({
      variables: { options: { hash: val.hash, username: val.username } },
    });

    if (response.data?.authUser.success) {
      setAuthTrue({
        email: "",
        isAuth: true,
        jwt: response.data?.authUser.jwt,
        name: response.data?.authUser.username,
      });
      cogoToast.success(response.data?.authUser.msg);
      closeToggle();
    } else {
      cogoToast.error(response.data?.authUser.msg);
    }

    action.setSubmitting(false);
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack mx={"auto"} maxW={"lg"} py={5} px={2} w="85%">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign in
          </Heading>
          <Text fontSize={"lg"}>to enjoy all of our cool features ✌️</Text>
        </Stack>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => {
            return (
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={4}
                >
                  <Stack spacing={4}>
                    <FormControl
                      id="username"
                      isRequired
                      isInvalid={!!touched.username && !!errors.username}
                    >
                      <FormLabel>username</FormLabel>
                      <Input
                        type="text"
                        name="username"
                        value={values.username}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="password"
                      isRequired
                      isInvalid={!!touched.hash && !!errors.hash}
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          name="hash"
                          type={showPassword ? "text" : "password"}
                          value={values.hash}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.hash}</FormErrorMessage>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      <Button
                        type="submit"
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Sign in
                      </Button>
                    </Stack>
                    <Stack pt={2}>
                      <Text align={"center"} onClick={toggleLogin}>
                        Don't have account ?{" "}
                        <Link color={"blue.400"}>Sing up</Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default SignIn;
