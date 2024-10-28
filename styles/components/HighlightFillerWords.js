// HighlightFillerWords.js

import { Text } from "@chakra-ui/react";

const HighlightFillerWords = ({ answer }) => {
  const fillerWords = ["Um", "uh", "like", "um"];
  const blushPink = "brand.blushPink";

  return (
    <>
      {answer.split(" ").map((word, index) => {
        // Check if the word is a filler word by stripping commas and periods
        const isFiller = fillerWords.includes(word.replace(",", "").replace(".", ""));
        
        return (
          <Text
            as="span"
            key={index}
            color={isFiller ? blushPink : "inherit"}
            fontWeight={isFiller ? "bold" : "normal"} // Optional bolding for emphasis
            mr={1} // Space between words
          >
            {word}
          </Text>
        );
      })}
    </>
  );
};

export default HighlightFillerWords;
