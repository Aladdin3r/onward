import { Button } from "@chakra-ui/react";

// Define the ChakraButton component
const ChakraButton = ({ variant, size, children, ...props }) => {
  // Define base styles for the button
  const baseStyle = {
    display: 'flex',
    borderRadius: '999px',
    fontFamily: 'DM Sans',
    _hover: {
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
    },
    padding: 3,
  };

  // Define sizes for the button
  const sizes = {
    xs: {
      fontSize: ['12pt', '14pt', '16pt'], // Responsive font sizes for xs
      px: [2, 3], // Responsive padding
    },
    sm: {
      fontSize: ['14pt', '16pt', '20pt'],
      px: [2, 4],
    },
    md: {
      fontSize: ['16pt', '20pt', '24pt'],
      px: [3, 5],
    },
    lg: {
      fontSize: ['20pt', '28pt', '32pt'],
      px: [4, 6],
    },
  };

  // Define variants for the button
  const variants = {
    lgPrimary: {
      bg: 'brand.blushPink',
      color: 'brand.frostWhite',
      width: ['100%', '325px'], // 100% width on smaller screens
      height: '72px',
    },
    mdPrimary: {
      bg: 'brand.blushPink',
      color: 'brand.frostWhite',
      width: ['100%', '225px'],
      height: '72px',
    },
    smPrimary: {
      bg: 'brand.blushPink',
      color: 'brand.frostWhite',
      width: ['100%', '150px'],
      height: '64px',
    },
    xsPrimary: {
      bg: 'brand.blushPink',
      color: 'brand.frostWhite',
      width: ['100%', '117px'],
      height: '32px',
    },
    lgSecondary: {
      bg: 'brand.platinum',
      color: 'brand.nightBlack',
      width: ['100%', '325px'],
      height: '72px',
      _hover: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
      },
    },
    mdSecondary: {
      bg: 'brand.platinum',
      color: 'brand.nightBlack',
      width: ['100%', '225px'],
      height: '72px',
      _hover: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
      },
    },
    smSecondary: {
      bg: 'brand.platinum',
      color: 'brand.nightBlack',
      width: ['100%', '150px'],
      height: '64px',
      _hover: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
      },
    },
    xsSecondary: {
      bg: 'brand.platinum',
      color: 'brand.nightBlack',
      width: ['100%', '117px'],
      height: '32px',
      _hover: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
      },
    },
  };

  return (
    <Button
      sx={{
        ...baseStyle,
        ...sizes[size],
        ...variants[variant],
      }}
      {...props} // Pass any additional props to the Button
    >
      {children}
    </Button>
  );
};

// Define default props
ChakraButton.defaultProps = {
  variant: "lgPrimary", // Default variant
  size: "md", // Default size
};

export default ChakraButton;
