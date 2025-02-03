import React from "react";
import Marquee from "react-fast-marquee";

const Trending = () => {
  return (
    <div className="h-screen">
      <Marquee
        className="text-8xl font-bold strokeme overflow-hidden"
        speed={150}
      >
        {Array(5)
          .fill("TRENDING")
          .map((text, index) => (
            <p key={index} className="mr-10">
              {text}
            </p>
          ))}
      </Marquee>
    </div>
  );
};

export default Trending;
