import api from "./services/api"
import { useCallback } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Link from "next/link"

const EditCommentForm = ({
  commentInfo,
  sessionId,
  sessionRole,
  commentId,
  router,
}) => {
  const handleFormSubmit = useCallback(
    async ({ content }) => {
      return await api.put(
        `/comments/${commentId}`,
        {
          content,
        },
        router.push(`/comments/${encodeURIComponent(commentId)}`)
      )
    },
    [commentId, router]
  )

  const formik = useFormik({
    initialValues: {
      content: commentInfo.content,
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <ul className="pb-10">
      {sessionId == commentInfo.user_id || sessionRole == "admin" ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid justify-items-start ...">
            <div className=" mb-1">
              <label htmlFor="content" className="font-bold">
                Content
              </label>
            </div>
            <div className="w-full">
              <textarea
                className="border-2 w-full p-1"
                id="content"
                name="content"
                value={formik.values.content}
                rows={5}
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

          <Link href={"/comments/" + encodeURIComponent(commentId)}>
            <a className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1.5 ml-10">
              Back to comment ❌
            </a>
          </Link>
        </form>
      ) : (
        "C AP TON COMMENTAIRE WSH, CASSE TOI DE LA WSH!"
      )}
    </ul>
  )
}

export default EditCommentForm
