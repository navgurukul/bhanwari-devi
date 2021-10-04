import React, { useState } from "react";
import "./styles.scss";

const Gallery = ({ items, Component }) => {
  const [selectedItemIndex, setSelectedItem] = useState(
    Math.floor(items.length / 2)
  );

  return (
    <section className="gallery-container">
      {items.map((item, index) => {
        return (
          <Component
            key={`${item.bio}-${index}`}
            isSelected={selectedItemIndex === index}
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
