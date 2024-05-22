import { Product, VibeData } from "@/models/vibe/vibe.interface";
import { getVibesData, getVibeByNamee } from "@/models/vibe/vibe.url";
import { useEffect, useRef, useState } from "react";

type UseVibeReturnType = {
  vibe: undefined | VibeData;
  error: undefined | string;
  isLoading: boolean;
  fetchNextPageVibe: () => void;
};

const useVibe = (): UseVibeReturnType => {
  const [vibe, setVibe] = useState<VibeData | undefined>();
  const [vibeImageUrl, setVibeImageUrl] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isFetchingRef = useRef<boolean>(false);

  const fetchVibeData = async (page: number) => {
    // if (isFetchingRef.current) return;
    // isFetchingRef.current = true;
    setIsLoading(true);
    try {
      // const { productData, totalStoredProductIdsCount } = await getVibesData(
      //   page
      // );
      const { data } = await getVibesData(page);
      console.log({ data });
      const { getVibeByName } = await getVibeByNamee(page);
      const { profileImageUrl } = getVibeByName;
      setVibe((oldVibeData: VibeData | undefined) => {
        if (!oldVibeData)
          return {
            getListingProducts: data.getListingProducts,
            productData: data.getListingProducts.products,
            totalStoredProductIdsCount: data.getListingProducts.totalProducts,
            vibeImageUrl: profileImageUrl,
          };
        return {
          ...oldVibeData,
          totalStoredProductIdsCount: data.getListingProducts.totalProducts,
          vibeImageUrl: profileImageUrl,
          productData: [
            ...oldVibeData.productData,
            ...data.getListingProducts.products,
          ],
        };
      });
      console.log({ vibe });
      setIsLoading(false);
    } catch (error) {
      setError(error as string);
      setIsLoading(false);
    }
  };

  const fetchNextPageVibe = () => {
    if (isLoading) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchVibeData(currentPage);
  }, [currentPage]);

  return { vibe, error, isLoading, fetchNextPageVibe };
};

export default useVibe;
