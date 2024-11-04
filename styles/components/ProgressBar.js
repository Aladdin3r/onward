import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  Box,
  Flex
} from '@chakra-ui/react';

export default function ProgressBar({ currentStep }) {

  const steps = [
      { index: '1', description: 'Upload Resume and Job Posting' },
      { index: '2', description: 'Filter Questions' },
      { index: '3', description: 'Practice Questions' },
  ];

  return (
      <Box 
        my="1rem" 
        maxW={{ base: "30rem", xl:"35rem", "2xl": "50rem" }}
        mx="auto">
          <Stepper index={currentStep} size='xxxs' colorScheme='pink'>
              {steps.map((step, index) => (
                  <Step key={index}>
                      <Flex flexDirection="column" align="center" width="100%">
                          <StepIndicator
                              sx={{
                                  '[data-status=complete] &': {
                                      background: 'brand.blushPink',
                                      borderColor: 'brand.blushPink',
                                      color: 'brand.pureWhite',
                                      width: { base: "1.5rem", "2xl": "2.25rem" },
                                      height: { base: "1.5rem", "2xl": "2.25rem" },
                                  },
                                  '[data-status=active] &': {
                                      background: 'brand.pureWhite',
                                      borderColor: 'brand.blushPink',
                                      color: 'brand.nightBlack',
                                      width: { base: "1.5rem", "2xl": "2.25rem" },
                                      height: { base: "1.5rem", "2xl": "2.25rem" },
                                  },
                                  '[data-status=incomplete] &': {
                                      background: 'brand.pureWhite',
                                      borderColor: 'brand.blushPink',
                                      color: 'brand.nightBlack',
                                      width: { base: "1.5rem", "2xl": "2.25rem" },
                                      height: { base: "1.5rem", "2xl": "2.25rem" },
                                  },
                              }}
                          >
                              <StepStatus
                                  complete={<StepIcon />}
                                  incomplete={<StepNumber />}
                                  active={<StepNumber />}
                              />
                          </StepIndicator>

                          <Box flexShrink='0'>
                              <StepDescription mt="0.5rem" textAlign="center" fontSize={{ base: "0.9rem", "2xl": "1.1rem" }}>
                                  {step.description}
                              </StepDescription>
                          </Box>
                      </Flex>
                      {index < steps.length - 1 && (
                          <StepSeparator _horizontal={{ backgroundColor: 'pink' }} />
                      )}
                  </Step>
              ))}
          </Stepper>
      </Box>
  );
}
