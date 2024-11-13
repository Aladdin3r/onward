import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Text, Divider, Image, Input, InputGroup, InputRightElement, Button, VStack, FormLabel, FormControl, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Eye, EyeSlash } from "@phosphor-icons/react"
import Link from "next/link";

function PasswordInput() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const handleClick = () => setShow(!show);
  const handleChange = (event) => setValue(event.target.value);

  return (
    <InputGroup size="sm">
        <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        fontSize="xs"
        placeholder="Enter password"
        value={value}
        onChange={handleChange}
        height="45px"
        />
        <InputRightElement width="4.5rem" height="45px" display="flex" alignItems="center" justifyContent="center">
        <Button h="45px" size="sm" onClick={handleClick} variant="unstyled"_hover={{ backgroundColor: "transparent" }}>
          {show ? <Eye size={24} /> : <EyeSlash size={24} />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function SignIn() {
    const router = useRouter();

    return (
        <>
             <Head>
                <title>Sign in</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <Box display="flex" flexDirection="row" width="100vw" height="100vh" alignItems="center" justifyContent="left" gap="17%" paddingLeft="20px" marginLeft="15%">

                    <Box className="content" width="500px">
                        <VStack spacing="15px" className={`${styles.contentContainer}`} align="center">
                            <Box mb="5px" align="center">
                                <Image src="/logo.svg" width="200px" height="42px" objectFit="cover" mb={3}/>
                                <Text fontFamily="heading" fontSize="lg" fontWeight="bold" textAlign="center">Welcome!</Text>
                                <Text fontFamily="body" fontSize="xs" mt={5} color="gray.500" fontWeight="normal" textAlign="center">Please enter your details to get started</Text>
                            </Box>
                            
                            <Box display="flex" justifyContent="center">
                                <Image src="/social.png" alt="Social Sign-In Options" width="500px" height="50px" objectFit="cover" />
                            </Box>

                            <Box display="flex" alignItems="center" width="100%">
                                <Divider borderWidth="1px" borderColor="gray.500" />
                                <Text px={2} fontSize="xs" color="gray.500">or</Text>
                                <Divider borderWidth="1px" borderColor="gray.500" />
                            </Box>

                            <Box width="100%">
                                <FormControl>
                                    <FormLabel fontSize="xs" fontWeight="700" mb="0px" >Email Address:</FormLabel>
                                    <Input
                                        placeholder="Enter your email"
                                        type="email"
                                        size="xs"
                                        height="45px"
                                        mb={5}
                                    />
                                </FormControl>
                                
                                <FormControl>
                                    <FormLabel fontSize="xs" fontWeight="700" mb="0px" >Password:</FormLabel>
                                    <Box mb={5}>
                                        <PasswordInput />
                                    </Box>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize="xs" fontWeight="700" mb="0px" >Confirm Password:</FormLabel>
                                    <Box mb={5}>
                                        <PasswordInput />
                                    </Box>
                                </FormControl>

                                <Checkbox  
                                    mb={5}
                                    size="lg" 
                                    defaultChecked
                                    colorScheme="pink"
                                    sx={{
                                        ".chakra-checkbox__label": {
                                        fontSize: "xxs",
                                        color: "gray.500"
                                        }
                                    }}
                                    >Remember me
                                </Checkbox>
                            </Box>
                      
                            <Link href="/sign-in" passHref>
                                <Button variant="smPrimary" width="100%">
                                    Create Account
                                </Button>
                            </Link> 

                            <Text fontSize="xxs">
                                Already have an account?{" "}
                                <Link href="/sign-in" passHref>
                                    <Text as="span" fontWeight="bold" cursor="pointer" textDecoration="underline" color="brand.blushPink">
                                        Sign in
                                    </Text>
                                </Link>
                            </Text>
                        </VStack>
                    </Box>

                    <Image src="/signInImage.png" alt="Sign-in Visual" width="775px" height="1056px" objectFit="cover" borderRadius="15px" />

                </Box>
            </div>
        </>
    );
}
