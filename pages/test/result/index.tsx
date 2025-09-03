import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Option, AsyncData, Result } from "@swan-io/boxed";
import { Flex, Show, Text, Box, Spinner, Center } from "@chakra-ui/react";

import MainLayout from "../../../components/layouts/main-layout";
import TestResult from "../../../components/test/test-result-new";
import TestResultTableOfContent from "../../../components/test/test-result-table-of-content";
import TestResultStats from "../../../components/test/test-result-stats";
import {
  TestResult as ITestResult,
  getSavedTestResult,
} from "../../../lib/personality-test";

export default function TestResultPage() {
  const router = useRouter();

  const [testResult, setTestResult] = useState<
    AsyncData<Result<Option<ITestResult>, Error>>
  >(AsyncData.NotAsked());

  useEffect(() => {
    if (router.isReady) {
      setTestResult(AsyncData.Loading());

      const id = parseInt(router.query.testResultId as string);

      getSavedTestResult(id).tap((result) =>
        setTestResult(AsyncData.Done(result))
      );
    }
  }, [router.isReady, router.query.testResultId]);

  return (
    <MainLayout hideBackground={true}>
      {testResult.match({
        NotAsked: () => (
          <Center h="50vh" w="full">
            <Spinner color="primary.500" size="lg" />
          </Center>
        ),
        Loading: () => (
          <Center h="50vh" w="full">
            <Spinner color="primary.500" size="lg" />
          </Center>
        ),
        Done: (result) =>
          result.match({
            Error: () => (
              <Center h="50vh" w="full" color="red.500" p={4} textAlign="center">
                <Text>出现错误！请刷新页面重试！</Text>
              </Center>
            ),
            Ok: (value) =>
              value.match({
                Some: (data) => (
                  <Box 
                    minH="100vh" 
                    w="full" 
                    bgGradient="linear(to-b, primary.50, white)"
                  >
                    <Flex
                      h="full"
                      direction={{
                        base: "column",
                        lg: "row",
                      }}
                      maxW="1400px"
                      mx="auto"
                      py={8}
                    >
                      <TestResultStats testResult={data} />
                      <TestResult testResult={data} />
                      <Show above="lg">
                        <TestResultTableOfContent />
                      </Show>
                    </Flex>
                  </Box>
                ),
                None: () => (
                  <Center h="50vh" w="full" color="gray.500" p={4} textAlign="center">
                    <Text>未找到测试结果，请重新测试</Text>
                  </Center>
                ),
              }),
          }),
      })}
    </MainLayout>
  );
}
