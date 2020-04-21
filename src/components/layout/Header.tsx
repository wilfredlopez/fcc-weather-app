import {
  Box,
  Flex,
  Heading,
  // useColorMode
} from "@chakra-ui/core"
import React from "react"

interface Props {}

// const MenuItems: React.FC<PropsWithChildren<{}>> = ({ children }) => (
//   <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
//     {children}
//   </Text>
// )

const Header = (props: Props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="green.600"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Weather App
        </Heading>
      </Flex>

      <Box
        display={{ xs: "none", sm: "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <p>
          <span>By Wilfred Lopez</span>
        </p>
        {/* <StyleColorMode></StyleColorMode> */}
      </Box>
    </Flex>
  )
}

// function StyleColorMode() {
//   const { toggleColorMode } = useColorMode()

//   return (
//     <>
//       <Button bg="transparent" border="1px" onClick={toggleColorMode}>
//         Toggle Dark
//       </Button>
//     </>
//   )
// }

export default Header
