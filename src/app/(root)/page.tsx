import React from "react";
import Hero from "../screens/hero/Hero";
import Trending from "../screens/trending/Trending";
import Collection from "../screens/collections/Collection";
import Footer from "../components/footer/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Page = () => {
  return (
    <div className="">
      <Hero />
      <Trending />
      <Collection />
    </div>
  );
};

export default Page;
