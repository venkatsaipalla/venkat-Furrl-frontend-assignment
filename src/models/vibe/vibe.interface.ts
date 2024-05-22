export interface ProductImages {
  src: string;
}
export interface Price {
  value: number;
  currency: string;
}

export interface Product {
  images: ProductImages[];
  brandName: string;
  title: string;
  price: Price;
  id: string;
}

// export interface VibeData {
//   // data: {
//   //   data: {
//   //     profileImageUrl: string;
//   //     getListingProducts: {
//   //       products: Product[];
//   //       totalProducts: number;
//   //       totalPages: number;
//   //     };
//   //   };
//   // };
//   getListingProducts:Object
//   productData: Product[] | [];
//   vibeImageUrl: string;
//   totalStoredProductIdsCount: number;
// }
// export interface VibeData {
//   data: VibeData;
//   // products: any;
//   profileImageUrl: string;
//   getListingProducts: {
//     products: Product[];
//     totalProducts: number;
//     totalPages: number;
//   };
// }

export interface ListingProductsResponse {
  data: {
    getListingProducts: {
      products: Product[];
      totalProducts: number;
      totalPages: number;
    };
  };
}

export interface VibeData {
  getListingProducts: ListingProductsResponse["data"]["getListingProducts"];
  productData: Product[] | [];
  vibeImageUrl: string;
  totalStoredProductIdsCount: number;
}
