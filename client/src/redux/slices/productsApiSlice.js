import { apiSlice } from "./apiSlice";
import { BRANDS_URL, PRODUCTS_URL, UPLOAD_URL } from "@/constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/list`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product",
                id: _id
              })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }],
      keepUnusedDataFor: 5
    }),

    getProductsByType: builder.query({
      query: ({ type }) => ({
        url: `${PRODUCTS_URL}/featured?type=${type}`
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: "Product",
                id: _id
              })),
              { type: "Products", id: "LIST" }
            ]
          : [{ type: "Products", id: "LIST" }]
    }),

    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId }
      ],
      keepUnusedDataFor: 5
    }),

    getFilteredProducts: builder.query({
      query: ({ size, rating, price, categories, sort, page, limit }) => {
        let queryString = `${PRODUCTS_URL}?`;
        if (size) queryString += `size=${size}&`;
        if (rating) queryString += `rating=${rating}&`;
        if (price) queryString += `price=${price}&`;
        const categoriesParam = Array.isArray(categories)
          ? categories.join(",")
          : categories;
        if (categoriesParam) queryString += `category=${categoriesParam}&`;
        if (sort) queryString += `sort=${sort}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return queryString;
      },
      providesTags: [{ type: "Products", id: "LIST" }]
    }),

    getFilteredProductsByBrand: builder.query({
      query: ({
        size,
        rating,
        price,
        categories,
        sort,
        page,
        limit,
        brandSlug
      }) => {
        let queryString = `${BRANDS_URL}/${brandSlug}?`;
        if (size) queryString += `size=${size}&`;
        if (rating) queryString += `rating=${rating}&`;
        if (price) queryString += `price=${price}&`;
        const categoriesParam = Array.isArray(categories)
          ? categories.join(",")
          : categories;
        if (categoriesParam) queryString += `category=${categoriesParam}&`;
        if (sort) queryString += `sort=${sort}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        return queryString;
      },
      providesTags: [{ type: "Products", id: "LIST" }]
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId }
      ]
    }),

    addToWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCTS_URL}/wishlist`,
        method: "PUT",
        body: { productId }
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),

    createProduct: builder.mutation({
      query: ({ formData }) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: formData
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),

    updateProduct: builder.mutation({
      query: ({ formData, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
        { type: "Products", id: "LIST" }
      ]
    }),

    uploadProductImages: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }]
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductsByTypeQuery,
  useGetProductQuery,
  useGetFilteredProductsQuery,
  useGetFilteredProductsByBrandQuery,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useAddToWishlistMutation,
  useCreateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductMutation
} = productsApiSlice;
