import { Box, Heading, HStack, Text, VStack } from "native-base";
import { BsFillArrowRightCircleFill, BsWallet2 } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { UserDetails } from "../../../repository/interfaces";

export function UsersData({ data }: { data: UserDetails[] }) {
  return (
    <>
      {data.length === 0 ? (
        <VStack>
          <Heading>No users found</Heading>
          <HStack alignItems={"center"} mt="4">
            <Text bold mr="3">
              Add users
            </Text>
            <BsFillArrowRightCircleFill size="20" />
          </HStack>
        </VStack>
      ) : (
        data.map((i,index) => (
          <Box
            borderBottomWidth={1}
            borderBottomColor="gray.300"
            mb="4"
            py="2"
            // key={i.id_}
            key={index}
            w={["80vw", "100%"]}
            overflow={["scroll", "hidden"]}
          
          >
            <HStack w="full" key={i.name}>
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
                color="indigo.500"
              >
                {i.name}
              </Text>
            </HStack>
            <HStack alignItems={"center"} key={i.email}>
              <FiMail size={20} />
              <Text ml="2" color="gray.700">
                {i.email}
              </Text>
            </HStack>
            <HStack alignItems={"center"} key={i.id_}>
              <BsWallet2 size={20} />
              <Text ml="2" color="gray.700">
                {i.id_}
              </Text>
            </HStack>
          </Box>
        ))
      )}
    </>
  );
}
