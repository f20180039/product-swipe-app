import { I_DATA } from "../utils/types";
import NO_IMAGE from "../assets/no-image.png";
import { useState } from "react";

const ProductCard = ({ product }: { product: I_DATA }) => {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || NO_IMAGE);

  const handleImageError = () => {
    setImgSrc(NO_IMAGE);
  };

  return (
    <div className="mob-w-[90vw] mob-flex mob-flex-col mob-justify-between sm:mob-w-80 lg:mob-w-96 mob-max-w-full mob-h-[480px] sm:mob-h-[500px] lg:mob-h-[520px] mob-bg-White mob-rounded-xl mob-shadow-lg mob-overflow-hidden mob-border mob-border-Gray-200 mob-cursor-grab hover:mob-shadow-2xl mob-transition-shadow mob-duration-300">
      <div className="mob-flex mob-max-h-[calc(100%-80px)]">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="mob-w-full mob-h-full mob-object-cover"
          loading="lazy"
        />
      </div>
      <div className="mob-p-4 mob-flex mob-flex-col mob-justify-between">
        <div>
          <h2 className="mob-text-sm sm:mob-text-base mob-font-semibold mob-capitalize mob-text-Gray-900 mob-leading-snug mob-line-clamp-2">
            {product.name}
          </h2>
          <p className="mob-text-xs sm:mob-text-sm mob-text-Gray-500 mob-capitalize mob-line-clamp-1">
            {product.brand}
          </p>
        </div>
        <div className="mob-flex mob-items-center mob-gap-2">
          <span className="mob-text-base sm:mob-text-lg mob-font-bold mob-text-Pink-600">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="mob-line-through mob-text-Gray-400 mob-text-xs sm:mob-text-sm">
                ₹{product.originalPrice}
              </span>
              <span className="mob-text-Success-600 mob-text-xs sm:mob-text-sm">
                ({product.discountPercentage}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
