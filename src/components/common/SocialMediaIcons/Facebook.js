import React from "react";

function Facebook() {
  return (
    <div className="facebook">
      <a target="_blank">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg-background"
        >
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="15.5"
            stroke="#F05F40"
          />
          <g clip-path="url(#clip0_432_1637)">
            <path
              d="M19.5742 17.3508L20.0008 14.5999H17.3335V12.8148C17.3335 12.0623 17.7061 11.3287 18.9007 11.3287H20.1133V8.98663C20.1133 8.98663 19.0129 8.80078 17.9608 8.80078C15.7642 8.80078 14.3284 10.1183 14.3284 12.5034V14.5999H11.8867V17.3508H14.3284V24.0008H17.3335V17.3508H19.5742Z"
              fill="#E16749"
              className="socialmedia-icon"
            />
          </g>
          <defs>
            <clipPath id="clip0_432_1637">
              <rect
                width="9.6"
                height="15.2"
                fill="white"
                transform="translate(11.2 8.80078)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  );
}

export default Facebook;
