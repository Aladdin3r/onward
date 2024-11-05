import { Box, Textarea, HStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Star } from "@phosphor-icons/react";
import React from "react";

const RatingBox = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index + 1); // Sets the rating based on which star is clicked
  };

  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Box mt={4} p={8} bg="frostWhite" borderRadius="md" boxShadow="md" w={400}>
      <Text mb={2} fontWeight="bold" color="blushPink">
        Leave us a review
      </Text>
      <HStack>
        <Text mb='8px'>Your response: {value}</Text>
      </HStack>
      <HStack spacing={1}>
        <Textarea 
            placeholder="Type your review here" 
            fontSize="12pt"
            value={value}
            onChange={handleInputChange} 
            mb={4}
        />
      </HStack>
      <HStack spacing={1}>
        {Array(5)
          .fill("")
          .map((_, index) => (
            <Star
              key={index}
              size={24}
              weight={index < rating ? "fill" : "regular"}
              color={index < rating ? "#EA4A7D" : "brand.nightBlack"}
              cursor="pointer"
              onClick={() => handleRating(index)}
            />
          ))}
        <Button
                bg="brand.blushPink"
                color="brand.frostWhite"
                size="sm"
                px={4}
                py={6}
                ml={16}
              >
                Submit
              </Button>
      </HStack>
    </Box>
  );
};

export default RatingBox;
