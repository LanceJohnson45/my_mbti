import Link from "next/link";
import { Flex, Text, Button } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      py={2}
      w="100%"
      h="full"
      bg="black"
      color="white"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        本网站上的所有测试都基于MBTI心理学概念
      </Text>
      <Text>
        Copyright @Sirius
         
      </Text>
    </Flex>
  );
}
