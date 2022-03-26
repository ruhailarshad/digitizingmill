module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    
      screens: {
          'xs': '320px',
          'sm': '480px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1352px',

          'max-xs': {'max': '320px'},
          'max-sm': {'max': '480px'},
          'max-md': {'max': '768px'},
          'max-lg': {'max': '1024px'},
          'max-xl': {'max': '1352px'},
      },

      // Color Palette
      colors: {
          transparent: 'transparent',

          // Primary Color
     
         
          red: {
              100: '#f5222d',
              50: '#EB7272',
              25: '#F5C6C6'
          },

          // Neutrals
          gray: {
            100: '#091E42',
            80: '#253858',
            60: '#5E6C84',
            40: '#8993A4',
            30: '#A5ADBA',
            20: '#C1C7D0',
            10: '#DFE1E6',
            3: '#F4F5F7',
          },

          // Base
          dark: '#222E37',
          light: '#FFFFFF',
          white: '#FFFFFF',
          heading: '#091E42',
          success: '#00875A'
         
      },

      fontFamily: {
          poppins: ['poppins', 'sans-serif'],
      },

      fontSize: {
          12:  ['12px', '20px'],
          14:  ['14px', '22px'],
          16:  ['16px', '24px'],
          18:  ['18px', '26px'],
          20:  ['20px', '28px'],
          22:  ['22px', '30px'],
          24:  ['24px', '32px'],
          26:  ['26px', '34px'],
          28:  ['28px', '36px'],
          30:  ['30px', '38px'],
          32:  ['32px', '40px'],
          36:  ['36px', '44px'],
          40:  ['40px', '48px'],
      },

      // Spacing
      spacing : {
          0: '0px',
          2: '2px',
          4: '4px',
          8: '8px',
          10: '10px',
          12: '12px',
          14: '14px',
          16: '16px',
          18: '18px',
          20: '20px',
          24: '24px',
          28: '28px',
          30: '30px',
          32: '32px',
          36: '36px',
          40: '40px',
          60: '60px',
          80: '80px',
          100: '100px',
      },

      extend: {
          spacing: {
              '128': '32rem',
              '144': '36rem',
          },
          borderRadius: {
              DEFAULT: '6px',
              2: '2px',
              4: '4px',
              6: '6px',
              8: '8px',
              10: '10px',
              12: '12px',
              14: '14px',
              16: '16px',
              18: '18px',
              20: '20px',
          },
          flex: {
              2: '2 2 0%',
              3: '3 3 0%',
              4: '4 4 0%',
              5: '5 5 0%',
          },
          boxShadow: {
              2: '0px 0px 15px rgba(207, 207, 207, 0.25);',
          }
      }
  },
  
  plugins: [],
}