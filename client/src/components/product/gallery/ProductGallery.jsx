import Thumbnail from "@/components/product/gallery/Thumbnail";

const ProductGallery = ({ product, selectedImg, setSelectedImg }) => {
  return (
    <div className="product-gallery">
      <div className="image-preview">
        <Thumbnail
          product={product}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      </div>
      <div className="main-image">
        <img src={product?.images[selectedImg]?.medium} alt={product?.name} />
      </div>
    </div>
  );
};

export default ProductGallery;
