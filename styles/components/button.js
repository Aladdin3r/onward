const Button = {
    baseStyle: {
      display: 'flex',
      borderRadius: '999px',
      fontFamily: 'DM Sans',
      _hover: {
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
      },
      padding: 3,
    },
    sizes: {
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
    },
    variants: {
      lgPrimary: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        width: ['100%', '325px'], // 100% width on smaller screens
        height: '72px',
        fontSize: ['20pt', '28pt', '32pt'], // Responsive font size
        borderRadius: '999px',
      },
      mdPrimary: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        width: ['100%', '225px'],
        height: '72px',
        fontSize: ['16pt', '20pt', '24pt'], 
        borderRadius: '999px',
      },
      smPrimary: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        width: ['100%', '150px'],
        height: '64px',
        fontSize: ['14pt', '16pt', '20pt'],
        borderRadius: '999px',
      },
      xsPrimary: {
        bg: 'brand.blushPink',
        color: 'brand.frostWhite',
        width: ['100%', '117px'],
        height: '32px',
        fontSize: ['12pt', '14pt', '18pt'],
        borderRadius: '999px',
      },
      lgSecondary: {
        bg: 'brand.platinum',
        color: 'brand.nightBlack',
        width: ['100%', '325px'],
        height: '72px',
        fontSize: ['20pt', '28pt', '32pt'],
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
        width: ['100%', '225px'],
        height: '72px',
        fontSize: ['16pt', '20pt', '24pt'],
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
        width: ['100%', '150px'],
        height: '64px',
        fontSize: ['14pt', '16pt', '20pt'],
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
        width: ['100%', '117px'],
        height: '32px',
        fontSize: ['12pt', '14pt', '18pt'],
        borderRadius: '999px',
        _hover: {
          bg: 'brand.blushPink',
          color: 'brand.frostWhite',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.45)',
        },
      },
    },
  };
  
  export default Button;
  