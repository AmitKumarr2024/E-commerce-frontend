import React from "react";
import CategoryList from "../components/CategoryList";
import BannerImage from "../components/BannerImage";
import HorizontalCard from "../components/HorizontalCard";
import VerticalCard from "../components/VerticalCard";

function Home(props) {
  return (
    <>
      <CategoryList />
      <BannerImage />
      <HorizontalCard category={"airpodes"} heading={"World best airpods"}/>
      <HorizontalCard category={"earphones"} heading={"World best earphone"}/>
      <VerticalCard category={"mobiles"} heading={"World best mobiles"}/>
      <VerticalCard category={"televisions"} heading={"World best televisions"}/>
      <VerticalCard category={"watches"} heading={"World best watches"}/>
      <VerticalCard category={"refrigerator"} heading={"World best refrigerator"}/>
      <VerticalCard category={"trimmers"} heading={"World best trimmers"}/>
      <VerticalCard category={"speakers"} heading={"World best speakers"}/>
      <VerticalCard category={"processor"} heading={"World best processor"}/>
      <VerticalCard category={"mouse"} heading={"World best mouse"}/>
      <VerticalCard category={"camera"} heading={"World best camera"}/>
     
    </>
  );
}

export default Home;
