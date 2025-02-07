import React from "react";
import Hero from "./screens/hero/Hero";
import Trending from "./screens/trending/Trending";
import Collection from "./screens/collections/Collection";

const Page = () => {
  return (
    <div className="">
      <Hero />
      <Trending />
      <Collection/>
    </div>
  );
};

export default Page;
