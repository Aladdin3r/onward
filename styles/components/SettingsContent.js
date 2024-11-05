// components/SettingsContent.js
import { Box, VStack, HStack, Text, Switch, Select, Link, Heading, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } from "@chakra-ui/react";
import { Envelope } from "@phosphor-icons/react";
import RatingBox from "./RatingBox";

const SettingsContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "App Settings":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">App Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Theme:</Text>
              <Select fontSize="sm" w="60%" defaultValue="Match System">
                <option value="Match System">Match System</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Text size:</Text>
              <Select w="60%" defaultValue="Default">
                <option value="Default">Default</option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Auto save videos:</Text>
              <Switch mt={5} colorScheme="pink" />
            </HStack>
          </VStack>
        );
      case "Language":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Language Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Select App Language:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Select AIMI Language:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </Select>
            </HStack>
          </VStack>
        );
      case "AIMI's Settings":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">AIMI's Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Voice:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">Default</option>
                <option value="English">Albert</option>
                <option value="Spanish">Samantha</option>
                <option value="French">Imelda</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Speech Speed:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">Default</option>
                <option value="Spanish">1.25x</option>
                <option value="French">1.50x</option>
                <option value="French">1.75x</option>
                <option value="French">2.0x</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Select AIMI Language:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </Select>
            </HStack>
          </VStack>
        );
      case "Privacy Policy":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Privacy Policy</Text>
            <Text fontSize="sm">Your privacy is important to us. Please read our privacy policy.</Text>
          </VStack>
        );
      case "Terms & Conditions":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Terms & Conditions</Text>
            <Text fontSize="sm">By using this app, you agree to our terms and conditions.</Text>
          </VStack>
        );
      case "Leave a Review!":
        return (
          <VStack align="start" spacing={4}>
            <RatingBox />
          </VStack>
        );
      case "Contact us":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Contact Us</Text>
            <Text fontSize="sm">Looking for some help? Our agents respond to emails on weekdays<br/>9:00am - 4:30pm PST</Text>
            <HStack>
              <Envelope size={32} weight="bold" />
              <Link 
              fontSize="18pt" 
              fontWeight="bold"
              href="mailto:support@onward.com?subject=Support%20Request&body=Hello%2C%20I%20need%20help%20with..."
              >
                support@onward.com
              </Link>
            </HStack>
          </VStack>
        );
      case "FAQ":
        return (
          <VStack align="start" spacing={4}>
            <Box>
                <Heading fontFamily="heading" fontSize="3xl" textAlign="left" mb={4}>FAQs</Heading>
                <Text fontFamily="body" fontSize="s" textAlign="left" mb={6}>
                    Find answers to about our nursing interview preparation
                </Text>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF', // Change color here
                                    _expanded: { bg: 'blue.100' }, // Optional: Change background when expanded
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">What is Onward?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Onward is an AI-powered personal interview coach designed for nurses to enhance their job interview skills.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Who is this for?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            This service is designed for nurses, especially those new to the Canadian healthcare system.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Do you keep my data and audio files?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Yes, we securely store data as per our privacy policy to enhance your interview coaching experience.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Why did we make this site?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Onward aims to empower nurses by providing interview preparation tools tailored to their needs.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
          </VStack>
        );
      default:
        return <Text fontWeight="bold" fontSize="md">Select a section to view its content.</Text>;
    }
  };

  return (
    <Box bg="white" shadow="sm" borderRadius="lg" p={6} minW="280px" minH="300px">
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
