import React, { useEffect, useRef } from "react";

type ProductLoadingProps = {
  isLoading: boolean;
  fetchNextPageVibe: () => void;
};

// const ProductLoading = ({
//   isLoading,
//   fetchNextPageVibe,
// }: ProductLoadingProps) => {
//   const productLoadingRef = useRef(null);

//   const handleIntersection = (entries: IntersectionObserverEntry[]) => {
//     if (entries[0].isIntersecting) {
//       fetchNextPageVibe();
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(handleIntersection, {
//       threshold: 1,
//     });
//     if (productLoadingRef.current) {
//       observer.observe(productLoadingRef.current);
//     }
//     return () => observer.disconnect();
//   }, [productLoadingRef]);
const ProductLoading = ({
  isLoading,
  fetchNextPageVibe,
}: ProductLoadingProps) => {
  const productLoadingRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const handleScroll = () => {
    if (isFetchingRef.current) return;

    if (productLoadingRef.current) {
      const rect = productLoadingRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        isFetchingRef.current = true;
        console.log("fetching...................");
        fetchNextPageVibe();
      }
    }
  };

  useEffect(() => {
    const handleScrollWithThrottle = () => {
      if (isLoading) return;
      handleScroll();
    };

    window.addEventListener("scroll", handleScrollWithThrottle);
    return () => window.removeEventListener("scroll", handleScrollWithThrottle);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [isLoading]);

  return (
    <div ref={productLoadingRef} className="text-center py-4">
      {isLoading && (
        <div className="grid grid-cols-2 gap-2 p-0.5">
          <div className="grid gap-2">
            <div className="animate-pulse h-40 w-full bg-gray-300" />
            <div className="animate-pulse h-4 w-3/4 bg-gray-300" />
            <div className="animate-pulse h-4 w-1/4 bg-gray-300" />
          </div>
          <div className="grid gap-2">
            <div className="animate-pulse h-40 w-full bg-gray-300" />
            <div className="animate-pulse h-4 w-3/4 bg-gray-300" />
            <div className="animate-pulse h-4 w-1/4 bg-gray-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductLoading;
