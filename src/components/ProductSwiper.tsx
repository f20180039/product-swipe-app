import { useState, useMemo, useCallback } from "react";
import SwipeableCard from "./SwipeableCard";
import { MOCK_DATA } from "../utils/constants/MOCK_DATA";
// import { I_DATA } from "../utils/types";
import { E_SWIPE_DIRECTION } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addDisliked, addLiked, addSaved } from "../redux/cardSlice";

const ProductSwiper = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(MOCK_DATA);
  // const [history, setHistory] = useState<I_DATA[]>([]);
  const shouldLoop = true;

  const handleSwipe = useCallback(
    (direction: E_SWIPE_DIRECTION, productId: number) => {
      const swipedProduct = products.find((p) => p.id === productId);
      if (!swipedProduct) return;

      switch (direction) {
        case E_SWIPE_DIRECTION.RIGHT:
          console.log(`Liked Product ID: ${productId}`);
          dispatch(addLiked(swipedProduct));
          break;
        case E_SWIPE_DIRECTION.LEFT:
          console.log(`Dislike Product ID: ${productId}`);
          dispatch(addDisliked(swipedProduct));
          break;
        case E_SWIPE_DIRECTION.UP:
          console.log(`Add to cart Product ID: ${productId}`);
          dispatch(addSaved(swipedProduct));
          break;
        default:
          console.log(`Unknown swipe direction: ${direction}`);
      }

      // setHistory((prev) => [...prev, swipedProduct]);

      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== productId);
        return shouldLoop && updated.length === 0 ? MOCK_DATA : updated;
      });
    },
    [products, dispatch, shouldLoop]
  );

  // const handleUndo = useCallback(() => {
  //   if (history.length === 0) return;

  //   const lastProduct = history[history.length - 1];
  //   setHistory((prev) => prev.slice(0, -1));
  //   setProducts((prev) => [lastProduct, ...prev]);
  // }, [history]);

  const swipeableCards = useMemo(() => {
    return products.map((product) => (
      <SwipeableCard key={product.id} product={product} onSwipe={handleSwipe} />
    ));
  }, [products, handleSwipe]);

  return (
    <div className="mob-flex mob-items-center mob-gap-4">
      <div className="mob-flex mob-relative mob-w-[320px] mob-h-[480px]">
        {products.length === 0 && !shouldLoop ? (
          <div className="mob-text-center mob-mt-10">
            <p className="mob-text-lg mob-text-Gray-600">No more products!</p>
            <button
              onClick={() => {
                setProducts(MOCK_DATA);
                // setHixstory([]);
              }}
              className="mob-mt-4 mob-bg-Blue-500 mob-text-White mob-px-4 mob-py-2 mob-rounded"
            >
              Start Over
            </button>
          </div>
        ) : (
          swipeableCards.reverse()
        )}
      </div>

      {/* {history.length > 0 && (
        <button
          onClick={handleUndo}
          className="mob-flex mob-bg-Gray-200 mob-text-Gray-800 mob-px-4 mob-py-2 mob-rounded hover:mob-bg-Gray-300"
        >
          Undo
        </button>
      )} */}
    </div>
  );
};

export default ProductSwiper;
