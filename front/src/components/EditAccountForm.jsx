import api from "./services/api"
import { useCallback } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

const EditAccountForm = ({
  userInfo,
  sessionId,
  sessionRole,
  userId,
  router,
}) => {
  const handleFormSubmit = useCallback(
    async ({ email, displayName }) => {
      return await api.put(
        `/users/${userId}`,
        {
          email,
          displayName,
        },
        router.reload()
      )
    },
    [router, userId]
  )

  const formik = useFormik({
    initialValues: {
      email: userInfo.email,
      displayName: userInfo.displayName,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email format invalid").required("Required"),
      displayName: Yup.string()
        .max(50, "Username =< 50 characters pls")
        .required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <ul className="pb-10">
      <li className="mb-10">
        <p className="text-4xl font-bold">Id: {userInfo.id} (pour dev)</p>
        <p className="text-4xl font-bold">Role: {userInfo.role} (pour dev)</p>
      </li>

      {sessionId == userId || sessionRole == "admin" ? (
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
                value={formik.values.email}
                placeholder="Email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                name="displayName"
                value={formik.values.displayName}
                placeholder="Username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-3">
              {formik.touched.displayName && formik.errors.displayName ? (
                <div>{formik.errors.displayName}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1"
          >
            Edit ✔
          </button>
        </form>
      ) : (
        "C AP TON CONTE WSH, CASSE TOI DE LA WSH!"
      )}
    </ul>
  )
}

export default EditAccountForm
