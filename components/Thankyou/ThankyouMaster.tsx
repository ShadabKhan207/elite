import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Thankyouimg from "../../public/assets/images/thankyou-img.png";
import OrderDetail from "../OrderDetails/OrderDetail";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";

const ThankYou = ({}: any) => {
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

  return (
    <div className="thankyou-mg-bt">
      <div className="container mt-5 margin_from_nav ">
        <div className="row color-black" >
          <div className="text-center mx-auto col-md-12 mt-5">
            <Image
              src={Thankyouimg}
              className="mb-1 success_thanku thankyou-img-b2c"
              width={100}
              height={100}
              alt="success_img"
            />
            <h3 className="black bold">{selectedMultiLangData?.thank_you}</h3>
            <h5 className="black">
              {selectedMultiLangData?.your_order_has_been_received}
            </h5>
          </div>
        </div>
        <OrderDetail selectedMultiLangData={selectedMultiLangData} />
      </div>
    </div>
  );
};

export default ThankYou;
