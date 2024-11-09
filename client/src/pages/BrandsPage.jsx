import { useGetBrandsListQuery } from "@/redux/slices/brandApiSlice";

import BrandList from "@/components/brand/BrandList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Message from "@/components/features/Message";
import Meta from "@/components/features/Meta";

const BrandsPage = () => {
  const { data: brandsData, isLoading, error } = useGetBrandsListQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <div className="brands-page">
      <Meta
        title="Search Our Brands"
        description="Browse our collection of brands"
        keywords="brands, fashion brands, clothing brands"
      />
      <hr />
      <BrandList brands={brandsData} />
    </div>
  );
};

export default BrandsPage;
