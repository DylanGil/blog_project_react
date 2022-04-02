import { useEffect, useState, useCallback, useContext } from "react"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import api from "../src/components/services/api"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const { router, session } = useContext(AppContext)
  let sessionId
  let commentNumber = 0

  if (session) {
    sessionId = JSON.parse(session).payload.user.id
  }

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data))
  }, [])

  useEffect(() => {
    api.get("/comments").then((response) => setComments(response.data))
  }, [])

  const handleFormSubmit = useCallback(
    async ({ postTitle, postContent }) => {
      return await api.post(
        `/users/${sessionId}/posts`,
        {
          postTitle,
          postContent,
        },
        router.reload()
      )
    },
    [router, sessionId]
  )

  const formik = useFormik({
    initialValues: {
      postTitle: "",
      postContent: "",
    },
    validationSchema: Yup.object({
      postTitle: Yup.string().required("Required"),
      postContent: Yup.string().required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <Layout pagename="Accueil" displayHeader>
      <ul className="pb-10">
        {session && (
          <div className="mb-10 border-2 border-gray-400 rounded p-5">
            <span className="text-3xl font-bold">Create a post</span>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid justify-items-start ...">
                <div className=" mb-1">
                  <label htmlFor="postTitle" className="font-bold">
                    Titre
                  </label>
                </div>
                <div className="w-full">
                  <input
                    className="border-2 w-full h-9 p-1"
                    id="postTitle"
                    name="postTitle"
                    placeholder="Titre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postTitle}
                  />
                </div>
                <div className="mb-3">
                  {formik.touched.postTitle && formik.errors.postTitle ? (
                    <div>{formik.errors.postTitle}</div>
                  ) : null}
                </div>
              </div>

              <div className="grid justify-items-start ...">
                <div className=" mb-1">
                  <label htmlFor="postContent" className="font-bold">
                    Content
                  </label>
                </div>
                <div className="w-full">
                  <textarea
                    className="border-2 w-full p-1"
                    id="postContent"
                    placeholder="Content"
                    name="postContent"
                    rows={5}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postContent}
                  ></textarea>
                </div>
                <div className="mb-3">
                  {formik.touched.postContent && formik.errors.postContent ? (
                    <div>{formik.errors.postContent}</div>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1"
              >
                Publier
              </button>
            </form>
          </div>
        )}

        {posts.map((item, index) => (
          <li
            key={item.id}
            className={index % 2 ? "bg-gray-50 p-3" : "bg-gray-200 p-3 pb-5"}
          >
            <div className="hidden">{(commentNumber = 0)}</div>
            <Link href={"posts/" + encodeURIComponent(item.id)}>
              <a className="text-4xl font-bold">{item.title}</a>
            </Link>
            <p className="mb-3">
              by{" "}
              <span className="font-bold underline">
                <Link href={"users/" + encodeURIComponent(item.user_id)}>
                  <a className="font-bold">{item.user_displayName}</a>
                </Link>
              </span>
              , on{" "}
              <span>{new Date(item.publicationDate).toLocaleDateString()}</span>
              {comments.map((comment) => (
                <div key={comment.id} className="hidden">
                  {comment.post_id == item.id && commentNumber++}
                </div>
              ))}
              <span className="ml-3">💬{commentNumber}</span>
            </p>
            <p className="text-justify w-full">{item.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
