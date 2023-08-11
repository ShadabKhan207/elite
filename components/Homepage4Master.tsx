import React from "react";
import useDisplayTagHooks from "../hooks/HomePageHooks/DisplayTagHooks";
import HomeTopCategoriesBanner4 from "./Hompage4/HomeTopCategoriesBanner4";
import DisplayTagMaster4 from "./Hompage4/DisplayTagMaster4";
import useHomeTopCategories from "../hooks/HomePageHooks/HomeTopCategoriesHook";
import HomeTopCategories4 from "./Hompage4/HomeTopCategories4";
import useWishlist from "../hooks/WishListHooks/WishListHooks";
import Home4WebNavbar from "./Hompage4/Navbar/components/Home4WebNavbar";
import MobNavbar from "./Hompage4/Navbar/components/MobNavbar";
import HomeTopBrands4 from "./Hompage4/Home4TopBrands4";
import { useRouter } from "next/router";
import Home4Banner from "./Hompage4/Home4Banner";

const Homepage4Master = () => {
  const { allTagsData } = useDisplayTagHooks();
  const { wishlistData } = useWishlist();

  const router = useRouter();
  const { homeTopCategories, isLoading } = useHomeTopCategories();

  const renderSectionComponent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <HomeTopCategoriesBanner4 homeTopCategories={homeTopCategories} />
        );
      case 1:
        return <HomeTopBrands4 />;
      default:
        return null;
    }
  };

  // console.log("display tag in home ", allTagsData);
  return (
    <>
      <div style={{ backgroundColor: "rgb(242, 243, 245)" }}>
        <Home4Banner />

        <HomeTopCategories4
          homeTopCategories={homeTopCategories}
          isLoading={isLoading}
        />
        <DisplayTagMaster4 allTagsData={allTagsData} />

        {/* {allTagsData?.map((data: any, index: number) => (
               <React.Fragment key={index}>
                   <DisplayTagMaster4 data={data} wishlistData={wishlistData}/>
                  
               </React.Fragment>
               
           ))} */}

        {allTagsData?.map((data: any, index: number) => (
          <React.Fragment key={index}>
            {renderSectionComponent(index)}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Homepage4Master;
