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
  footerMsg,
}) => {
  return (
    <div className="bio-item">
      <img
        className={`bio-image ${!isSelected ? "bio-image-collapsed" : ""}`}
        src={image}
        onMouseOver={setSelected}
      />
      {isSelected && (
        <>
          <div className="bio-name">{name}</div>
          <div className="bio-social-media-images">
            {socialMedia.map((item, index) => {
              return (
                <a
                  key={`${item.link}-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="bio-social-media-image"
                    src={item.image}
                    alt="link for social media"
                  />
                </a>
              );
            })}
          </div>
          {bio && <div className="bio-subtitle base-font">{bio}</div>}
          <div className="bio-description base-font">{description}</div>
          {footerMsg && (
            <div className="bio-footer-msg base-font">{footerMsg}</div>
          )}
        </>
      )}
    </div>
  );
};

export default BioItem;
