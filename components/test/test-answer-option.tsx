import { useRadio, Box, Flex, Text } from "@chakra-ui/react";

export default function TestAnswerOption(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      w="full"
      as="label"
    >
      <input {...input} />
      <Box
        px={5}
        py={4}
        cursor="pointer"
        borderWidth={1}
        borderRadius="lg"
        borderColor="gray.200"
        boxShadow="sm"
        transition="all 0.2s ease"
        userSelect="none"
        position="relative"
        overflow="hidden"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "md",
          borderColor: "primary.100",
        }}
        _checked={{
          bg: "primary.50",
          color: "primary.700",
          borderColor: "primary.300",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary-300)",
        }}
        _focus={{
          boxShadow: "0 0 0 3px var(--chakra-colors-primary-100)",
        }}
        {...checkbox}
      >
        <Flex align="center">
          <Box 
            w="18px" 
            h="18px" 
            borderRadius="full" 
            borderWidth="2px"
            borderColor={props.isChecked ? "primary.500" : "gray.300"}
            mr={3}
            position="relative"
          >
            {props.isChecked && (
              <Box
                position="absolute"
                top="3px"
                left="3px"
                w="8px"
                h="8px"
                borderRadius="full"
                bg="primary.500"
              />
            )}
          </Box>
          <Text fontWeight={props.isChecked ? "500" : "normal"}>
            {props.children}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
