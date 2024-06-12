import { Box, Center, Text, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components";
import "./style.css";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <VStack maxW="100vw" minH="100vh" bg="violet.50">
      <Header />
      <div className="image-bg">
        <Center minHeight={["84vh"]}>
          <Box maxWidth={["90%", "50%"]} mb={8}>
            <Text
              textAlign="center"
              color="black"
              fontStyle={"bold"}
              fontSize={["5xl", "8xl"]}>
              Discover Your Signature Style
            </Text>
            <Text
              textAlign="center"
              color="black"
              fontSize={["xl", "2xl"]}
              fontWeight="light">
              From fashion-forward apparel to timeless accessories, our curated selection caters to every taste and occasion. Explore an array of handpicked products designed to elevate your wardrobe and express your unique personality.
            </Text>
          </Box>
          <button
            onClick={() => navigate("/all-products")}
            className="explore-button">
            Explore our Products
          </button>
        </Center>
        <Footer />
      </div>
    </VStack>
  );
};
