import Image from "next/image";
import useProductListing from "../../hooks/product-listing-hooks/product-listing-hook";
import { CONSTANTS } from "../../services/config/app-config";
import Topbar from "./Topbar";
import WebFilters from "./filters-view/web-filters-view";
import ProductsGridView from "./products-data-view/products-grid-view";
import ProductsListView from "./products-data-view/products-list-view";
import useWishlist from "../../hooks/WishListHooks/WishListHooks";
import BreadCrumbs from "../ProductDetailComponents/ProductDetails/BreadCrumbs";
import MobileFilter from "./filters-view/MobileFilter";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
const ProductListingMaster = () => {
  const {
    productsLoading,
    productListingData,
    productListTotalCount,
    filtersLoading,
    filtersData,
    selectedFilters,
    handleApplyFilters,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    currency_state_from_redux,
    handlePaginationBtn,
  } = useProductListing();
  // console.log("cube ", productListTotalCount);
  const SelectedLangDataFromStore:any = useSelector(
    SelectedFilterLangDataFromStore
  );

  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  const { wishlistData } = useWishlist();
  const [pageOffset, setpageOffset] = useState(0);
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleDisplayOfProductsList = () => {
    return (
      <ProductsGridView
        currency_state_from_redux={currency_state_from_redux}
        loading={productsLoading}
        listItems={productListingData}
        filtersData={filtersData}
        productListTotalCount={productListTotalCount}
        handleLoadMore={handleLoadMore}
        wishlistData={wishlistData}
        handlePaginationBtn={handlePaginationBtn}
        selectLangData={selectedMultiLangData}
      />
    );
  };

  console.log("filters product listing in master", filtersData);
  return (
    <>
      <div>
        <section className="listing-page mt-3">
          <div className="container">
            <div className="mt-3"></div>
            <BreadCrumbs />
            <div className="row mt-2 ">
              <span className="col-lg-3 handle_display_web_filter">
                <WebFilters
                  filtersData={filtersData}
                  loading={filtersLoading}
                  selectedFilters={selectedFilters}
                  handleApplyFilters={handleApplyFilters}
                  productListingData={productListingData}
                  SelectedLangDataFromStore={SelectedLangDataFromStore}
                  selectLangData={selectedMultiLangData}
                />
              </span>
              {handleDisplayOfProductsList()}
            </div>
          </div>
        </section>
      </div>

      <div className="handle_display_mob_filter">
        <MobileFilter
          filtersData={filtersData}
          loading={filtersLoading}
          selectedFilters={selectedFilters}
          handleApplyFilters={handleApplyFilters}
          selectLangData={selectedMultiLangData}
        />
      </div>
    </>
  );
};

export default ProductListingMaster;
