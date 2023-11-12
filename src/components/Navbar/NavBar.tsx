import { HStack, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";

type NavBarProps = {
  title: string;
  toggleMenu: () => void;
};

function NavBar({ title, toggleMenu }: NavBarProps) {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <HStack
      backdropFilter="blur(63px)"
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Text fontWeight={"bold"} fontSize={"3xl"}>
        {title}
      </Text>

      {isMobile && (
        <IconButton
          as={GiHamburgerMenu}
          w={"30px"}
          h={"30px"}
          onClick={toggleMenu}
          aria-label="Abrir menu"
        />
      )}
    </HStack>
  );
}

export default NavBar;
