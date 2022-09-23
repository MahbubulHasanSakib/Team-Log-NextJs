import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAppContext } from "../components/UserContext";
import axios from "axios";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("**Password is required!"),
  email: Yup.string().email("Invalid email").required("**Email is required!"),
});

const Login = () => {
  const [isSuccess, setSuccess] = useState(true);
  const router = useRouter();
  const userData = useAppContext();
  useEffect(() => {
    //const userInfo = localStorage.getItem("userDetails");
    if (!userData.userInfo.isValid) router.push("/login");
    else router.push("/");
  }, []);

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          if (
            values.email === userData.userInfo.user.email &&
            values.password === userData.userInfo.user.password
          ) {
            userData.userInfo.setIsValid(true);
            // localStorage.setItem("userDetails", JSON.stringify(values));
            router.push("/");
          } else setSuccess(false);
          actions.setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          errors,
          values,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <div className="content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src="/loginBanner.svg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-6 contents">
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <div className="mb-4">
                            <h3>Sign In</h3>
                          </div>
                          {!isSuccess && (
                            <div className="error mb-1">
                              <p>Email or Password is wrong</p>
                            </div>
                          )}
                          <div className="form-group first mb-2">
                            <Field
                              type="email"
                              id="form3Example3"
                              name="email"
                              className="form-control form-control-lg"
                              placeholder="Enter a valid email address"
                            />
                          </div>
                          {errors.email && touched.email ? (
                            <div className="error mb-1">{errors.email}</div>
                          ) : null}
                          <div className="form-group last mb-2">
                            <Field
                              type="password"
                              id="form3Example4"
                              name="password"
                              className="form-control form-control-lg"
                              placeholder="Enter password"
                            />
                          </div>
                          {errors.password && touched.password ? (
                            <div className="error mb-1">{errors.password}</div>
                          ) : null}
                          <p>
                            {!errors.email &&
                              !errors.password &&
                              values.email !== "" &&
                              values.password !== ""}
                          </p>
                          <button
                            type="submit"
                            disabled={
                              !(
                                !errors.email &&
                                !errors.password &&
                                values.email !== "" &&
                                values.password !== ""
                              )
                            }
                            className="btn btn-primary btn-lg"
                            style={{
                              paddingLeft: "2.5rem",
                              paddingRight: "2.5rem",
                            }}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
