import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { memo } from "react";

interface SectionProps {
  title: string;
  items: { id: number; name: string; brand: string; price: number }[];
}

const SectionList = memo(({ title, items }: SectionProps) => (
  <div>
    <button>
      {title} ({items.length})
    </button>
    {items.length === 0 ? (
      <p>No items available</p>
    ) : (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <p>{item.brand}</p>
            <p>₹{item.price}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
));

const BottomNavigation = () => {
  const liked = useSelector((state: RootState) => state.cards.liked);
  const disliked = useSelector((state: RootState) => state.cards.disliked);
  const saved = useSelector((state: RootState) => state.cards.saved);

  return (
    <div className="bottom-nav">
      <SectionList title="Liked" items={liked} />
      <SectionList title="Disliked" items={disliked} />
      <SectionList title="Saved" items={saved} />
    </div>
  );
};

export default BottomNavigation;
