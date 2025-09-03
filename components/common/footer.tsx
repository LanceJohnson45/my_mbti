import Link from "next/link";
import { Flex, Text, Button, Icon, HStack, Divider } from "@chakra-ui/react";
import { RiHeartFill, RiStarFill } from "react-icons/ri";

export default function Footer() {
  return (
    <Flex
      as="footer"
      py={6}
      w="100%"
      bgColor="white"
      color="gray.600"
      direction="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.03)"
    >
      <Flex 
        direction="column" 
        alignItems="center"
        maxW="container.md"
        textAlign="center"
        px={4}
      >
        <HStack spacing={2} mb={1}>
          <Text fontSize="sm">用</Text>
          <Icon as={RiHeartFill} color="primary.400" />
          <Text fontSize="sm">测量你的性格特质</Text>
        </HStack>
        
        <Text fontSize="xs" color="gray.500" mb={4}>
          本测试基于迈尔斯-布里格斯类型指标(MBTI)心理学理论，帮助你更好地了解自己
        </Text>
        
        <Divider width="50%" mb={4} />
        
        <Text fontSize="xs" color="gray.400">
          Copyright © {new Date().getFullYear()} Sirius | 以爱之名，探索心灵
        </Text>
      </Flex>
    </Flex>
  );
}
