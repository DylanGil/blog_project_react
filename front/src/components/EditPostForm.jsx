import api from "./services/api"
import { useCallback } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Link from "next/link"

const EditPostForm = ({ postInfo, sessionId, postId, router }) => {
  const handleFormSubmit = useCallback(
    async ({ title, content }) => {
      return await api.put(
        `/posts/${postId}`,
        {
          title,
          content,
        },
        router.push(`/posts/${encodeURIComponent(postId)}`)
      )
    },
    [postId, router]
  )

  const formik = useFormik({
    initialValues: {
      title: postInfo.title,
      content: postInfo.content,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <ul className="pb-10">
      <li className="mb-10">
        <p className="text-4xl font-bold">Title: {postInfo.id} (pour dev)</p>
        <p className="text-4xl font-bold">
          content: {postInfo.role} (pour dev)
        </p>
      </li>

      {sessionId == postInfo.user_id ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="title" className="font-bold">
                Title
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="title"
                name="title"
                value={formik.values.title}
                placeholder="Title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-3">
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
          </div>

          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="content" className="font-bold">
                Content
              </label>
            </div>
            <div className="w-full">
              <input
                className="border-2 w-full h-9 p-1"
                id="content"
                name="content"
                value={formik.values.content}
                placeholder="Content"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-3">
              {formik.touched.content && formik.errors.content ? (
                <div>{formik.errors.content}</div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1"
          >
            Edit ✔
          </button>

          <Link href={"/posts/" + encodeURIComponent(postId)}>
            <a className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1.5 ml-10">
              Back to post ❌
            </a>
          </Link>
        </form>
      ) : (
        "C AP TON POST WSH, CASSE TOI DE LA WSH!"
      )}
    </ul>
  )
}

export default EditPostForm
