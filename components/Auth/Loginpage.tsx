import React from "react";
import { useEffect, useState } from "react";
import { LoginValidation } from "../../validation/loginValidation";
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchLoginUser } from "../../store/slices/auth/login_slice";

import {
  getAccessToken,
  get_access_token,
} from "../../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../../store/slices/general_slices/toast_notification_slice";

const Loginpage = () => {
  const dispatch = useDispatch();
  const [newValues, setnewValue] = useState<any>("");

  const [loginStatus, setLoginStatus] = useState(false);

  let guestLogin: any;

  const SelectedLangDataFromStore: any = useSelector(
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

  if (typeof window !== "undefined") {
    guestLogin = localStorage.getItem("guest");
  }

  const TokenFromStore: any = useSelector(get_access_token);

  console.log("token in login page", TokenFromStore);

  const router = useRouter();
  let obj = {
    isGoogleLogin: false,
    visitor: false,
    isOtpLogin: false,
  };

  // const handlesubmit = (values: any) => {
  //   const val = Object.assign(obj, values);
  //   const reqParams = {
  //     values: values,
  //     guest: guestLogin,
  //   };
  //   dispatch(getAccessToken(reqParams));

  //   setTimeout(() => {
  //     const loginStatusFromStorage: any = localStorage.getItem("isLoggedIn");
  //     setLoginStatus(loginStatusFromStorage);
  //   }, 2000);
  // };

  const handlesubmit = async (values: any) => {
    try {
      const val = Object.assign(obj, values);
      const reqParams = {
        values: values,
        guest: guestLogin,
      };
      const AccessTokenData = await dispatch(getAccessToken(reqParams));

      if (AccessTokenData?.payload?.hasOwnProperty("access_token")) {
        console.log("push to home");
        setTimeout(() => {
          router.push("/");
          setLoginStatus(true);
        }, 1500);
        // localStorage.removeItem("guest");
        // localStorage.removeItem("guestToken");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  console.log("loginStatus", loginStatus);
  useEffect(() => {
    if (loginStatus === true) {
      router.push("/");
      localStorage.removeItem("guest");
      localStorage.removeItem("guestToken");
    }
  }, [handlesubmit]);

  const FormObserver: React.FC = () => {
    const { values }: any = useFormikContext();
    useEffect(() => {
      setnewValue(values);
    }, [values]);
    return null;
  };

  const otpSubmit = async (e: any) => {
    let newObj = {
      // isGoogleLogin: false,
      // visitor: false,
      isOtpLogin: true,
      email: newValues?.email,
    };
    e.preventDefault();
    dispatch(fetchLoginUser(newObj));
  };
  return (
    <>
      <div className="container">
        <div className="logo mt-3">
          <Link href="/" className="navbar-brand">
            <Image
              src="/assets/images/summit-logo-bb.jpg"
              alt="logo"
              width={150}
              height={55}
            />
          </Link>
        </div>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginValidation}
            onSubmit={(values) => {
              handlesubmit(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className="login-form-wrapper">
                  <div className="mainFields-wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 logo-wrapper">
                          <h2 className="login_heading mt-3">
                            {selectedMultiLangData?.login}
                            {/* {loginToken} */}
                          </h2>
                          <Form.Group controlId="formName">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  {selectedMultiLangData?.mobile_number} /{" "}
                                  {selectedMultiLangData?.email}:
                                </Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="text"
                                  name="email"
                                  className="login_inputs"
                                />
                                <div className="row">
                                  <div className="col-8">
                                    <div className="error_message">
                                      <ErrorMessage name="email" />
                                    </div>
                                  </div>
                                  <div className="col-4 text-end">
                                    <Link
                                      className="linkss"
                                      href="#"
                                      onClick={(e) => otpSubmit(e)}
                                    >
                                      {selectedMultiLangData?.get_otp}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>

                          <Form.Group controlId="formPassword">
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <Form.Label className="login-label">
                                  {selectedMultiLangData?.password_otp}:
                                </Form.Label>
                              </div>

                              <div className="col-md-8">
                                <Form.Control
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="password"
                                  name="password"
                                  className="login_inputs"
                                />
                                <div className="row">
                                  <div className="col-6">
                                    <div className="error_message">
                                      <ErrorMessage name="password" />
                                    </div>
                                  </div>
                                  <div className="col-6 text-end">
                                    <Link
                                      className={`linkss`}
                                      href="/forgot-password"
                                    >
                                      {selectedMultiLangData?.forgot_password}?
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                          <div className={`mt-5 login_submitbtn`}>
                            <button
                              type="submit"
                              className={` btn btn-warning button_color`}
                            >
                              {selectedMultiLangData?.submit}
                            </button>
                            {/* {isAlertVisible && (
                                    <div
                                      className={`alert ${
                                        message === "success"
                                          ? "alert-success"
                                          : "alert-danger"
                                      } otp_alertbox`}
                                      role="alert"
                                    >
                                      {message === "success"
                                        ? "OTP send sucessfully on registered email"
                                        : "Please enter valid or registered email"}
                                    </div>
                                  )}                  */}
                          </div>
                        </div>

                        <div className="col-lg-6 google_btn">
                          <div className="row">
                            <div className="col-12 text-lg-start text-center">
                              <div className="login-with-google mt-2">
                                {/* <Googlelogin />  */}
                                {/* </button> */}
                              </div>
                            </div>

                            <div
                              className={`col-12 text-lg-start register_account`}
                            >
                              <div className="register ms-2 account-margin">
                                <span className="not_an_account">
                                  {selectedMultiLangData?.not_an_account}?{" "}
                                  <Link className={`linkss`} href="/register">
                                    {selectedMultiLangData?.register}
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FormObserver />
              </FormikForm>
            )}
          </Formik>
        </div>
        <hr></hr>
      </div>
    </>
  );
};

export default Loginpage;
