import { apiSlice } from "@/redux/slices/apiSlice";
import { BRANDS_URL } from "@/constants";

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandsList: builder.query({
      query: () => ({
        url: `${BRANDS_URL}/list`
      }),
      providesTags: ["Brands"],
      keepUnusedDataFor: 5
    })
  })
});

export const { useGetBrandsListQuery } = brandsApiSlice;
