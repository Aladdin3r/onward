import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Text, Divider, Image, Input, InputGroup, InputRightElement, Button, VStack, FormLabel, FormControl, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";

function PasswordInput({ value, onChange, show, onToggleShow }) {
  return (
    <InputGroup size="sm">
      <Input
        fontSize="xs"
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        value={value}
        onChange={onChange}
        height="45px"
        mb={5}
      />
      <InputRightElement width="4.5rem" height="45px" display="flex" alignItems="center" justifyContent="center">
        <Button h="45px" size="sm" onClick={onToggleShow} variant="unstyled" _hover={{ backgroundColor: "transparent" }}>
          {show ? <Eye size={24} /> : <EyeSlash size={24} />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    // Add more validation logic here

    // If validation passes, clear the error and proceed with sign-in logic
    setError('');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <Box display="flex" flexDirection="row" width="100vw" height="100vh" alignItems="center" justifyContent="left" gap="15%" paddingLeft="20px">
          <Image src="/signInImage.png" alt="Sign-in Visual" width="775px" height="1056px" objectFit="cover" borderRadius="15px" />
          <Box className="content" width="500px">
            <VStack spacing="15px" className={`${styles.contentContainer}`} align="center">
              <Box mb="5px" align="center">
                <Image src="/logo.svg" width="200px" height="42px" objectFit="cover" mb={3} />
                <Text fontFamily="heading" fontSize="lg" fontWeight="bold" textAlign="center">Welcome Back!</Text>
                <Text fontFamily="body" fontSize="xs" mt={5} color="gray.500" fontWeight="normal" textAlign="center">Please enter your details to sign in</Text>
              </Box>
              <Box display="flex" justifyContent="center">
                <Image src="/social.png" alt="Social Sign-In Options" width="500px" height="50px" objectFit="cover" />
              </Box>
              <Box display="flex" alignItems="center" width="100%">
                <Divider borderWidth="1px" borderColor="gray.500" />
                <Text px={2} fontSize="xs" color="gray.500">or</Text>
                <Divider borderWidth="1px" borderColor="gray.500" />
              </Box>
              <Box width="100%" mb={5}>
                <FormControl mb={6} isInvalid={!!error}>
                  <FormLabel fontSize="xs" fontWeight="700" mb="0px">Email Address:</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    size="xs"
                    height="45px"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isInvalid={!!error}>
                  <FormLabel fontSize="xs" fontWeight="700" mb="0px">Password:</FormLabel>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    show={showPassword}
                    onToggleShow={() => setShowPassword(!showPassword)}
                  />
                </FormControl>
                {error && <Text color="red.500" fontSize="xs" mt={2}>{error}</Text>}
                <Checkbox
                  mb={5}
                  size="lg"
                  defaultChecked
                  colorScheme="pink"
                  sx={{
                    ".chakra-checkbox__label": {
                      fontSize: "xxs",
                      size: "xs",
                      color: "gray.500"
                    }
                  }}
                >Remember me
                </Checkbox>
              </Box>
              <Link href="/" passHref>
                <Button variant="smPrimary">Sign in</Button>
              </Link>              
              <Text fontSize="xxs">
                Don't have an account yet?{" "}
                <Link href="/sign-up" passHref>
                  <Text as="span" fontWeight="bold" cursor="pointer" textDecoration="underline" color="brand.blushPink">
                    Create an account
                  </Text>
                </Link>
              </Text>
            </VStack>
          </Box>
        </Box>
      </div>
    </>
  );
}