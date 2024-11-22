import React from 'react';
import {
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepIcon,
  Stepper,
  Box,
  VStack,
  Flex
} from '@chakra-ui/react';

export default function ProgressBar({ activeStep }) {
  const steps = [
    { title: 'Step 1', description: 'Upload Resume and Job Posting' },
    { title: 'Step 2', description: 'Filter Questions' },
    { title: 'Step 3', description: 'Questions Preview' },
  ];

  return (
    <>
      <Box 
        // w={{ base: "10rem", xl: "40rem", "2xl": "80rem" }}  
        w="70%" 
        mx="auto"  
        my="1rem" 
      >
        <Stepper index={activeStep} size="xs"> 
          {steps.map((step, index) => (
            <Step key={index}>
              <VStack>
                <StepIndicator
                  p={0}
                  m={0}
                  sx={{
                    '[data-status=complete] &': {
                      bg: 'brand.blushPink',
                      borderColor: 'brand.blushPink',
                      color: 'brand.pureWhite',
                      w: { base: "2rem", "2xl": "2.25rem" },
                      h: { base: "2rem", "2xl": "2.25rem" },
                    },
                    '[data-status=active] &': {
                      bg: 'brand.pureWhite', 
                      borderColor: 'brand.blushPink',
                      color: 'brand.nightBlack',
                      w: { base: "2rem", "2xl": "2.25rem" },
                      h: { base: "2rem", "2xl": "2.25rem" },
                    },
                    '[data-status=incomplete] &': {
                      bg: 'brand.pureWhite',
                      borderColor: 'brand.blushPink',
                      color: 'brand.nightBlack',
                      w: { base: "2rem", "2xl": "2.25rem" },
                      h: { base: "2rem", "2xl": "2.25rem" },
                    },
                  }}
                >
                  <StepStatus
                    complete={<StepIcon />} 
                    incomplete={<StepNumber />} 
                    active={<StepNumber />}
                  />
                </StepIndicator>
              </VStack>

              {index < steps.length - 1 && (
                <StepSeparator
                  _horizontal={{
                    bg: index < activeStep ? 'brand.blushPink' : 'lightGray', 
                    height: '5px',
                    marginLeft: '-0.5rem',
                    marginRight: '-1rem',
                  }}
                />
              )}
            </Step>
          ))}
        </Stepper>

        <Flex pt="0" textAlign="center" justifyContent="space-between" fontSize={{ base: "0.9rem", "2xl": "1.1rem" }}>
          {steps.map((step, index) => (
            <Box
              key={index}
              color={index === activeStep ? 'brand.blushPink' : index < activeStep ? 'lightGrey' : 'brand.nightBlack'}
              mt="1rem" 
              mr="-3rem"
              // justifySelf={index === 0 ? 'flex-start' : index === 2 ? 'flex-end' : 'center'}
              ml={index === 0? '-6rem' : index === 1 ? '-2.5rem' : '0'}
            >
              {step.description}
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
}
