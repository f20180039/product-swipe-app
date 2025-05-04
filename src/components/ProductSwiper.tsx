import { useState } from "react";
import SwipeableCard from "./SwipeableCard";
import { MOCK_DATA } from "../utils/constants/MOCK_DATA";
// import { I_DATA } from "../utils/types";
import { E_SWIPE_DIRECTION } from "../utils/constants";

const ProductSwiper = () => {
  const [products, setProducts] = useState(MOCK_DATA);
  // const [history, setHistory] = useState<I_DATA[]>([]);
  const shouldLoop = true;

  const handleSwipe = (direction: E_SWIPE_DIRECTION, productId: number) => {
    const swipedProduct = products.find((p) => p.id === productId);
    if (!swipedProduct) return;

    switch (direction) {
      case E_SWIPE_DIRECTION.RIGHT:
        console.log(`Liked Product ID: ${productId}`);
        break;
      case E_SWIPE_DIRECTION.LEFT:
        console.log(`Passed Product ID: ${productId}`);
        break;
      case E_SWIPE_DIRECTION.UP:
        console.log(`Add to cart Product ID: ${productId}`);
        break;
      default:
        console.log(`Unknown swipe direction: ${direction}`);
    }

    // setHistory((prev) => [...prev, swipedProduct]);

    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      return shouldLoop && updated.length === 0 ? MOCK_DATA : updated;
    });
  };

  // const handleUndo = () => {
  //   if (history.length === 0) return;

  //   const lastProduct = history[history.length - 1];
  //   setHistory((prev) => prev.slice(0, -1));
  //   setProducts((prev) => [lastProduct, ...prev]);
  // };

  return (
    <div className="mob-relative mob-w-[320px] mob-h-[480px]">
      {products.length === 0 && !shouldLoop ? (
        <div className="mob-text-center mob-mt-10">
          <p className="mob-text-lg mob-text-Gray-600">No more products!</p>
          <button
            onClick={() => {
              setProducts(MOCK_DATA);
              // setHistory([]);
            }}
            className="mob-mt-4 mob-bg-Blue-500 mob-text-White mob-px-4 mob-py-2 mob-rounded"
          >
            Start Over
          </button>
        </div>
      ) : (
        products
          .map((product) => (
            <SwipeableCard
              key={product.id}
              product={product}
              onSwipe={handleSwipe}
            />
          ))
          .reverse()
      )}
    </div>
  );
};

export default ProductSwiper;
