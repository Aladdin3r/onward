import Head from "next/head";
import { useRouter } from 'next/router';
import { Stack, Text, Box, Button } from '@chakra-ui/react';
import Link from "next/link";

export default function Onboarding01() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Stack width="100vw" height="100vh" background="gray.100" align="center" justify="center" spacing={6}>

                {/* Main Heading */}
                <Text fontSize="lg" fontWeight="bold" color="brand.nightBlack" textAlign="center">
                    Welcome to
                </Text>
                
                {/* Logo */}
                <img src="../logo.svg" alt="Logo" width="725px" height="auto" style={{ borderRadius: 'md', marginBottom: '64px' }} />
               
                {/* Description Text */}
                <Text fontSize="md" color="brand.nightBlack" textAlign="center" maxW="900px">
                    Get started with Onward, your AI-powered interview coach, designed to help you excel in job interviews with tailored questions and personalized feedback.
                </Text>

                {/* Get Started Button */}
                <Link href="/">
                    <Button variant={'lgPrimary'}>
                        Get Started
                    </Button>
                </Link>
            </Stack>
        </>
    );
}