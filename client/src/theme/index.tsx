import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          height: '42px'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& label': {
            top: '4px'
          },
          '& label.Mui-focused': {
            color: '#341358'
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'rgba(0, 0, 0, 0.23)',
            borderWidth: '1px'
          },
          '& .MuiOutlinedInput-root': {
            height: '50px',
            margin: '0 ',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px'
            }
          }
        }
      }
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& label.Mui-focused': {
              color: 'grey'
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'grey'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey'
              },
              '&:hover fieldset': {
                borderColor: 'grey'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'grey'
              }
            },
            '& label': {
              top: 'initial !important'
            }
          }
        }
      ]
    }
  }
});

export default theme;
