import { Flex, Text, Heading, Box, VStack, HStack, Progress, Divider } from "@chakra-ui/react";

import { personalityClasses } from "../../data/personality-classes";
import { PersonalityClass, TestResult } from "../../lib/personality-test";

interface TestResultStatsProps {
  testResult: TestResult;
}

function ScoreStats(props: {
  testScores: PersonalityClass["type"][];
  targetScore: PersonalityClass["type"];
  color: string;
}) {
  const testScoresFiltered = props.testScores.filter(
    (score) => score === props.targetScore
  );
  
  const percentage = (testScoresFiltered.length / props.testScores.length) * 100;
  const colorScheme = props.color.includes('.') ? props.color.split('.')[0] : props.color;

  return (
    <Box width="100%">
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="500" color="gray.700">{props.targetScore}</Text>
        <HStack spacing={1}>
          <Text fontSize="sm" fontWeight="600" color={props.color}>
            {percentage.toFixed(0)}%
          </Text>
          <Text fontSize="xs" color="gray.500">
            ({testScoresFiltered.length})
          </Text>
        </HStack>
      </HStack>
      <Progress 
        value={percentage} 
        size="sm" 
        colorScheme={colorScheme}
        borderRadius="full"
      />
    </Box>
  );
}

export default function TestResultStats(props: TestResultStatsProps) {
  const statsColors: Record<string, string> = {
    "E": "primary.500",
    "I": "primary.700",
    "S": "orange.500",
    "N": "orange.700",
    "T": "blue.500",
    "F": "blue.700",
    "J": "green.500",
    "P": "green.700",
  };

  const personalityPairs = [
    { first: "E", second: "I", title: "能量来源" },
    { first: "S", second: "N", title: "信息获取" },
    { first: "T", second: "F", title: "决策方式" },
    { first: "J", second: "P", title: "生活方式" },
  ];

  return (
    <Flex
      my={4}
      mx={{ base: 0, lg: 4 }}
      w={{
        base: "full",
        lg: "25%",
      }}
      h="min-content"
      gap={6}
      top={5}
      direction="column"
      pos={{
        base: "static",
        lg: "sticky",
      }}
      alignSelf="flex-start"
    >
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        p={6}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="6px"
          height="100%"
          bgGradient="linear(to-b, primary.300, primary.500)"
        />
        
        <Heading
          as="h2"
          fontSize="lg"
          fontWeight="600"
          mb={6}
          color="gray.800"
        >
          人格维度分析
        </Heading>
        
        <VStack spacing={6} align="stretch">
          {personalityPairs.map((pair, index) => (
            <Box key={index}>
              <Text fontSize="sm" fontWeight="500" color="gray.600" mb={3}>
                {pair.title}
              </Text>
              <VStack spacing={4} align="stretch">
                <ScoreStats 
                  testScores={props.testResult.testScores} 
                  targetScore={pair.first as PersonalityClass["type"]} 
                  color={statsColors[pair.first]}
                />
                <ScoreStats 
                  testScores={props.testResult.testScores} 
                  targetScore={pair.second as PersonalityClass["type"]} 
                  color={statsColors[pair.second]}
                />
              </VStack>
              {index < personalityPairs.length - 1 && (
                <Divider my={4} borderColor="gray.100" />
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
          justifyContent="space-between"
          alignItems="center"
          bg={`${statsColorScheme[index]}.500`}
        >
          <Text
            fontWeight="semibold"
            color="white"
          >
            {personalityClass.description}
          </Text>
          <ScoreStats
            testScores={props.testResult.testScores}
            targetScore={personalityClass.type}
          />
        </Flex>
      ))}
    </Flex>
  );
}
