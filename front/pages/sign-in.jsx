import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Page from "../src/components/Page"
import Link from "next/link"
import api from "../src/components/services/api"

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      displayNameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      displayNameOrEmail: Yup.string().required("Required"),
      password: Yup.string()
        .min(5, "Password >= 5 characters pls")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
      //TODO faire la connexion avec la bdd voir vidéo prof
    },
  })

  return (
    <Page>
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-10">Sign In</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="displayNameOrEmail" className="font-bold">
                Username or Email
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="displayNameOrEmail"
                name="displayNameOrEmail"
                placeholder="Username or E-mail"
                type="displayNameOrEmail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.displayNameOrEmail}
              />
            </div>
            <div className="mb-3">
              {formik.touched.displayNameOrEmail &&
              formik.errors.displayNameOrEmail ? (
                <div>{formik.errors.displayNameOrEmail}</div>
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
              <span className="text-sm">Forgot password?</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1"
          >
            Sign In
          </button>
        </form>
        <div className="mt-10">
          <span>
            Don't have an account yet?{" "}
            <Link href="sign-up">
              <a className="font-bold">Sign up</a>
            </Link>
          </span>
        </div>
      </div>
    </Page>
  )
}

export default SignInForm
