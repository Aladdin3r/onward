// ArrowControls component
import { HStack, IconButton } from "@chakra-ui/react";
import { ArrowFatLeft, ArrowFatRight, ArrowsOut } from "@phosphor-icons/react"
const ArrowControls = ({ onPrev, onNext, onExpand }) => {
  return (
    <HStack spacing={4} justify="center" mt={0}>
      <IconButton
        aria-label="Previous Question"
        icon={<ArrowFatLeft size={24} color="black" />}
        bg="brand.pastelBlue"
        boxShadow="md"
        onClick={onPrev}
      />
      <IconButton
        aria-label="Next Question"
        icon={<ArrowFatRight size={24} color="black" />}
        bg="brand.pastelBlue"
        boxShadow="md"
        onClick={onNext}
      />
      <IconButton
        aria-label="Expand Video"
        icon={<ArrowsOut size={24} color="black" />}
        bg="brand.pastelBlue"
        boxShadow="md"
        onClick={onExpand}
      />
    </HStack>
  );
};
export default ArrowControls;