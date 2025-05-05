import React, { useState, useRef, useCallback, useMemo } from "react";
import ProductCard from "./ProductCard";
import { I_DATA } from "../utils/types";
import { E_SWIPE_DIRECTION } from "../utils/constants";

type SwipeableCardProps = {
  product: I_DATA;
  onSwipe: (direction: E_SWIPE_DIRECTION, productId: number) => void;
};
const SWIPETHRESHOLD = 150;

const SwipeableCard = ({ product, onSwipe }: SwipeableCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const frameRequested = useRef(false);
  const lastDx = useRef(0);
  const lastDy = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !startPos.current) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      lastDx.current = dx;
      lastDy.current = dy;

      if (!frameRequested.current) {
        frameRequested.current = true;
        requestAnimationFrame(() => {
          setPosition({ x: lastDx.current, y: lastDy.current });
          const rotate = Math.min(Math.max(lastDx.current / 20, -15), 15);
          setRotation(rotate);
          frameRequested.current = false;
        });
      }
    },
    [isDragging]
  );
  const animateSwipe = useCallback(
    (direction: E_SWIPE_DIRECTION) => {
      if (!cardRef.current) return;

      let toX = 0;
      let toY = 0;

      switch (direction) {
        case E_SWIPE_DIRECTION.LEFT:
          toX = -window.innerWidth;
          break;
        case E_SWIPE_DIRECTION.RIGHT:
          toX = window.innerWidth;
          break;
        case E_SWIPE_DIRECTION.UP:
          toY = -window.innerHeight;
          break;
      }

      cardRef.current.style.transition = "transform 0.3s ease-out";
      cardRef.current.style.transform = `translate(${toX}px, ${toY}px) rotate(${rotation}deg)`;

      setTimeout(() => {
        onSwipe(direction, product.id);

        if (cardRef.current) {
          cardRef.current.style.transition = "";
          cardRef.current.style.transform = "";
        }
        setPosition({ x: 0, y: 0 });
        setRotation(0);
      }, 300);
    },
    [onSwipe, product.id, rotation]
  );

  const resetPosition = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.3s ease-out";
    cardRef.current.style.transform = `translate(0px, 0px) rotate(0deg)`;
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = "";
      }
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }, 300);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    const { x, y } = position;

    if (x > SWIPETHRESHOLD) {
      animateSwipe(E_SWIPE_DIRECTION.RIGHT);
    } else if (x < -SWIPETHRESHOLD) {
      animateSwipe(E_SWIPE_DIRECTION.LEFT);
    } else if (y < -SWIPETHRESHOLD) {
      animateSwipe(E_SWIPE_DIRECTION.UP);
    } else {
      resetPosition();
    }
  }, [animateSwipe, position, resetPosition]);

  const cardTransformStyle = useMemo(
    () => ({
      transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
      transition: isDragging ? "none" : "transform 0.3s ease-out",
    }),
    [position, rotation, isDragging]
  );

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={isDragging ? handlePointerUp : undefined}
      className="mob-absolute mob-cursor-grab mob-select-none mob-touch-none mob-w-80 mob-max-w-full"
      style={cardTransformStyle}
    >
      <ProductCard product={product} />
    </div>
  );
};

export default SwipeableCard;
