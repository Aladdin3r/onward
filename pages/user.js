import Head from "next/head"
import "@/styles/theme"
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Text } from "@chakra-ui/react";
// import { Button as ChakraButton } from '@chakra-ui/react';
import TopNav from "@/styles/components/TopNav";

export default function User() {
    return (
      <>
        <Head>
          <title>User</title>
          <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <TopNav />
          
          <main>
          <Text fontFamily="heading">User Page</Text>
          </main>
        </div>
      </>
    );
  }