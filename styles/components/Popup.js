import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Stack, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Flex, Image } from '@chakra-ui/react';
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
        _hover={{
          bg: "#EA4A7D",
          color: "#ffffff", 
          // transform: "scale(1.025)", 
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)", 
        }}
        
        // m={{ base: "3", lg: "4", xl: "5", "2xl": "5" }}
      >
        {title}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent 
          textAlign="center"
          alignItems="center"
          minW={{ base: "90%", md: "70%", lg: "50%" }}
          maxW="750px"
          minH="450px"
          bg="#ffffff" 
          py="3.4em"
          borderRadius="16px"
        >
          {/* <ModalHeader>
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
          </ModalHeader> */}
          <ModalCloseButton 
          color="#575656"
          />
          <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
            <Box 
              // display="flex" 
              // flexDirection={{ base: "column", md: "row" }} 
              // justifyContent="center"
              // width="100%"
              // gap={{ base: 4, md: 8 }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              columnGap="3em"
            >
              {/* Left Content Box */}
              <Box flex="1" maxW="370px">
                <Stack spacing={4}>
                  <Box 
                    bg="#ffffff"
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" 
                    p={7} 
                    borderRadius="16px"
                    display="flex" 
                    flexDir="column" 
                    alignItems="center"
                    border="solid 1px #E6EAF2"
                  >
                    <Image
                      src="/images/practice-card-select.svg"
                      alt="Practice Card select"
                      width="100%"
                      height="auto"
                      // objectFit="contain" 
                    />
                    <Text
                    fontSize="1.3em"
                    fontWeight="semibold"
                    color="#343333"
                    mt="0.8rem"
                    >Practice Questions</Text>
                    <Text color="#575656"fontSize="1.1em" fontWeight="semibold" mb={2} textAlign="center">
                    Focus on refining your answers and building confidence
                    </Text>
                    {button1Text && button1Action && (
                      <Button 
                      bg="#EA4A7D"
                      color="#ffffff"
                      borderRadius="8px"
                      fontSize="xs" 
                      w="100%"
                      h="61px" 
                      minW="fit-content"
                      mt={3} 
                      onClick={button1Action}
                      p={8}
                      _hover={{
                        bg: "#ffffff",
                        color: "#EA4A7D", 
                        border: "1px solid #EA4A7D",
                        transform: "scale(1.025)", 
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
                      }}
                    >
                        {button1Text}
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Box>

              {/* Right Content Box */}
              <Box flex="1" mb={0} maxW="370px">
                <Stack spacing={4}>
                  <Box 
                    bg="#ffffff" 
                    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)" 
                    p={7} 
                    borderRadius="16px"
                    display="flex" 
                    flexDir="column" 
                    alignItems="center"
                    border="solid 1px #E6EAF2"
                  >
                    <Image
                      src="/images/mock-card-select.svg"
                      alt="Practice Card select"
                      width="100%"
                      height="auto"
                      // objectFit="contain" 
                    />
                    <Text
                      fontSize="1.3em"
                      fontWeight="semibold"
                      color="#343333"
                      mt="0.8rem"
                    >Mock Interview</Text>
                    <Text color="#575656"fontSize="1.1em" fontWeight="semibold" mb={2} textAlign="center">
                    Practice a realistic interview scenario in a simulated environment.
                    </Text>
                    {button2Text && button2Action && (
                      <Button 
                        bg="#EA4A7D"
                        color="#ffffff"
                        borderRadius="8px"
                        fontSize="xs" 
                        w="100%"
                        h="61px" 
                        minW="fit-content"
                        mt={3} 
                        onClick={button2Action}
                        p={8}
                        _hover={{
                          bg: "#ffffff",
                          color: "#EA4A7D", 
                          border: "1px solid #EA4A7D",
                          transform: "scale(1.025)", 
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", 
                        }}
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
