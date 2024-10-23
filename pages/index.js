import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Heading, Box, CardBody, Text, Stack, Card } from "@chakra-ui/react";
import { Button as ChakraButton } from '@chakra-ui/react';
import TopNav from "@/styles/components/topnav";
import { SideNavBar } from "@/styles/components/sidenav";
import Footer from "@/styles/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <TopNav />
        <main className={styles.main} style={{ position: "relative" }}>
          <SideNavBar property1="default" />
          <Box className="content" m={8}>
            <Heading
              fontFamily="heading"
              color="black" 
              fontWeight="bold" 
              fontSize="lg"
              zIndex={10}
              position="relative"
            >
              <span style={{ color: "#EA4A7D"}}>
                Welcome back,
              </span>
              Onwarder!
            </Heading>
            <Card width="35em" mt={7} borderRadius="15px" boxShadow="md">
              <CardBody>
                <Stack spacing={4} align="center">
                  <Text fontFamily="heading" fontSize="sm" fontWeight="bold" textAlign="center">
                    Ready to take the next step?
                  </Text>
                  <Text fontFamily="body" textAlign="center">
                    Whether you're here preparing.........................
                  </Text>
                  <ChakraButton variant="mdPrimary" p={3}>
                    <Text display="flex" p={2} fontSize="24px">
                      Start Practicing!
                    </Text>
                  </ChakraButton>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </main>
        <Footer />
      </div>
    </>
  );
}
