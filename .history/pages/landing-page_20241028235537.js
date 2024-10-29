import { Box, Flex, Heading, Text, Stack, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Button action function
  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the sign-up page
  };

  return (
    <Layout>
      import React from 'react';

const HomeLandingPage = () => {
  return (
    <div style={{
      width: 1920,
      height: 3273,
      position: 'relative',
      backgroundColor: 'white',
    }}>
      <div style={{
        width: 1775,
        height: 749,
        position: 'absolute',
        left: 72,
        top: 2091,
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.10)',
        borderRadius: 15,
        border: '1px solid #E6EAF2',
      }} />

      <div style={{
        width: 1920,
        height: 1931,
        position: 'absolute',
        left: 0,
        top: 101,
        background: 'linear-gradient(180deg, #CBD5FF 0%, #FFFFFF 100%)',
      }} />

      <div style={{
        width: 1920,
        height: 277,
        position: 'absolute',
        left: 0,
        top: 2996,
        backgroundColor: 'white',
        borderTop: '1px solid #E6EAF2',
      }}>
        <div style={{
          position: 'absolute',
          left: 662,
          top: 124,
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}>Contact Us</div>
        <div style={{
          position: 'absolute',
          left: 922,
          top: 124,
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}>Terms of Service</div>
        <div style={{
          position: 'absolute',
          left: 1194,
          top: 124,
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}>Privacy Policy</div>
        <div style={{
          position: 'absolute',
          left: 1448,
          top: 124,
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}>Blog</div>
        <div style={{
          position: 'absolute',
          left: 1607,
          top: 208,
          color: 'black',
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}>© 2024 Onward</div>
      </div>

      <div style={{
        width: 1600,
        height: 574.5,
        position: 'absolute',
        left: 178,
        top: 2160,
      }}>
        <h2 style={{
          width: 686,
          height: 23,
          position: 'absolute',
          left: 0,
          top: 56,
          color: 'black',
          fontSize: 20,
          fontFamily: 'DM Sans',
          fontWeight: '700',
          wordWrap: 'break-word',
        }}>Find answers about our nursing interview preparation</h2>

        <p style={{
          width: 692,
          position: 'absolute',
          left: 9,
          top: 155,
          color: 'black',
          fontSize: 20,
          fontFamily: 'DM Sans',
          fontWeight: '400',
          lineHeight: '27px',
          wordWrap: 'break-word',
        }}>What is Onward?</p>

        <p style={{
          width: 692,
          position: 'absolute',
          left: 9,
          top: 266,
          color: 'black',
          fontSize: 20,
          fontFamily: 'DM Sans',
          fontWeight: '400',
          lineHeight: '27px',
          wordWrap: 'break-word',
        }}>Who is this for?</p>

        {/* Repeat similar structure for other FAQ items */}

        <h1 style={{
          position: 'absolute',
          left: 0,
          top: 0,
          color: 'black',
          fontSize: 32,
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: '700',
          lineHeight: '36px',
          wordWrap: 'break-word',
        }}>FAQs</h1>
      </div>

      {/* Add remaining elements like images, top bar, and logos here in similar fashion */}
    </div>
  );
};

export default HomeLandingPage;

  );
}
