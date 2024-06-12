import { Heading, HStack, VStack } from "native-base";
import { Footer, Header, ProductCard } from "../../components";
import { useApiCall } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { Product } from "../../repository/interfaces";
import Fab from "../../components/fab";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { SupplyChainService } from "../../repository/supplyChain";
import { toastSuccess } from "../../utils/toastMessages";

export const AllProducts = () => {
  const { productListLoading, getProducts } = useApiCall();
  const { products } = useSelector((state: RootState) => state.generalReducer);
  const [productList, setProductList] = useState<Product[]>();
  const [barcodeIds, setBarcodeIds] = useState<string[]>([]);
  const [blockHashes, setBlockHashes] = useState<string[]>([]);
  const { isUserLoggedIn, searchedProducts } = useSelector(
    (state: RootState) => state.generalReducer
  );

  useEffect(() => {
    getProducts();
    listenToEvent();
  }, []);

  const listenToEvent = async () => {
    console.log("add p event");
    SupplyChainService.getInstance()
      .getContract()
      .on(
        "NewProduct",
        async (
          name,
          manufacturerName,
          // scientificName,
          barcodeId,
          manDateEpoch,
          // expDateEpoch,
          event
        ) => {
          console.log("name of event---->>>>", event);
          const { barcodeID, hashblock } = event.args;
          console.log("barcodeID and hashblock from event", barcodeID, hashblock);
          getProducts();
          toastSuccess("New Product successfully added");
        }
      );
  };

  
  useEffect(() => {
    !productListLoading && setProductList(products);
  }, [productListLoading]);

  useEffect(() => {
    setProductList(searchedProducts);
  }, [searchedProducts]);

  useEffect(() => {
    if (productList) {
      const barcodeIds = productList.map((product) => product.barcodeId);
      const blockHashes = productList.map((product) => product.blockHash);
      setBarcodeIds(barcodeIds);
      setBlockHashes(blockHashes);
    }
  
    console.log("barcodeID's and blockHashes", barcodeIds, blockHashes);
  }, [productList]);

  return (
    <VStack maxW="100vw" minH="100vh" bg="violet.50">
      <Header />
      <VStack w="100%" minH="85vh" alignItems="center" p="2">
        {productListLoading ? (
          <HStack mt={20} justifyContent={"center"}>
            <ThreeCircles
              color="blue"
              height={110}
              width={110}
              ariaLabel="three-circles-rotating"
            />
          </HStack>
        ) : !productListLoading && productList && productList.length === 0 ? (
          <Heading mt={20}>No Products Found</Heading>
        ) : (
          <HStack
            py={5}
            mt={[5, 20]}
            width={["100%", "96vw"]}
            alignItems="center"
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
          >
            {productList &&
              productList.map((item: Product) => (
                <ProductCard key={item.barcodeId || Date.now()} item={item} />
              ))}
          </HStack>
        )}
      </VStack>
      {isUserLoggedIn && <Fab />}
      <Footer />
    </VStack>
  );
};
