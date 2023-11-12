import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  children: ReactNode;
  href?: string;
};

function Card({ children, href }: CardProps) {
  return (
    <>
      {href ? (
        <Link to={href} style={{width: "100%"}}>
          <Flex
            padding={"4"}
            bg={"white"}
            borderRadius={"20px"}
            gap={"4"}
            w={"100%"}
            _hover={{shadow: "md"}}
          >
            {children}
          </Flex>
        </Link>
      ) : (
        <Flex
          padding={"4"}
          bg={"white"}
          borderRadius={"20px"}
          gap={"4"}
          w={"100%"}
        >
          {children}
        </Flex>
      )}
    </>
  );
}

export default Card;
