import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
})

export default customTheme