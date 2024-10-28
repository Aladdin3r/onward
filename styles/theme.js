import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
import Button from './components/Button';
import { Stepper } from "@chakra-ui/react";

const fonts = {
    ...chakraTheme.fonts,
    body: "DM Sans",
    heading: "Plus Jakarta Sans",
}

const overrides = {
    ...chakraTheme,
    fonts,
    components: {
        Button: {
            ...Button,
        },
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    fontSizes: {
        xxs: "14pt",
        xs: "16pt",
        sm: "20pt",
        md: "24pt",
        lg: "32pt",
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
        imperialRed: "#EAE84A",
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