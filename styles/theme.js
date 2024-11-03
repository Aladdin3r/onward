import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
import ChakraButton from './components/Button';
import { Stepper } from "@chakra-ui/react";


const fonts = {
    ...chakraTheme.fonts,
    body: "DM Sans",
    heading: "Plus Jakarta Sans",
}

const overrides = {
    ...chakraTheme,
    fonts,
    breakpoints: {
        sm: "320px",    // mobile
        md: "768px",    // tablet
        lg: "1024px",   // laptop
        xl: "1280px",   // desktop (smaller screens)
        "2xl": "1920px" // desktop (larger screens)
    },
    containerSize: {
        // base: "100%",      // For mobile/small screens
        sm: "320px",        // Small screens
        md: "768px",         // Medium screens (tablets)
        lg: "1024px",         // Large screens (laptops)
        xl: "1280px",         // Extra large screens (desktops)
        "2xl": "1920px",   // Extra extra large (full desktop)
      },
    components: {
        Button: ChakraButton,
    },
    fontWeights: {
        normal: 400, 
        medium: 500,
        bold: 700,
    },
    fontSizes: {
        xxxs: "12pt",
        xxs: "14pt",
        xs: "16pt",
        sm: "20pt",
        md: "24pt",
        lg: "28pt",
        xl: "32pt",
        "2xl": "48pt"
    },
    colors: {
       brand: { 
        blushPink: "#EA4A7D",
        pastelBlue: "#CBD5FF", 
        blueberryCreme: "#EBEFFF",
        frostWhite: "#FAFAFA",
        nightBlack: "#1f1f1f",
        platinum: "#e2e2e2",
        confirmationGreen: "#61CD3D",
        imperialRed: "EA4A4D",
        canaryYellow: "#EAE84A",
        oceanBlue: "#214DDF",
        pureWhite: "#FFFFFF"
        }
    },
    styles: {
        global: {
            body: {
                bg: "frostWhite",
            },
        },
    },
}

const customTheme = extendTheme(overrides);

export default customTheme;