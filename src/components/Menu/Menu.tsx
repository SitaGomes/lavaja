import {
  Box,
  Divider,
  Image,
  VStack,
} from "@chakra-ui/react";

import { AiOutlineBarChart, AiOutlineCalendar, AiOutlineCar, AiOutlineUser} from "react-icons/ai";
import {BsBag} from "react-icons/bs";
import ActiveLink from "./ActiveLink";
import InternalRoutes from "../../utils/InternalRoutes";

function Menu() {

  return (
    <Box w="300px" h={"100%"}>
      <Image src="/logo-big.png" padding={"4"} alt="LavaJa garage logo" />
      <Divider marginY={"6"} />
      <VStack align={"self-start"} paddingStart={"8"} gap={"8"}>
        <ActiveLink name="Dashboard" icon={AiOutlineBarChart} href={InternalRoutes.DASHBOARD} />
        <ActiveLink name="Calendario" icon={AiOutlineCalendar} href={InternalRoutes.CALENDAR} />
        <ActiveLink name="Portifolio" icon={BsBag} href={InternalRoutes.PORTFOLIO} />
        <ActiveLink name="Veiculos" icon={AiOutlineCar} href={InternalRoutes.VEHICLES} />
        <ActiveLink name="Clientes" icon={AiOutlineUser} href={InternalRoutes.CLIENTS} />
        <ActiveLink name="Produtos" icon={AiOutlineUser} href={InternalRoutes.PRODUCT} />
      </VStack>
    </Box>
  );
}

export default Menu;
