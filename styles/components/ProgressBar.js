import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Flex
  } from '@chakra-ui/react'
  
  export default function ProgressBar( { currentStep = 0 }) {


    const steps = [
        { index: '1', description: 'Upload Resume and Job Posting' },
        { index: '2', description: 'Filter Questions' },
        { index: '3', description: 'Practice Questions' },
    ];

    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
    return (
      <>
        <Box my={"1.25rem"} maxW="container.sm" mx="auto">
          {/* NEED TO figure out how to change color scheme to brand colours */}

          <Stepper index={activeStep} size='xxs'  colorScheme='pink'>
            {steps.map((step, index) => (
              <Step key={index}>
                <Flex flexDirection="column" align="center" width="100%">
                  <StepIndicator
                    sx={{
                      '[data-status=complete] &': {
                        background: 'brand.blushPink',
                        borderColor: 'brand.blushPink',
                        color: 'brand.pureWhite',
                        width: { base: "1.5rem", md: "2.25rem" },
                        height: { base: "1.5rem", md: "2.25rem" },
                      },
                      '[data-status=active] &': {
                        background: 'brand.purewhite',
                        borderColor: 'brand.blushPink',
                        color: 'brand.nightBlack',
                        width: { base: "1.5rem", md: "2.25rem" },
                        height: { base: "1.5rem", md: "2.25rem" },
                      },
                      '[data-status=incomplete] &': {
                        background: 'brand.pureWhite',
                        borderColor: 'brand.blushPink',
                        color: 'brand.nightBlack',
                        width: { base: "1.5rem", md: "2.25rem" },
                        height: { base: "1.5rem", md: "2.25rem" },
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
                    <StepDescription mt="0.5rem" textAlign="center">{step.description}</StepDescription>
                  </Box>

                </Flex>
                  {index < steps.length - 1 && (
                  <StepSeparator _horizontal={{ backgroundColor: 'pink' }} />
                  )}
              </Step>
            ))}
          </Stepper>
        </Box>
        
      </>
      )
    }

    