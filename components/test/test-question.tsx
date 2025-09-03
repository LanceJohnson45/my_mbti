import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRadioGroup, Flex, Text, Button, Box, Progress, VStack, HStack, Heading, Icon } from "@chakra-ui/react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { RiHeartPulseFill } from "react-icons/ri";

import TestProgress from "./test-progress";
import TestAnswerOption from "./test-answer-option";

import { personalityTest } from "../../data/personality-test";
import {
  TestAnswerOption as TestAnswer,
  getQuestionAnswerScore,
  saveTestResult,
} from "../../lib/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

export default function TestQuestion() {
  const router = useRouter();

  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();

  const [currentPersonalityTestIndex, setCurrentPersonalityTestIndex] =
    useState(0);

  const isUserAlreadyPickAnswer =
    userTestAnswers[currentPersonalityTestIndex] !== undefined;

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: "answer",
    defaultValue: userTestAnswers[currentPersonalityTestIndex],
    onChange: (value) => {
      const newUserTestAnswers = [...userTestAnswers];

      newUserTestAnswers[currentPersonalityTestIndex] =
        value as TestAnswer["type"];

      setUserTestAnswers(newUserTestAnswers);
      
      // 自动前进到下一题
      if (currentPersonalityTestIndex < personalityTest.length - 1) {
        setTimeout(() => {
          handleNextButtonClick();
        }, 500);
      }
    },
  });

  const group = getRootProps();

  useEffect(() => {
    if (userTestAnswers[currentPersonalityTestIndex] === undefined) {
      setValue("");
      return;
    }

    setValue(userTestAnswers[currentPersonalityTestIndex]);
  }, [currentPersonalityTestIndex, userTestAnswers, setValue]);

  function handleNextButtonClick() {
    setCurrentPersonalityTestIndex((currentPersonalityTestIndex) => {
      if (currentPersonalityTestIndex + 1 > personalityTest.length - 1) {
        return currentPersonalityTestIndex;
      }

      return currentPersonalityTestIndex + 1;
    });
  }

  function handlePreviousButtonClick() {
    setCurrentPersonalityTestIndex((currentPersonalityTestIndex) => {
      if (currentPersonalityTestIndex - 1 < 0) {
        return currentPersonalityTestIndex;
      }

      return currentPersonalityTestIndex - 1;
    });
  }

  function handleSeeResultButtonClick() {
    const timestamp = Date.now();
    const testScores = userTestAnswers.map((answer, index) =>
      getQuestionAnswerScore(index + 1, answer)
    );

    saveTestResult({
      testAnswers: userTestAnswers,
      testScores,
      timestamp,
    })
      .tap(() => {
        setUserTestAnswers([]);
      })
      .tapOk((id) => {
        router.replace(`/test/result/?testResultId=${id}`);
      })
      .tapError((error) => {
        console.error(error);
      });
  }

  const progress = ((currentPersonalityTestIndex + 1) / personalityTest.length) * 100;
  const currentQuestion = personalityTest[currentPersonalityTestIndex];

  return (
    <Flex
      py={8}
      w="full"
      h="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
    >
      <Box
        width="100%"
        maxW="700px"
        bg="white"
        borderRadius="xl"
        boxShadow="0 4px 20px rgba(0,0,0,0.08)"
        overflow="hidden"
        position="relative"
      >
        <Progress 
          value={progress} 
          size="xs" 
          colorScheme="primary" 
          position="absolute"
          top="0"
          left="0"
          right="0"
        />
        
        <Box p={{ base: 6, md: 8 }}>
          <HStack justifyContent="space-between" mb={8}>
            <Text fontSize="sm" color="gray.500">问题 {currentPersonalityTestIndex + 1}/{personalityTest.length}</Text>
            <Text fontSize="sm" color="gray.500">完成度 {progress.toFixed(0)}%</Text>
          </HStack>
          
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading 
                size="md" 
                fontWeight="600"
                color="gray.800"
                lineHeight="1.4"
                mb={2}
              >
                {currentQuestion.question}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                请选择最符合你的选项
              </Text>
            </Box>
            
            <VStack 
              {...group} 
              spacing={4} 
              align="stretch"
              bg="gray.50"
              p={4}
              borderRadius="lg"
            >
              {currentQuestion.answerOptions.map((answerOption) => {
                const radio = getRadioProps({ value: answerOption.type });
                return (
                  <TestAnswerOption
                    key={answerOption.type}
                    {...radio}
                  >
                    {answerOption.answer}
                  </TestAnswerOption>
                );
              })}
            </VStack>
          </VStack>
          
          <HStack justifyContent="space-between" mt={8}>
            <Button
              onClick={handlePreviousButtonClick}
              isDisabled={currentPersonalityTestIndex === 0}
              leftIcon={<FiArrowLeft size={16} />}
              variant="ghost"
              color="gray.600"
              size="md"
            >
              上一题
            </Button>
            
            {currentPersonalityTestIndex === personalityTest.length - 1 ? (
              <Button
                onClick={handleSeeResultButtonClick}
                isDisabled={!isUserAlreadyPickAnswer}
                colorScheme="primary"
                size="md"
                rightIcon={<Icon as={RiHeartPulseFill} />}
                px={6}
                boxShadow="0 4px 12px rgba(213, 63, 140, 0.2)"
                _hover={{
                  boxShadow: "0 6px 16px rgba(213, 63, 140, 0.3)",
                }}
                borderRadius="full"
                fontWeight="500"
              >
                查看结果
              </Button>
            ) : (
              <Button
                onClick={handleNextButtonClick}
                isDisabled={!isUserAlreadyPickAnswer}
                rightIcon={<FiArrowRight size={16} />}
                variant="solid"
                colorScheme="primary"
                size="md"
              >
                下一题
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
}
