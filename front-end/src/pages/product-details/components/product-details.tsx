import { Box, HStack, Image, Text, VStack } from "native-base";
import Button from '@mui/material/Button';
import { Barcode } from "../../../components/barcode";
import validator from "validator";
import { Product } from "../../../repository/interfaces";
import { getNumberOfDays } from "../../../utils/daysLeft";
import { epochToDate } from "../../../utils/epochToDate";
import { GenerelInformation } from "./general-information";
import { useEffect, useState } from "react";
import webgazer from "webgazer";

export const ProductDetail = ({ data }: { data: Product }) => {
  console.log("Product-Data--->", data);
  const [isWebgazerStarted, setIsWebgazerStarted] = useState(false);
  

  useEffect(() => {
    if (isWebgazerStarted) {
      webgazer
        .setGazeListener(function(data: { x: any; y: any; } | null, elapsedTime: any) {
          if (data == null) {
            return;
          }
          var xprediction = data.x; //these x coordinates are relative to the viewport
          var yprediction = data.y; //these y coordinates are relative to the viewport
          console.log(elapsedTime); //elapsed time is based on time since begin was called
        })
        .begin();
    } else {
      if (webgazer.isReady()) {
        webgazer.end();
      }
    }
  }, [isWebgazerStarted]);

  const toggleWebgazer = () => {
    setIsWebgazerStarted(!isWebgazerStarted);
  };
  return (
    <>
      <Box position="relative" height={[null, "auto" , "auto", "auto", "auto"]}>
        <HStack space={[3, 5]}>
          <HStack justifyContent={"center"}>
            <Image
              key={data?.barcodeId}
              borderRadius={"md"}
              size={["300px", "300px"]}
              resizeMode="cover"
              fallbackSource={{
                uri: "",
              }}
              source={{
                uri: data?.productImage,
              }}
              alt={data.name}
            />
          </HStack>
          <VStack maxWidth={["40%"]}>
            <Text
              color="coolGray.600"
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize={["md", "2xl"]}>
              {data?.name}
            </Text>
            <Text
              fontSize={["sm", "lg"]}
              fontWeight="thin"
              textTransform="uppercase"
              color="coolGray.500">
              {data?.barcodeId}
            </Text>
            <Text
              fontSize={["12", "sm"]}
              fontWeight="light"
              textTransform="uppercase"
              color="coolGray.400">
              mfg {epochToDate(Number(data.manDateEpoch.toString()))}
            </Text>
            
          </VStack>
        </HStack>
        
        {data?.isInBatch && (
          <VStack position="absolute" right={5}>
            <Text
              textTransform="capitalize"
              fontSize={["sm", "20"]}
              color="coolGray.600"
              fontWeight="semibold">
              Batch Count
            </Text>
            <Text textAlign={"center"} fontSize={["xl", "4xl"]} fontWeight="bold">
              {data?.batchCount.toString()}
            </Text>
          </VStack>
        )}
        <Box position="absolute" right={5} top={"45%"} bottom={80}>
          <Barcode 
            barcodeId={data?.barcodeId} 
            manufacturerName={data?.manufacturerName}
            manDateEpoch={data?.manDateEpoch}
            productType={data?.productType}
            productImage={data?.productImage}
          />
        </Box>
      </Box>
      <Box mt={40}>
        <Button variant="outlined" onClick={toggleWebgazer}>
          {isWebgazerStarted ? "Stop Webgazer" : "Start Webgazer"}
        </Button>
      </Box>
    </>
  );
};
