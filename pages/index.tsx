import Link from "next/link";
import { Heading, Text, Highlight, Flex, Button, Box, VStack, Icon } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { RiHeartPulseFill, RiMagicFill, RiEyeFill } from "react-icons/ri";
import Image from "next/image";

import MainLayout from "../components/layouts/main-layout";

export default function HomePage() {
  return (
    <>
      <MainLayout>
        <Flex
          w="full"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          px={4}
          py={10}
          maxW="1200px"
          mx="auto"
        >
          <Box
            w="full"
            maxW="800px"
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.1)"
            position="relative"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="10px"
              bgGradient="linear(to-r, primary.300, primary.500)"
              zIndex="1"
            />
            
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems="center"
            >
              <VStack
                spacing={6}
                p={{ base: 8, md: 10 }}
                flex="1"
                align="flex-start"
              >
                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  lineHeight="tall"
                  color="gray.800"
                >
                  发现最真实的
                  <Box 
                    as="span" 
                    display="inline-block"
                    bgGradient="linear(to-r, primary.400, primary.600)"
                    bgClip="text"
                    fontWeight="extrabold"
                    ml={2}
                    position="relative"
                  >
                    自我
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      right="0"
                      height="3px"
                      bgGradient="linear(to-r, primary.400, primary.600)"
                      borderRadius="full"
                    />
                  </Box>
                </Heading>
                
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.600"
                >
                  探索你的MBTI性格类型，揭示你独特的思维方式、情感表达与人际互动模式
                </Text>
                
                <VStack align="flex-start" spacing={3}>
                  <Flex align="center" gap={3}>
                    <Icon as={RiHeartPulseFill} color="primary.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.700">发现你的内在优势与潜能</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Icon as={RiMagicFill} color="primary.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.700">了解与他人相处的理想方式</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Icon as={RiEyeFill} color="primary.500" boxSize={5} />
                    <Text fontSize="sm" color="gray.700">获取职业发展与人生方向的洞见</Text>
                  </Flex>
                </VStack>
                
                <Link href="/test" style={{ marginTop: "12px" }}>
                  <Button
                    colorScheme="primary"
                    size="lg"
                    fontWeight="500"
                    px={8}
                    borderRadius="full"
                    boxShadow="0 4px 12px rgba(213, 63, 140, 0.2)"
                    rightIcon={<FiArrowRight size={18} />}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(213, 63, 140, 0.3)",
                    }}
                    transition="all 0.3s ease"
                  >
                    开始测试
                  </Button>
                </Link>
              </VStack>
              
              <Box
                flex="1"
                h={{ base: "200px", md: "400px" }}
                position="relative"
                overflow="hidden"
                display={{ base: "none", md: "block" }}
              >
                <Image
                  alt="MBTI人格测试"
                  src="/images/mbti.jpg"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bgGradient="linear(to-r, white, transparent)"
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </MainLayout>
    </>
  );
}
