import { useRouter } from "next/router"
import { useEffect, useState, useContext, useCallback } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function Home() {
  const { router, session } = useContext(AppContext)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  let sessionId
  // let sessionRole

  if (session) {
    sessionId = JSON.parse(session).payload.user.id
    //   sessionRole = JSON.parse(session).payload.user.role
  }

  const {
    query: { postId },
  } = useRouter()

  useEffect(() => {
    if (postId) {
      api
        .get(`/posts/${encodeURIComponent(postId)}`)
        .then((response) => setPost(response.data))
    }
  }, [postId])

  useEffect(() => {
    if (postId) {
      api
        .get(`/posts/${encodeURIComponent(postId)}/comments`)
        .then((response) => setComments(response.data))
    }
  }, [postId])

  const handleFormSubmit = useCallback(
    async ({ comment }) => {
      return await api.post(
        `/users/${sessionId}/${postId}/comments`,
        { comment },
        router.reload()
      )
    },
    [sessionId, postId, router]
  )

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Required"),
    }),
    onSubmit: handleFormSubmit,
  })

  return (
    <Layout>
      <ul className="pb-10">
        <li>
          <p className="text-2xl font-bold">
            {!post ? "Ce post n'existe pas " : ""}
          </p>
          <li key={post.id}>
            <p className="text-4xl font-bold">{post.title}</p>
            <p className="mb-3">
              <span>
                by {""}
                <Link href={"/users/" + encodeURIComponent(post.user_id)}>
                  <a className="font-bold underline">{post.user_displayName}</a>
                </Link>
                , on {""}
                {new Date(post.publicationDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-justify w-full">{post.content}</p>
          </li>
        </li>
      </ul>

      <ul className="pb-10 mt-6 divide-y">
        <li>
          <p className="text-3xl font-bold">Comments</p>
          <p className="text-2xl ">
            {comments.length == 0
              ? "Il n'y a pas de commentaire, soyez le premier !"
              : ""}
          </p>

          {/* ECRIRE UN COMMENTAIRE */}

          {sessionId && (
            <form onSubmit={formik.handleSubmit}>
              <div className="grid justify-items-start ...">
                <div className="w-full">
                  <textarea
                    className="border-2 w-full p-1"
                    id="comment"
                    placeholder="Ecrire un commentaire"
                    name="comment"
                    rows={5}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                  ></textarea>
                </div>
                <div className="mb-3">
                  {formik.touched.comment && formik.errors.comment ? (
                    <div>{formik.errors.comment}</div>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-black text-lg font-bold px-3 py-1 mb-7"
              >
                Commenter
              </button>
            </form>
          )}

          {/* LIRE LES COMMENTAIRES */}
          {comments.map((item, index) => (
            <li
              key={item.id}
              className={index % 2 ? "bg-white p-3" : "bg-gray-200 p-3"}
            >
              <p className="mb-3 text-1xl font-bold">
                <span className="mt-24">
                  {item.user_displayName} commented on{" "}
                  {new Date(item.publicationDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-justify w-full">{item.content}</p>
            </li>
          ))}
        </li>
      </ul>
    </Layout>
  )
}
