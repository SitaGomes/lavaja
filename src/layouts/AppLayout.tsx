import { ReactNode, useState } from "react";
import { Box, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Menu from "../components/Menu/Menu";
import NavBar from "../components/Navbar/NavBar";

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenu = isMobile ? isMenuOpen : true;

  const toggleMenu = () => setIsMenuOpen((option) => !option);

  return (
    <HStack align={"self-start"} height={"100vh"}>
      {showMenu && <Menu />}

      <Box flex={"1"} h={"100%"} bgColor={"gray.100"} overflowY={"scroll"}>
        <VStack align={"start"} padding={"8"}>
          <NavBar title="Dashboard" toggleMenu={toggleMenu} />
          {children}
        </VStack>
      </Box>
    </HStack>
  );
}

export default AppLayout;
