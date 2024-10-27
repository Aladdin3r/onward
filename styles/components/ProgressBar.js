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
    Box
  } from '@chakra-ui/react'
  
  export default function ProgressBar() {


    const steps = [
        { title: '', description: 'Upload Resume and Job Posting' },
        { title: '', description: 'Filter Questions' },
        { title: '', description: 'Practice Questions' },
    ];

    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
    return (
      <Stepper index={activeStep} size='xxs' colorScheme='pink'>
        {/* NEED TO FIGURE OUT how to change color scheme to our brand color */}
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }