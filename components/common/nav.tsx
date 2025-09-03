import Link from "next/link";
import { Flex, Button, Box, Text, Icon } from "@chakra-ui/react";
import { BiHistory } from "react-icons/bi";
import { RiHeartsFill } from "react-icons/ri";

export default function Nav() {
  return (
    <Flex
      as="nav"
      py={3}
      px={5}
      w="full"
      h={20}
      justifyContent="space-between"
      alignItems="center"
      overflowX="hidden"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.05)"
      bgColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(8px)"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex
        gap={5}
        alignItems="center"
        overflowX="hidden"
      >
        <Link href="/">
          <Button
            variant="unstyled"
            display="flex"
            alignItems="center"
            fontSize="xl"
            fontWeight="bold"
            fontFamily="Montserrat"
            color="primary.500"
            _hover={{ color: "primary.600" }}
            position="relative"
            overflow="visible"
          >
            <Icon as={RiHeartsFill} mr={2} color="primary.400" />
            <Text as="span">MBTI</Text>
            <Text 
              as="span" 
              color="gray.600" 
              ml={1} 
              fontWeight="normal"
              fontSize="md"
            >
              性格测试
            </Text>
            <Box
              position="absolute"
              bottom="-2px"
              left="0"
              right="0"
              height="2px"
              bgGradient="linear(to-r, primary.300, primary.500)"
              borderRadius="full"
            />
          </Button>
        </Link>
      </Flex>
      <Link href="/test/result/history">
        <Button
          variant="outline"
          borderColor="primary.300"
          color="primary.500"
          leftIcon={<BiHistory size={20} />}
          borderRadius="full"
          px={6}
          _hover={{
            bg: "primary.50",
            borderColor: "primary.400"
          }}
          fontSize="sm"
          fontWeight="500"
        >
          测试历史
        </Button>
      </Link>
    </Flex>
  );
}
