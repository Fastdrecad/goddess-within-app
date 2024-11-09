import FeaturedProducts from "@/components/features/FeaturedProducts";
import Categories from "@/components/features/Categories";
import Meta from "@/components/features/Meta";
import Carousel from "@/components/features/Carousel";

const HomePage = () => {
  return (
    <section className="home">
      <Meta
        title="Welcome to Goddess Within"
        description="Home page"
        keywords="home, page"
      />
      <Carousel />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="recommended" />
    </section>
  );
};

export default HomePage;
