import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Stack } from '@chakra-ui/react';

export default function Popup({ 
  isOpen, 
  onOpen, 
  onClose, 
  title, 
  heading, 
  content1, 
  content2, 
  button1Text, 
  button1Action, 
  button2Text, 
  button2Action 
}) {
  return (
    <>
      <Button 
        variant="mdPrimary" 
        fontSize={{ md: "xxs", lg: "xxs", xl:"18pt", "2xl": "sm" }}
        onClick={onOpen}
        w={{ md: "xxs", lg: "12rem", xl:"18rem", "2xl": "md" }}
        h={{ md: "2rem", lg: "2.5rem", xl:"3rem", "2xl": "4rem" }}
        m={{ base: "3", lg: "4", xl:"5", "2xl": "5" }}
      >
        {title}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box flex="1" marginRight="2" mb={6}>
                <Stack spacing={4}>
                  <Box bg="brand.blueberryCreme" boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"} p={7} borderRadius="md" display="flex" flexDir="column" alignItems="center">
                    {content1}
                    {/* Render button only if button1Text and button1Action are provided */}
                    {button1Text && button1Action && (
                      <Button variant="smPrimary" fontSize="12pt" display="flex" mt={5} onClick={button1Action}>
                        {button1Text}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Box>
              <Box flex="1" marginLeft="2">
                <Stack spacing={4}>
                  <Box bg="brand.blueberryCreme" boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"} p={7} borderRadius="md" display="flex" flexDir="column" alignItems="center">
                    {content2}
                    {/* Render button only if button2Text and button2Action are provided */}
                    {button2Text && button2Action && (
                      <Button variant="smPrimary" fontSize="12pt" display="flex" mt={5} onClick={button2Action}>
                        {button2Text}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
