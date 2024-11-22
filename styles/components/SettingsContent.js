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
            <Text fontWeight="bold" fontSize="md" mt={3}>App Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Theme:</Text>
              <Select fontSize="16pt" w="60%" borderRadius={99} defaultValue="Match System">
                <option value="Match System">Match System</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Text size:</Text>
              <Select fontSize="16pt" w="60%" borderRadius={99} defaultValue="Default">
                <option value="Default">Default (medium)</option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Auto save videos:</Text>
              <Switch mt={5} colorScheme="pink" />
            </HStack>
            <Text fontSize="12" mt={-4} color="grey" fontWeight="regular">Choose to automatically save your interviews to your device</Text>
          </VStack>
        );
      case "Language":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md" mt={4}>Language Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold" w="100%">Select App Language:</Text>
              <Select fontSize="16pt" w="70%" borderRadius={99} defaultValue="English">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                {/* add more languages based on API !!! */}
              </Select>
            </HStack>
          </VStack>
        );
      case "AIMI's Settings":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md" mt={4}>AIMI's Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Voice:</Text>
              <Select fontSize="16pt" w="60%" defaultValue="English">
                <option value="English">Default</option>
                <option value="English">Albert</option>
                <option value="Spanish">Samantha</option>
                <option value="French">Imelda</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Speech Speed:</Text>
              <Select fontSize="16pt" w="60%" defaultValue="English">
                <option value="English">Default</option>
                <option value="Spanish">1.25x</option>
                <option value="French">1.50x</option>
                <option value="French">1.75x</option>
                <option value="French">2.0x</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="24" fontWeight="semibold">Language:</Text>
              <Select fontSize="16pt" w="60%" defaultValue="English">
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
        <Text fontSize="xxxs" mt={-2}>
          <Box 
            maxH="600px" // Maximum height for the box
            overflowY="auto"
          >
          At Onward, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use the Onward app.
          <br />
          <br />
          <strong>1. Information We Collect</strong>
          <br />
          <strong>Personal Information:</strong> When you register, we may collect your name, email address, and profession.
          <br />
          <strong>Usage Data:</strong> We collect information about how you use the app, including session length and features accessed, to improve functionality.
          <br />
          <strong>Device Information:</strong> We may collect information about your device, such as IP address, operating system, and app version.
          <br />
          <br />
          <strong>2. How We Use Your Information</strong>
          <br />
          <strong>To Provide and Improve the Service:</strong> Your information helps us enhance your experience, personalize content, and improve app functionality.
          <br />
          <strong>To Communicate with You:</strong> We may use your email to send updates, respond to inquiries, or provide customer support.
          <br />
          <strong>Analytics and Research:</strong> Usage data is analyzed to understand user needs and improve the app.
          <br />
          <br />
          <strong>3. Data Sharing and Disclosure</strong>
          <br />
          We do not sell or rent your personal information. We may share data with third-party service providers to support app functionality, subject to confidentiality agreements. Information may also be disclosed if required by law or to protect our legal rights.
          <br />
          <br />
          <strong>4. Data Security</strong>
          <br />
          We take reasonable steps to protect your information using industry-standard security measures. However, no system is completely secure, and we cannot guarantee absolute security.
          <br />
          <br />
          <strong>5. Your Rights</strong>
          <br />
          You may access, update, or delete your personal information by contacting us. We will respond to requests in accordance with applicable laws.
        </Box>
        </Text>
      </VStack>
  );
      case "Terms & Conditions":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Terms & Conditions</Text>
            <Box 
            w="100%"
            overflowY="auto"
          >
            <Text fontSize="xxxs">
            Welcome to Onward! These Terms and Conditions ("Terms") govern your use of the Onward mobile application ("App") and its related services. By accessing or using the App, you agree to comply with these Terms. If you do not agree, you may not use Onward.
        <br /><br />
        <strong>1. Acceptance of Terms</strong><br />
        By creating an account or otherwise using the App, you agree to these Terms, as well as our Privacy Policy, which is incorporated by reference.
        <br /><br />
        <strong>2. Eligibility</strong><br />
        Onward is intended for users who are at least 18 years old and qualified healthcare professionals, especially nurses and registered nurses. By using the App, you represent and warrant that you meet these requirements.
        <br /><br />
        <strong>3. Account Registration and Security</strong><br />
        You may need to register for an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for any activity under your account. Notify us immediately of any unauthorized access.
        <br /><br />
        <strong>4. Use of the App</strong><br />
        Onward provides interview preparation content specifically tailored for nursing professionals. Users agree to use the App solely for its intended purpose, in compliance with all applicable laws and regulations. Misuse of the App is strictly prohibited.
        <br /><br />
        <strong>5. User Conduct</strong><br />
        You agree not to:
        <ul>
          <li>Post or transmit any inappropriate, offensive, or misleading content.</li>
          <li>Use the App for any unlawful purpose.</li>
          <li>Attempt to interfere with the proper functioning of the App.</li>
        </ul>
        <br />
        <strong>6. Intellectual Property Rights</strong><br />
        All content and materials provided on the App, including but not limited to text, images, logos, and trademarks, are owned by or licensed to Onward. You may not reproduce, distribute, or modify any content from the App without prior written permission.
        <br /><br />
        <strong>7. Subscription and Payment</strong><br />
        Some features may be available through subscription plans. By subscribing, you authorize us to charge your selected payment method. You can cancel your subscription at any time, but no refunds will be given for partial subscription periods.
        <br /><br />
        <strong>8. Disclaimer of Warranties</strong><br />
        The App is provided on an "as-is" and "as-available" basis. Onward makes no warranties, express or implied, regarding the functionality, accuracy, or availability of the App.
        <br /><br />
        <strong>9. Limitation of Liability</strong><br />
        To the maximum extent permitted by law, Onward shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of the App.
        <br /><br />
        <strong>10. Indemnification</strong><br />
        You agree to indemnify and hold harmless Onward, its affiliates, and its team members from any claims or damages arising from your use of the App, violation of these Terms, or infringement of any rights of another.
        <br /><br />
        <strong>11. Modifications to Terms</strong><br />
        Onward reserves the right to change these Terms at any time. We will notify you of any updates by posting the new Terms on the App. Your continued use of the App constitutes acceptance of the updated Terms.
        <br /><br />
        <strong>12. Termination</strong><br />
        Onward reserves the right to suspend or terminate your account and access to the App if you violate these Terms or engage in harmful conduct.
        <br /><br />
        <strong>13. Governing Law</strong><br />
        These Terms shall be governed by and construed in accordance with the laws of Canada.
        <br /><br />
        <strong>14. Contact Us</strong><br />
        For any questions regarding these Terms, please contact us at <a href="mailto:sethproject2@gmail.com">sethproject2@gmail.com</a>.
              </Text>
              </Box>
          </VStack>
        );
      case "Leave a Review!":
        return (
          <VStack align="center" spacing={4}>
            <RatingBox />
          </VStack>
        );
      case "Contact us":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Contact Us</Text>
            <Text fontSize="xs">Looking for some help? Our agents respond to emails on weekdays:<br/>9:00am - 4:30pm PST</Text>
            <HStack mt={50}>
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
                <Heading fontSize="md" textAlign="left" mb={4}>FAQs</Heading>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #fefefe', // Change color here
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontSize="sm">What is Onward?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body">
                          <Text>
                            Onward is an AI-powered personal interview coach designed for nurses to enhance their job interview skills. By leveraging AI technology, Onward provides personalized feedback and job-specific questions to help you succeed in your interviews. Start practicing{' '}
                            <Link color="brand.blushPink" href="/practice-interview">
                              here
                            </Link>.
                          </Text>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #fefefe',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontSize="sm">Practice vs Mock interview</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#fefefe' }}>
                        Practice Interviews offer a customizable experience tailored to your individual needs. This option allows you to filter criteria such as question type, response length, and the number of questions. Practice Interviews provide extended response times to ensure you can develop well-considered answers. This option is particularly beneficial for new users who are building confidence and honing their skills. <br/><br/> Mock Interview serves as a realistic simulation of the actual interview process. It is designed with no customization options and minimal guidance, mirroring the conditions of a formal interview setting. This mode is ideal for users who wish to assess their readiness and practice under realistic time constraints and expectations.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #fefefe',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontSize="sm">Do you keep my data and audio files?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#fefefe' }}>
                            Yes, we securely store data (as per our privacy policy) to enhance your interview coaching experience. Storing this data allows for us to continue to imrpove Onwards AI, as well as allow you to track your progress over time. You can request to delete your data at any time by contacting us at any time.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #fefefe',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontSize="sm">Why did we make this site?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#fefefe' }}>
                            We created Onward with nurses in mind. We recognize the challenges faced by immigrant nurses, and we aim to ease these struggles with Onward. We have carefully crafted each question, and formulateed our AI to give these nurses the tools they need to start their journey in the Canadian healthcare industry.
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
    <Box bg="white" pl={10} pr={10}>
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
