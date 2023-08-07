import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import UseThankyou from "../../hooks/order-listing-page-hook/order-list-hook";
import { CONSTANTS } from "../../services/config/app-config";
import IndianNumber from "../CheckoutPageComponent/IndianNumber";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

type PropsType = {
  id?: any;
};

const Index = ({ sales_order_id }: any) => {
  let { id, detail }: any = UseThankyou();
  console.log("detail", detail);
  const dispatch = useDispatch();
  //   const getReturnReplacementImages = useSelector(storedReturnReplacementImages);
  //   console.log("Return", getReturnReplacementImages);

  //   let convertReturnReplacement = getReturnReplacementImages;

  // let detail = useOrderDetails(id);
  const [typeOf, setTypeOf] = useState("Replacement");
  const [text, setText] = useState("");
  const [productId, setProductId] = useState("");
  const [newData, setData] = useState<any>();
  let years: any;

  const router = useRouter();

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  let thankyou = router.asPath.split("/")[1];
  console.log("thank", thankyou);
  console.log("my orders get order detail data in order detail file", detail);

  const handleTypeChange = (e: any) => {
    setTypeOf(e.target.value);
  };

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  console.log("Detail data ", detail);
  useEffect(() => {
    if(detail?.length > 0 && detail !== null){
      detail?.map((data: any) => setData(data.transaction_date));
    }
  }, [detail]);

  const handleSubmit = async (e: any) => {
    console.log("+++++++handle submit function");
    e.preventDefault();
    setProductId("");
    setTypeOf("");
    setText("");
  };
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  return (
    <div>
      
      {detail?.length > 0 && detail !== null && detail?.map((data: any) => (
        <div className="container" key={data?.name}>
          <div className="row"></div>
          <div className="row">
            <div className="col-md-6">
              <div className="page_heading">
                <h5
                  className="bold text-uppercase black mb-2 mt-4 orderDetail-heading"
                >
                  order details
                </h5>
              </div>
            </div>
          </div>
          <div className="order_detail_head row">
            <div className="col-12">
              <div className="item_action d-flex ">
                <div className="item_action_link me-3 ">{data.creation}</div>
                <div className="item_action_link order-pipe">
                  <span>| Order # {data?.name}</span>
                </div>
              </div>
            </div>
          </div>
          <div id="printableArea" className="row">
            <div className="col-lg-12">
              <div className="order_card mb-3 card">
                <div className="card-body">
                  <div className="row">
                    {data?.addresses?.map((addr: any, index: any) => (
                      <div className="mb-3 mb-sm-0 col-md-3" key={index}>
                        <div>
                          <h5 className="data_heading mb-1">{addr?.name}</h5>
                          {addr?.values &&
                            addr?.values.map((addrValue: any, i: any) => (
                              <div className="myorders" key={i}>
                                <p className="mb-0 address_tiitles">
                                  {addrValue?.address_title}
                                </p>
                                <p className="mb-0">{addrValue?.address_1}</p>
                                <p className="mb-0">{addrValue?.postal_code}</p>
                                <p className="mb-0">
                                  {addrValue?.city}, {addrValue?.state}
                                </p>
                                <p className="mb-0">{addrValue?.country}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}

                    {/* <div className="col-md-2">
                      <h5 className="data_heading mb-1">Shipping Method</h5>
                      <div>
                        <p className="mb-0">
                          Transporter : {data.shipping_method.transporter}
                        </p>

                        {data?.shipping_method?.door_delivery === 0 &&
                        data?.shipping_method?.godown_delivery === 0 ? (
                          <p className="mb-0">Door Delivery : Yes</p>
                        ) : (
                          ""
                        )}
                        {data?.shipping_method?.door_delivery === 0 &&
                        data?.shipping_method?.godown_delivery !== 0 ? (
                          <>
                            <p className="mb-0">Godown Delivery: Yes</p>
                            {data?.shipping_method.location === null ? (
                              ""
                            ) : (
                              <p className="mb-0">
                                Location : {data?.shipping_method?.location}
                              </p>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {data?.shipping_method?.remarks === null ? (
                          ""
                        ) : (
                          <p className="mb-0">
                            Remark : {data?.shipping_method?.remarks}
                          </p>
                        )}
                      </div>
                    </div> */}

                    <div className="col-md-4 myorders">
                      <h5 className="data_heading mb-1">Order Summary</h5>
                      <div className="mb-1 row">
                        <div className="col-6">
                          <p className="mb-0 order_summary_p">
                            Sub total (Excl. Tax)
                          </p>
                        </div>
                        <div className="text-right col-6">
                          <p className="mb-0 order_summary_p">
                           {data?.currency_symbol}{" "}{data?.subtotal_exclude_tax}
                          </p>
                        </div>
                      </div>
                      <div className="mb-1 row">
                        <div className="col-6">
                          <p className="mb-0 order_summary_p">Tax</p>
                        </div>
                        <div className="text-right col-6">
                          <p className="mb-0 order_summary_p">
                          {data?.currency_symbol}{" "}{data?.tax}
                          </p>
                        </div>
                      </div>
                      <div className="mb-1 row">
                        {data?.coupon_code !== null ? (
                          <>
                            <div className="col-6">
                              <p className="mb-0 order_summary_p">
                                Coupon Code
                              </p>
                            </div>
                            <div className="text-right col-6">
                              <p className="mb-0 order_summary_p">
                                <span>{data?.coupon_code}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mb-1 row">
                        {data?.coupon_amount !== 0 ? (
                          <>
                            <div className="col-6">
                              <p className="mb-0 order_summary_p">
                                Coupon Amount
                              </p>
                            </div>
                            <div className="text-right col-6">
                              <p className="mb-0 order_summary_p">
                                <i
                                  className="fa fa-inr pe-1"
                                  aria-hidden="true"
                                ></i>
                                <span>{data?.coupon_amount}</span>
                              </p>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="mb-1 row">
                        <div className="col-6">
                          <p className="mb-0 order_summary_p">
                            Sub total (Incl. Tax)
                          </p>
                        </div>
                        <div className="text-right col-6">
                          <p className="mb-0 order_summary_p">
                          {data?.currency_symbol}{" "}{data?.subtotal_include_tax}
                          </p>
                        </div>
                      </div>
                      <hr className="mt-1 mb-1" />
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-0 bold order_summary_p">
                            Order Total
                          </p>
                        </div>
                        <div className="text-right col-6">
                          <p className="mb-0 bold order_summary_p">
                          {data?.currency_symbol}{" "}{data?.total}
                          </p>
                        </div>
                      </div>
                      <hr className="mt-1 mb-1" />
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-0 bold order_summary_p">TOTAL</p>
                        </div>
                        <div className="text-right col-6">
                          <p className="mb-0 bold order_summary_p">
                          {data?.currency_symbol}{" "}{data?.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order_card cart_table mb-3 card">
                {data?.order_details.map((oDetail: any, index: any) => (
                  <div
                    className="cart_item card-body border-bottom"
                    key={index}
                  >
                  
                    <div className="d-flex align-items-center row">
                      <div className="mb-3 mb-sm-0 col-lg-2 col-md-2 col-4">
                        <div className="product-image">
                          {oDetail?.img === null ||
                          oDetail?.img?.length === 0 ? (
                            <Image
                              src={`${oDetail?.brand_img}`}
                              className="product_item_img img-fluid"
                              alt="product images"
                              width={100}
                              height={100}
                              loader={myLoader}
                            />
                          ) : (
                            <Image
                              loader={myLoader}
                              src={`${oDetail?.img}`}
                              className="product_item_img img-fluid addcart_item"
                              alt="product images"
                              width={100}
                              height={100}
                            />
                          )}
                        </div>
                      </div>
                      <div className="product_item_details col-lg-8 col-md-7 col-8">
                        <div className="d-flex orderdetail-name" >
                          <div className="flex-fill">
                            <Link  href={`${oDetail.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`} legacyBehavior>
                              <a
                                className="product_item_name"
                              >
                                {oDetail?.item_name}
                              </a>
                            </Link>

                            <table
                              width="100%"
                              className="mt-2 table table-borderless"
                            >
                              <tbody>
                                <tr className="item_options myorder_tr">
                                  <td className="px-0 py-0 pb-0 myorder_td">
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      Item Code
                                    </p>
                                  </td>
                                  <td
                                    width="85%"
                                    className="px-0 py-0 pb-0 myorder_width"
                                  >
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      : {oDetail?.name}
                                    </p>
                                  </td>
                                </tr>

                                <tr className="item_options myorder_tr">
                                  <td className="px-0 py-0 pb-0 myorder_td">
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      Price
                                    </p>
                                  </td>
                                  <td
                                    width="85%"
                                    className="px-0 py-0 pb-0 myorder_width"
                                  >
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      {oDetail?.prod_info[1].value !== 0 ? (
                                        <p className="mb-0">
                                          {" "}
                                          :{" "}
                                          {data?.currency_symbol}{" "}
                                          {oDetail?.prod_info[1].value} 
                                        </p>
                                      ) : (
                                        <p
                                          className="border price_request"
                                        >
                                          Price on Request
                                        </p>
                                      )}
                                    </p>
                                  </td>
                                </tr>

                                <tr className="item_options myorder_tr">
                                  <td className="px-0 py-0 pb-0 myorder_td">
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      Quantity
                                    </p>
                                  </td>
                                  <td
                                    width="85%"
                                    className="px-0 py-0 pb-0 myorder_width"
                                  >
                                    <p className="text-capitalize black mb-0 myorder_p">
                                      : {oDetail?.prod_info[2].value}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="text-right col-lg-2 col-md-3 col-12">
                        {thankyou === "thankyou" ? (
                          ""
                        ) : (
                          <button className=" order_links mb-2 d-block text-uppercase">
                            <Link href={`${oDetail?.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`} legacyBehavior>
                              <a className="order_linkshover text-dark">
                                View Product
                              </a>
                            </Link>
                          </button>
                        )}
                      </div>
                      <div
                        role="dialog"
                        aria-modal="true"
                        className="fade modal"
                        tabIndex={-1}
                        id="myModal"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div className="modal-title h4">
                                Return/Replacement
                              </div>
                              <a className="action_icon">
                                <i
                                  className="btn-close btn_close_custom"
                                  data-bs-dismiss="modal"
                                ></i>
                              </a>
                            </div>
                            <div className="modal-body">
                              <div
                                id="email_faq"
                                aria-labelledby="email_faq_tab"
                              >
                                <div>
                                  <div className="Toastify"></div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h6 className="black bold text-center text-uppercase mb-4 pl-3">
                                      Return/Replacement Request
                                    </h6>
                                    <div className="row">
                                      <div className="col">
                                        <form
                                          id="returnReplacement"
                                          className="fields-group-md"
                                          onSubmit={handleSubmit}
                                        >
                                          <div className="form-group mb-2">
                                            <label className="form-label">
                                              Return/Replacement
                                            </label>
                                            <select
                                              name="refund_requests[request_for]"
                                              className="form-control input_tags"
                                              onChange={handleTypeChange}
                                              value={typeOf}
                                            >
                                              <option value="Replacement">
                                                Replacement
                                              </option>
                                              <option value="Return">
                                                Return
                                              </option>
                                            </select>
                                            <span className="red"></span>
                                          </div>
                                          <div className="form-group">
                                            <label className="form-label">
                                              Reason for Return/Replacement?
                                            </label>
                                            <textarea
                                              onChange={handleTextChange}
                                              name="refund_requests[refund_reason]"
                                              className="mb-1 form-control input_tags"
                                              value={text}
                                              required
                                            ></textarea>
                                            <span className="red"></span>
                                          </div>
                                          <div className="form-group mb-2">
                                            <label className="form-label">
                                              Select image 1
                                            </label>
                                            <div className="form-file">
                                              <input
                                                name="refund_request_images[0][image]"
                                                type="file"
                                                className="form-control-file"
                                                // onChange={(e: any) =>
                                                //   handleFileChange1(e)
                                                // }
                                                required
                                              />
                                            </div>
                                            <span className="red"></span>
                                          </div>
                                          <div className="form-group mb-2">
                                            <label className="form-label">
                                              Select image 2
                                            </label>
                                            <div className="form-file">
                                              <input
                                                name="refund_request_images[1][image]"
                                                type="file"
                                                className="form-control-file"
                                                // onChange={(e: any) =>
                                                //   handleFileChange2(e)
                                                // }
                                                required
                                              />
                                            </div>
                                            <span className="red"></span>
                                          </div>
                                          <div className="form-group mb-2">
                                            <label className="form-label">
                                              Select image 3
                                            </label>
                                            <div className="form-file">
                                              <input
                                                name="refund_request_images[2][image]"
                                                type="file"
                                                className="form-control-file"
                                                // onChange={(e: any) =>
                                                //   handleFileChange3(e)
                                                // }
                                                required
                                              />
                                            </div>
                                            <span className="red"></span>
                                          </div>
                                          <div className="text-center mt-3">
                                            <button
                                              type="submit"
                                              className="btn btn-warning yellow_btn"
                                              data-bs-toggle="modal"
                                              //   onClick={() =>
                                              //     handleSubmitReturnReplacementRequest(
                                              //       data.id,
                                              //       oDetail.prod_name
                                              //     )
                                              //   }
                                            >
                                              {" "}
                                              Submit Request
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
