import { I_DATA } from "../utils/types";

const ProductCard = ({ product }: { product: I_DATA }) => {
  return (
    <div className="mob-w-[90vw] sm:mob-w-80 mob-max-w-full mob-h-[480px] sm:mob-h-[500px] mob-bg-White mob-rounded-xl mob-shadow-lg mob-overflow-hidden mob-border mob-border-Gray-200 mob-cursor-grab hover:mob-shadow-2xl mob-transition-shadow mob-duration-300">
      <div className="mob-h-[calc(100%-100px)]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mob-w-full mob-h-full mob-object-cover"
          loading="lazy"
        />
      </div>
      <div className="mob-h-[80px] mob-p-4 mob-flex mob-flex-col mob-justify-between">
        <div>
          <h2 className="mob-text-base mob-font-semibold mob-capitalize mob-text-Gray-900 mob-leading-snug line-clamp-2">
            {product.name}
          </h2>
          <p className="mob-text-sm mob-text-Gray-500 mob-capitalize mob-line-clamp-1">
            {product.brand}
          </p>
        </div>
        <div className="mob-flex mob-items-center mob-space-x-2">
          <span className="mob-text-lg mob-font-bold mob-text-Pink-600">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="mob-line-through mob-text-Gray-400 mob-text-sm">
                ₹{product.originalPrice}
              </span>
              <span className="mob-text-Success-600 mob-text-sm">
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
