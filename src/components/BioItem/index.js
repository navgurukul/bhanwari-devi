import React from "react";
import "./styles.scss";

const BioItem = ({
  description,
  setSelected,
  name,
  bio,
  image,
  isSelected,
  socialMedia,
}) => {
  return (
    <div onMouseOver={setSelected}>
      <img className="bio-image" src={image} />
      <div className="bio-name">{name}</div>
      <div className="bio-social-media-images">
        {socialMedia.map((item) => {
          return (
            <img
              className="bio-social-media-image"
              key={item.link}
              src={item.image}
              alt="link for social media"
            />
          );
        })}
      </div>
      <div className="bio-subtitle">{bio}</div>
      <div>{description}</div>
    </div>
  );
};

export default BioItem;
