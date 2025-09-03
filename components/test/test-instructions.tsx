import {
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
  Box,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { RiTimeLine, RiMentalHealthLine, RiHeartLine } from "react-icons/ri";

interface TestInstructionsProps {
  onCloseTestInstructions: () => void;
}

export default function TestInstructions(props: TestInstructionsProps) {
  return (
    <Flex
      h="full"
      px={{ base: 4, md: 8 }}
      py={6}
      direction="column"
      gap={6}
      maxW="700px"
      mx="auto"
    >
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        p={{ base: 6, md: 8 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="6px"
          bgGradient="linear(to-r, primary.300, primary.500)"
        />
        
        <Heading 
          size="lg" 
          mb={6} 
          color="gray.800"
          fontWeight="600"
        >
          开始前的小提示
        </Heading>
        
        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            <Icon as={RiTimeLine} boxSize={10} color="primary.500" p={2} bg="primary.50" borderRadius="md" />
            <Box>
              <Text fontWeight="500" color="gray.700" mb={1}>
                时间
              </Text>
              <Text fontSize="sm" color="gray.600">
                完成测试仅需15分钟左右，为自己创造一个安静、不受打扰的环境
              </Text>
            </Box>
          </HStack>
          
          <HStack spacing={4}>
            <Icon as={RiMentalHealthLine} boxSize={10} color="primary.500" p={2} bg="primary.50" borderRadius="md" />
            <Box>
              <Text fontWeight="500" color="gray.700" mb={1}>
                真实回答
              </Text>
              <Text fontSize="sm" color="gray.600">
                没有对错之分，请根据你的第一直觉作答，不要过度分析，选择最符合你实际情况的答案
              </Text>
            </Box>
          </HStack>
          
          <HStack spacing={4}>
            <Icon as={RiHeartLine} boxSize={10} color="primary.500" p={2} bg="primary.50" borderRadius="md" />
            <Box>
              <Text fontWeight="500" color="gray.700" mb={1}>
                表达自我
              </Text>
              <Text fontSize="sm" color="gray.600">
                回答时请展现真实的你，而不是你期望别人看到的样子，这样才能获得最准确的结果
              </Text>
            </Box>
          </HStack>
        </VStack>
        
        <Button
          mt={8}
          colorScheme="primary"
          alignSelf="center"
          width={{ base: "full", md: "auto" }}
          px={8}
          py={6}
          fontWeight="500"
          borderRadius="full"
          boxShadow="0 4px 12px rgba(213, 63, 140, 0.2)"
          onClick={props.onCloseTestInstructions}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(213, 63, 140, 0.3)",
          }}
          transition="all 0.3s ease"
          size="lg"
        >
          开始测试
        </Button>
      </Box>
    </Flex>
  );
}
