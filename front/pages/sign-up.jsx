import { React, useContext, useCallback } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import Link from "next/link"
import AppContext from "../src/components/AppContext"
//import api from "../src/components/services/api"

const SignUp = () => {
  const { signUp } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ email, displayName, password }) => {
      return signUp(email, displayName, password)
    },
    [signUp]
  )

  const formik = useFormik({
    initialValues: {
      displayName: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .max(50, "Username =< 50 characters pls")
        .required("Required"),
      password: Yup.string()
        .min(5, "Password >= 5 characters pls")
        .required("Required"),
      email: Yup.string().email("email format invalid").required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <Layout>
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-10">Sign Up</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="email"
                name="email"
                placeholder="E-mail"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="mb-3">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="displayName" className="font-bold">
                Username
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="displayName"
                placeholder="Username"
                name="displayName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.displayName}
              />
            </div>
            <div className="mb-3">
              {formik.touched.displayName && formik.errors.displayName ? (
                <div>{formik.errors.displayName}</div>
              ) : null}
            </div>
          </div>

          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="password"
                placeholder="Password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div className="mb-3">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-10">
          <span>
            Already have an account?{" "}
            <Link href="sign-in">
              <a className="font-bold">Sign In</a>
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  )
}

SignUp.logged = true

export default SignUp
