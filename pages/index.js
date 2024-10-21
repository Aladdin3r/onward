import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme"
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Text } from "@chakra-ui/react";
import { Button as ChakraButton } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <Text fontFamily="body">The quick brown fox jumps over the lazy dog</Text>
          <Text fontFamily="heading" fontWeight="bold" fontSize="lg">Heading 1</Text>
          <ChakraButton size="lg" fontSize="32pt" fontWeight="medium" variant="lgPrimary" >Button</ChakraButton>
          <ChakraButton size="md" fontSize="24pt" fontWeight="medium" variant="mdPrimary">Button</ChakraButton>
          <ChakraButton sze="sm" fontSize="20pt" fontWeight="medium" variant="smPrimary">Button</ChakraButton>
          <ChakraButton sze="xs" fontSize="18pt" fontWeight="medium" variant="xsPrimary">Button</ChakraButton>
          <ChakraButton size="lg" fontWeight="medium" variant="lgSecondary">Button</ChakraButton>
          <ChakraButton size="md" fontWeight="medium" variant="mdSecondary">Button</ChakraButton>
          <ChakraButton size="sm" fontWeight="medium" variant="smSecondary">Button</ChakraButton>
          <ChakraButton size="xs" fontWeight="medium" variant="xsSecondary">Button</ChakraButton>
        </main>
      </div>
    </>
  );
}
