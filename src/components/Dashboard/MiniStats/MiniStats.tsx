import { As, Flex, Icon, Text } from "@chakra-ui/react";
import Card from "../../Card/Card";

type MiniStatsProps = {
  icon: As;
  title: string;
  value: string;
  href?: string;
};

function MiniStats({ icon, title, value, href }: MiniStatsProps) {
  return (
    <>
      {href ? (
        <Card href={href}>
          <Icon as={icon} w="56px" h="56px" color="gray.700" />
          <Flex flexDir={"column"} w={"100%"}>
            <Text color={"gray.500"} fontSize={["smaller", "sm"]}>
              {title}
            </Text>
            <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
              {value}
            </Text>
          </Flex>
        </Card>
      ) : (
        <Card>
          <Icon as={icon} w="56px" h="56px" color="gray.700" />
          <Flex flexDir={"column"} w={"100%"}>
            <Text color={"gray.500"} fontSize={["smaller", "sm"]}>
              {title}
            </Text>
            <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
              {value}
            </Text>
          </Flex>
        </Card>
      )}
    </>
  );
}

export default MiniStats;
