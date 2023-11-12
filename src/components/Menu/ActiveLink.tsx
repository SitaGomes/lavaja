import { As, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import useGetHref from "../../hooks/custom/useHref";

type ActiveLinkProps = {
  name: string;
  icon: As;
  href: string;
  exact?: boolean;
};

function ActiveLink({ icon, name, href, exact = false }: ActiveLinkProps) {
  const location = useLocation();
  let active = false;

  const path = useGetHref(location.pathname);
  console.log(path, href);

  if (exact && path === href) active = true;

  if (!exact && href.split("/").includes(path)) active = true;

  const iconColor = active ? "yellow.400" : "gray.400";

  return (
    <Link to={href} style={{width: "100%"}}>
        {active ? (
          <HStack borderRight={"4px"} borderColor={iconColor} w={"100%"}>
            <Flex alignItems={"center"} gap={"4"}>
              <Icon as={icon} color={iconColor} w="25px" h="25px" />
              <Text paddingTop={"2"} fontWeight={"bold"}>{name}</Text>
            </Flex>
          </HStack>
        ) : (
          <HStack w={"100%"}>
            <Flex alignItems={"center"} gap={"4"}>
              <Icon as={icon} color={iconColor} w="25px" h="25px" />
              <Text color={"gray"} paddingTop={"2"}>{name}</Text>
            </Flex>
          </HStack>
        )}
    </Link>
  );
}

export default ActiveLink;
