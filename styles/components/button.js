const Button = {
    baseStyle: {
        display: 'flex',
        borderRadius: '999px',
        fontFamily: 'DM Sans',
        _hover: {
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
        },
    },
    sizes: {
        xs: {
            fontSize: '18pt',
            px: 3, 
        },
        sm: {
            fontSize: '20pt',
            px: 4,
        },
        md: {
            fontSize: '24pt',
        },
        lg: {
            fontSize: '32pt',
        },
    },
    variants: {
        lgPrimary: {
            bg: 'brand.blushPink',
            color: 'brand.frostWhite',
            width: '325px',
            height: '72px',
            size: 'lg',
            borderRadius: '999px',
        },
        mdPrimary: {
            bg: 'brand.blushPink',
            color: 'brand.frostWhite',
            width: '225px',
            height: '72px',
            size: '24pt',
        },
        smPrimary: {
            bg: 'brand.blushPink',
            color: 'brand.frostWhite',
            width: '150px',
            height: '64px', 
            size: '20pt',
        },
        xsPrimary: {
            bg: 'brand.blushPink',
            color: 'brand.frostWhite',
            width: '117px',
            height: '32px',
            size: '18pt',
        },
        lgSecondary: {
            bg: 'brand.platinum',
            color: 'brand.nightBlack',
            width: '325px',
            height: '72px',
            size: '32pt',
            borderRadius: '999px',
            _hover: {
                bg: 'brand.blushPink',
                color: 'brand.frostWhite',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
            },
        },
        mdSecondary: {
            bg: 'brand.platinum',
            color: 'brand.nightBlack',
            width: '225px',
            height: '72px',
            size: '24pt',
            borderRadius: '999px',
            _hover: {
                bg: 'brand.blushPink',
                color: 'brand.frostWhite',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
            },
        },
        smSecondary: {
            bg: 'brand.platinum',
            color: 'brand.nightBlack',
            width: '150px',
            height: '64px',
            size: '20pt',
            borderRadius: '999px',
            _hover: {
                bg: 'brand.blushPink',
                color: 'brand.frostWhite',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
            },
        },
        xsSecondary: {
            bg: 'brand.platinum',
            color: 'brand.nightBlack',
            width: '117px',
            height: '32px',
            size: '18pt',
            borderRadius: '999px',
            _hover: {
                bg: 'brand.blushPink',
                color: 'brand.frostWhite',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
            },
        },
    }
    
};

export default Button;