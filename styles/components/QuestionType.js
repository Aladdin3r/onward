import {
  Checkbox,
  CheckboxGroup,
  Box,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  List, 
  ListItem
} from "@chakra-ui/react";
import { Info } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

export default function QuestionType({
  selectedQuestionType,
  setSelectedQuestionType,
}) {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const allOptions = [
    "Behavioural",
    "Situational",
    "Technical",
    "Competency",
    "Cultural",
    "Career Goals",
    "Regulations",
    "General Interview",
  ];

  useEffect(() => {
    if (selectedQuestionType.length === allOptions.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedQuestionType]);

  const handleAllChange = () => {
    if (isAllSelected) {
      setSelectedQuestionType([]);
    } else {
      setSelectedQuestionType(allOptions);
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <Card
        width={{
          base: "30rem",
          sm: "32rem",
          lg: "40rem",
          xl: "38rem",
          "2xl": "50rem",
        }}
        borderRadius="15px"
        boxShadow="md"
      >
        <CardBody>
          <Flex direction={"column"} p={3}>
            <Flex direction={{ base: "row" }} padding={4} gap={4} mt={-6}>
              <Text
                fontFamily="heading"
                fontWeight="bold"
                fontSize={{ base: "xxs", md: "xxxs", lg: "xxs", xl: "16pt" }}
                textAlign="left"
                display="flex"
                gap={2}
                flex={1}
                alignItems="center"
                position="relative" // Make this container relative to position the popup correctly
              >
                Type of Questions
                <Box
                  ml={1}
                  as="span"
                  cursor="pointer"
                  onClick={() => setInfoVisible(!isInfoVisible)}
                >
                  <Info size={22} />
                </Box>
                {isInfoVisible && (
                  <Box
                    position="absolute"
                    top="100%" // Ensure it shows directly below the icon
                    left="0" // Align to the left of the parent container
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="lg"
                    borderRadius="md"
                    p={4}
                    mt={2} // Add margin to space out from the icon
                    zIndex="10"
                    maxW="600px"
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="xs" fontWeight="semibold">
                        Types of Interview Questions
                      </Text>
                      {/* Close Icon */}
                      <Text
                        as="span"
                        cursor="pointer"
                        fontWeight="bold"
                        onClick={() => setInfoVisible(false)}
                        marginLeft={5}
                      >
                        ✕
                      </Text>
                    </Flex>
                    <List spacing={3} fontWeight="normal" fontSize="12pt">
                    <ListItem><strong>Behavioural:</strong> Past experiences to showcase problem-solving and interpersonal skills.</ListItem>
                    <ListItem><strong>Situational:</strong> Hypothetical scenarios to test decision-making and adaptability.</ListItem>
                    <ListItem><strong>Technical:</strong> Nursing-specific knowledge and skills.</ListItem>
                    <ListItem><strong>Competency:</strong> Core nursing abilities and qualifications.</ListItem>
                    <ListItem><strong>Cultural:</strong> Sensitivity to diverse patient backgrounds.</ListItem>
                    <ListItem><strong>Career Goals:</strong> Long-term aspirations in nursing.</ListItem>
                    <ListItem><strong>Regulations:</strong> Knowledge of healthcare laws and standards.</ListItem>
                    <ListItem><strong>General Interview:</strong> Broad questions on experience, strengths, and fit for the role.</ListItem>
                  </List>

                  </Box>
                )}
              </Text>

              <Checkbox
                size={"lg"}
                my={3}
                value="All"
                isChecked={isAllSelected}
                onChange={handleAllChange}
                variant={"subtle"}
              >
                <Text fontSize={{ base: "xxxs", "2xl": "xxxs" }} value="All">
                  All
                </Text>
              </Checkbox>
            </Flex>
            <CheckboxGroup
              value={selectedQuestionType}
              onChange={(values) => {
                console.log("Selected Question Types:", values);
                setSelectedQuestionType(values);
              }}
            >
              <Flex
                direction={{ base: "row" }}
                padding={4}
                gap={4}
                justify={"center"}
              >
                <Box flex="1" mt={-4}>
                  <Checkbox size={"lg"} my={3} value="Behavioural Question">
                    <Text
                      fontSize={{ base: "xxxs", "2xl": "xs" }}
                      value="Behavioural"
                    >
                      Behavioural Questions
                    </Text>
                  </Checkbox>
                  <Checkbox size={"lg"} my={3} value="Situational Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Situational Questions
                    </Text>
                  </Checkbox>
                  <Checkbox size={"lg"} my={3} value="Technical Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Technical Questions
                    </Text>
                  </Checkbox>
                  <Checkbox size={"lg"} my={3} value="Competency Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Competency Questions
                    </Text>
                  </Checkbox>
                </Box>
                <Box flex="1" mt={-4}>
                  <Checkbox size={"lg"} my={3} value="Cultural Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Cultural Questions
                    </Text>
                  </Checkbox>
                  <Checkbox size={"lg"} my={3} value="Career Goals Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Career Goals Questions
                    </Text>
                  </Checkbox>
                  <Checkbox size={"lg"} my={3} value="Regulations Question">
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Legal / Regulation Questions
                    </Text>
                  </Checkbox>
                  <Checkbox
                    size={"lg"}
                    my={3}
                    value="Common Interview Question"
                  >
                    <Text fontSize={{ base: "xxxs", "2xl": "xs" }}>
                      Common Interview Questions
                    </Text>
                  </Checkbox>
                </Box>
              </Flex>
            </CheckboxGroup>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
