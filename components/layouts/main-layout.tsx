import Head from "next/head";
import { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";

import Nav from "../common/nav";
import Footer from "../common/footer";

interface MainLayoutProps {
  children: ReactNode;
  hideBackground?: boolean
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>MBTI 性格测试 | 发现真实的自我</title>
        <meta
          name="description"
          content="探索你的MBTI性格类型，了解自己的特质与优势"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Box
        w="full"
        minH="100vh"
        background={props.hideBackground 
          ? 'transparent' 
          : 'linear-gradient(135deg, rgba(255, 240, 245, 0.9) 0%, rgba(255, 182, 193, 0.7) 50%, rgba(255, 240, 245, 0.9) 100%)'}
        backgroundSize="cover"
        backgroundAttachment="fixed"
        position="relative"
      >
        {!props.hideBackground && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgImage="url('/images/pattern.png')"
            opacity="0.05"
            zIndex="0"
            pointerEvents="none"
          />
        )}
        <Nav />
        <Flex
          as="main"
          w="100%"
          minH="calc(100vh - 80px)"
          justifyContent="center"
          alignItems="center"
          position="relative"
          zIndex="1"
        >
          {props.children}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
