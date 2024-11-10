import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Stack, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Flex } from '@chakra-ui/react';
import { Info } from "@phosphor-icons/react";

export default function Popup({ 
  isOpen, 
  onOpen, 
  onClose, 
  title, 
  heading, 
  button1Text, 
  button1Action, 
  button2Text, 
  button2Action 
}) {
  return (
    <>
      <Button 
        variant="mdPrimary" 
        fontSize={{ md: "xxs", lg: "xxs", xl: "18pt", "2xl": "sm" }}
        onClick={onOpen}
        w={{ md: "xxs", lg: "12rem", xl: "18rem", "2xl": "md" }}
        h={{ md: "2rem", lg: "2.5rem", xl: "3rem", "2xl": "4rem" }}
        m={{ base: "3", lg: "4", xl: "5", "2xl": "5" }}
      >
        {title}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent 
          textAlign="center"
          minW={{ base: "90%", md: "70%", lg: "50%" }}
          maxW="750px"
          minH="450px"
          p={4}
        >
          <ModalHeader>
            <Flex alignItems="center" justifyContent="center" position="relative">
              <Popover>
                <PopoverTrigger>
                  <Info size={24} style={{ marginRight: '8px', cursor: 'pointer' }} />
                </PopoverTrigger>
                <PopoverContent 
                  bottom="400px" 
                  p={4}
                  left="20%" 
                  transform="translateX(-50%)" 
                  maxW="800px" 
                  width="850px" 
                  zIndex="popover" 
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Box textAlign="left">
                      <Text fontWeight="bold" fontSize="sm">Mock vs. Practice Interviews</Text>
                      <Text mt={2} fontWeight="bold" fontSize="xs">Practice Interviews</Text>
                      <Text fontSize="xxs" mb={2} fontWeight="normal">
                        Practice Interviews offer a customizable experience tailored to your individual needs. This option allows you to filter criteria such as question type, response length, and the number of questions.
                      </Text>
                      <Text fontWeight="bold" fontSize="xs">Mock Interviews</Text>
                      <Text fontSize="xxs" fontWeight="normal">
                        Mock Interviews serve as a realistic simulation of the actual interview process. It is designed with no customization options and minimal guidance, mirroring formal interview settings.
                      </Text>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize="lg" fontWeight="semibold">{heading}</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box 
              display="flex" 
              flexDirection={{ base: "column", md: "row" }} 
              justifyContent="center"
              width="100%"
              gap={{ base: 4, md: 8 }}
            >
              {/* Left Content Box */}
              <Box flex="1" mb={6} maxW="370px">
                <Stack spacing={4}>
                  <Box 
                    bg="brand.blueberryCreme" 
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" 
                    p={7} 
                    borderRadius="md" 
                    display="flex" 
                    flexDir="column" 
                    alignItems="center"
                  >
                    <Text fontSize="sm" fontWeight="bold" mb={2} textAlign="center">
                      Practice a <em>realistic</em> interview scenario in a simulated environment.
                    </Text>
                    {button1Text && button1Action && (
                      <Button 
                        variant="smPrimary" 
                        fontSize="sm" 
                        h="2.5rem" 
                        minW="fit-content"
                        mt={3} 
                        onClick={button1Action}
                        p={8}
                      >
                        {button1Text}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Box>

              {/* Right Content Box */}
              <Box flex="1" mb={6} maxW="370px">
                <Stack spacing={4}>
                  <Box 
                    bg="brand.blueberryCreme" 
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" 
                    p={7} 
                    borderRadius="md" 
                    display="flex" 
                    flexDir="column" 
                    alignItems="center"
                  >
                    <Text fontSize="sm" fontWeight="bold" mb={2} textAlign="center">
                      Focus on <em>refining</em> your answers and building confidence.
                    </Text>
                    {button2Text && button2Action && (
                      <Button 
                        variant="smPrimary" 
                        fontSize="sm" 
                        h="2.5rem" 
                        minW="fit-content"
                        mt={3} 
                        onClick={button2Action}
                        p={8}
                      >
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
