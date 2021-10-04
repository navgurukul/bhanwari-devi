import React, { useState } from "react";

const Gallery = ({ items, Component }) => {
  const [selectedItemIndex, setSelectedItem] = useState(
    Math.floor(items.length / 2)
  );

  return (
    <section className="flex">
      {items.map((item, index) => {
        return (
          <Component
            key={item.bio}
            isSelected={selectedItemIndex}
            {...item}
            setSelected={() => {
              setSelectedItem(index);
            }}
          />
        );
      })}
    </section>
  );
};

export default Gallery;
