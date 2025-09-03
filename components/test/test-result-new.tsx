import Image from "next/image";
import {
  Flex,
  Heading,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
  Box,
  Badge,
  VStack,
  HStack,
  Divider,
  Icon,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import { RiHeartPulseFill, RiFileCopyLine, RiCheckLine, RiShareForwardLine } from "react-icons/ri";

import {
  TestResult as ITestResult,
  getPersonalityClassGroupByTestScores,
} from "../../lib/personality-test";

interface TestResultProps {
  testResult: ITestResult;
}

export default function TestResult(props: TestResultProps) {
  const personalityClassGroup = getPersonalityClassGroupByTestScores(
    props.testResult.testScores
  );
  
  const shareText = `我的MBTI性格类型是${personalityClassGroup.type}！「${personalityClassGroup.epithet}」了解你的MBTI类型：`;
  const { hasCopied, onCopy } = useClipboard(shareText);

  return (
    <Flex
      my={4}
      w={{
        base: "full",
        lg: "50%",
      }}
      h="full"
      px={{ base: 4, md: 8 }}
      gap={6}
      alignItems="center"
      direction="column"
    >
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        w="full"
        overflow="hidden"
        position="relative"
        pb={8}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="6px"
          bgGradient="linear(to-r, primary.300, primary.500)"
        />
        
        <Box px={6} pt={8} pb={4}>
          <VStack spacing={4} align="center">
            <Badge
              colorScheme="primary"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
            >
              你的性格类型
            </Badge>
            
            <Heading
              id={personalityClassGroup.type}
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, primary.400, primary.600)"
              bgClip="text"
              letterSpacing="wider"
            >
              {personalityClassGroup.type}
            </Heading>
            
            <Text
              fontSize="xl"
              fontWeight="500"
              textAlign="center"
              color="gray.700"
            >
              {personalityClassGroup.epithet}
            </Text>
          </VStack>
          
          <Box
            mt={8}
            mb={4}
            position="relative"
            w="200px"
            h="200px"
            mx="auto"
          >
            <Image
              alt={personalityClassGroup.type}
              src={`/images/mbti/${personalityClassGroup.type.toLocaleUpperCase()}.png`}
              width={200}
              height={200}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <Box
              position="absolute"
              top="-8px"
              left="-8px"
              right="-8px"
              bottom="-8px"
              borderRadius="full"
              border="1px dashed"
              borderColor="primary.200"
              zIndex="-1"
            />
          </Box>
          
          <HStack justifyContent="center" mt={6} mb={2} spacing={3}>
            <Button 
              onClick={onCopy}
              leftIcon={hasCopied ? <RiCheckLine /> : <RiFileCopyLine />}
              size="sm"
              variant="outline"
              colorScheme="primary"
              borderRadius="full"
            >
              {hasCopied ? "已复制" : "复制结果"}
            </Button>
            <Button
              leftIcon={<RiShareForwardLine />}
              size="sm"
              colorScheme="primary"
              borderRadius="full"
              variant="solid"
            >
              分享结果
            </Button>
          </HStack>
        </Box>
        
        <Divider my={4} borderColor="gray.100" />
        
        <Box px={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading
                scrollMarginTop={8}
                id="description"
                as="h2"
                fontSize="xl"
                fontWeight="600"
                mb={3}
                color="gray.800"
                position="relative"
                display="inline-block"
              >
                性格概述
                <Box
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bgGradient="linear(to-r, primary.300, primary.500)"
                  borderRadius="full"
                  width="40%"
                />
              </Heading>
              
              <VStack align="stretch" spacing={3}>
                {personalityClassGroup.description
                  .split(/\.\n+/g)
                  .map((description) =>
                    description.endsWith(".") ? description : `${description}.`
                  )
                  .map((description, index) => (
                    <Text
                      key={index}
                      fontSize="md"
                      color="gray.700"
                      lineHeight="tall"
                    >
                      {`${description}`}
                    </Text>
                  ))}
              </VStack>
            </Box>
            
            <Box>
              <Heading
                scrollMarginTop={8}
                id="jungian-functional-preference-ordering"
                as="h2"
                fontSize="xl"
                fontWeight="600"
                mb={3}
                color="gray.800"
                position="relative"
                display="inline-block"
              >
                荣格功能偏好排序
                <Box
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bgGradient="linear(to-r, primary.300, primary.500)"
                  borderRadius="full"
                  width="40%"
                />
              </Heading>
              
              <Box
                border="1px solid"
                borderColor="gray.100"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
              >
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr bg="gray.50">
                      <Th color="gray.600">主导功能</Th>
                      <Td fontWeight="500" color="primary.600">
                        {personalityClassGroup.jungianFunctionalPreference.dominant}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th color="gray.600">辅助功能</Th>
                      <Td>
                        {personalityClassGroup.jungianFunctionalPreference.auxiliary}
                      </Td>
                    </Tr>
                    <Tr bg="gray.50">
                      <Th color="gray.600">第三功能</Th>
                      <Td>
                        {personalityClassGroup.jungianFunctionalPreference.tertiary}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th color="gray.600">劣势功能</Th>
                      <Td>
                        {personalityClassGroup.jungianFunctionalPreference.inferior}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </Box>
            
            <Box>
              <Heading
                scrollMarginTop={8}
                id="general-traits"
                as="h2"
                fontSize="xl"
                fontWeight="600"
                mb={3}
                color="gray.800"
                position="relative"
                display="inline-block"
              >
                一般特质
                <Box
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bgGradient="linear(to-r, primary.300, primary.500)"
                  borderRadius="full"
                  width="40%"
                />
              </Heading>
              
              <UnorderedList spacing={2} stylePosition="inside" pl={1}>
                {personalityClassGroup.generalTraits.map((trait, index) => (
                  <ListItem key={index} fontSize="md" color="gray.700">
                    {trait}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </VStack>
        </Box>
      </Box>
      
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        w="full"
        overflow="hidden"
        position="relative"
        p={6}
      >
        <Heading
          as="h2"
          fontSize="lg"
          fontWeight="600"
          mb={4}
          color="gray.800"
        >
          关系中的优势与挑战
        </Heading>
        
        <HStack spacing={4} align="flex-start">
          <Box flex="1">
            <Text fontSize="sm" fontWeight="500" color="green.600" mb={2}>
              优势
            </Text>
            <UnorderedList spacing={2} stylePosition="inside" pl={1}>
              {personalityClassGroup.relationshipStrengths.map((strength, index) => (
                <ListItem key={index} fontSize="sm" color="gray.700">
                  {strength}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          
          <Box flex="1">
            <Text fontSize="sm" fontWeight="500" color="red.600" mb={2}>
              挑战
            </Text>
            <UnorderedList spacing={2} stylePosition="inside" pl={1}>
              {personalityClassGroup.relationshipWeaknesses.map((weakness, index) => (
                <ListItem key={index} fontSize="sm" color="gray.700">
                  {weakness}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </HStack>
      </Box>
      
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        w="full"
        overflow="hidden"
        position="relative"
        p={6}
      >
        <Heading
          scrollMarginTop={8}
          id="strengths"
          as="h2"
          fontSize="lg"
          fontWeight="600"
          mb={4}
          color="gray.800"
        >
          你的天赋和优势
        </Heading>
        
        <VStack align="stretch" spacing={4}>
          <UnorderedList spacing={2} stylePosition="inside" pl={1}>
            {personalityClassGroup.strengths.map((strength, index) => (
              <ListItem key={index} fontSize="md" color="gray.700">
                {strength}
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Box>
      
      <Box
        bg="primary.50"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        w="full"
        overflow="hidden"
        position="relative"
        p={6}
      >
        <Heading
          scrollMarginTop={8}
          id="ten-rules-to-live"
          as="h2"
          fontSize="lg"
          fontWeight="600"
          mb={4}
          color="primary.700"
          display="flex"
          alignItems="center"
        >
          <Icon as={RiHeartPulseFill} mr={2} />
          十条生活建议
        </Heading>
        
        <VStack align="stretch" spacing={3}>
          {personalityClassGroup.tenRulesToLive.map((rule, index) => (
            <HStack key={index} align="flex-start" spacing={3}>
              <Box
                minW="24px"
                h="24px"
                borderRadius="full"
                bg="primary.100"
                color="primary.700"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {index + 1}
              </Box>
              <Text fontSize="md" color="gray.700">
                {rule}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
