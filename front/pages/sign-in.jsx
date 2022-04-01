import { useCallback, useContext } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import Link from "next/link"
import AppContext from "../src/components/AppContext"

const SignIn = () => {
  const { signIn } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ emailOrDisplayName, password }) => {
      return signIn(emailOrDisplayName, password)
    },
    [signIn]
  )

  const formik = useFormik({
    initialValues: {
      emailOrDisplayName: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailOrDisplayName: Yup.string().required("Required"),
      password: Yup.string()
        .min(5, "Password >= 5 characters pls")
        .required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <Layout pagename="Sign In">
      <div className="px-10 pt-6">
        <h2 className="text-4xl font-bold mb-10">Sign In</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="emailOrDisplayName" className="font-bold">
                Username or Email
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="emailOrDisplayName"
                name="emailOrDisplayName"
                placeholder="Username or E-mail"
                type="emailOrDisplayName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emailOrDisplayName}
              />
            </div>
            <div className="mb-3">
              {formik.touched.emailOrDisplayName &&
              formik.errors.emailOrDisplayName ? (
                <div>{formik.errors.emailOrDisplayName}</div>
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
                type="password"
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
    </Layout>
  )
}
SignIn.logged = true

export default SignIn
