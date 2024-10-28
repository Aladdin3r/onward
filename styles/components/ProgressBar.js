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
  
  export default function ProgressBar() {


    const steps = [
        { index: '1', description: 'Upload Resume and Job Posting' },
        { index: '2', description: 'Filter Questions' },
        { index: '3', description: 'Practice Questions' },
    ];

    const { activeStep } = useSteps({
      index: 0,
      count: steps.length,
    })
  
    return (
      <>
        <Box my={"1.25rem"} maxW={{ base: "100%", md: "800px", lg: "1200px" }}>
            
          {/* NEED TO figure out how to change color scheme to brand colours */}
          <Stepper index={activeStep} size='xxs' colorScheme='pink'>
            {steps.map((step, index) => (
              <Step key={index}>
                <Flex flexDirection="column" align="center">
                  <StepIndicator
                    sx={{
                      '[data-status=complete] &': {
                        background: 'brand.blushPink',
                        borderColor: 'brand.blushPink',
                        color: 'brand.pureWhite',
                        width: "2.25rem",
                        height: "2.25rem"
                      },
                      '[data-status=active] &': {
                        background: 'brand.purewhite',
                        borderColor: 'brand.blushPink',
                        color: 'brand.nightBlack',
                        width: "2.25rem",
                        height: "2.25rem"
                      },
                      '[data-status=incomplete] &': {
                        background: 'brand.pureWhite',
                        borderColor: 'brand.blushPink',
                        color: 'brand.nightBlack',
                        width: "2.25rem",
                        height: "2.25rem"
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
                <StepSeparator _horizontal={{ backgroundColor: 'red' }} />
              </Step>
            ))}
          </Stepper>
        </Box>
      </>
      )
    }