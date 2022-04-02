import { useRouter } from "next/router"
import { useEffect, useState, useContext, useCallback } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function Home() {
  const { router, session, logOut } = useContext(AppContext)
  const [userInfo, setUserInfo] = useState([])
  const [posts, setPosts] = useState([])
  let sessionId

  if (session) {
    sessionId = JSON.parse(session).payload.user.id
  }

  const {
    query: { userId },
  } = useRouter()

  useEffect(() => {
    if (userId) {
      api
        .get(`/users/${encodeURIComponent(userId)}`)
        .then((response) => setUserInfo(response.data))
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      api
        .get(`/users/${encodeURIComponent(userId)}/posts`)
        .then((response) => setPosts(response.data))
    }
  }, [userId])

  const DeleteAccount = () => {
    api.delete(`/users/${encodeURIComponent(userId)}`)
    logOut()
  }

  const handleFormSubmit = useCallback(
    async ({ postTitle, postContent }) => {
      return await api.post(
        `/users/${userId}/posts`,
        {
          postTitle,
          postContent,
        },
        router.reload()
      )
    },
    [router, userId]
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
    <Layout pagename={`User: ${userInfo.displayName}`} displayHeader>
      <ul className="pb-10">
        <li>
          <p className="text-4xl font-bold">Id: {userInfo.id} (pour dev)</p>
          <p className="text-4xl font-bold">Email : {userInfo.email}</p>
          <p className="text-4xl font-bold">Username: {userInfo.displayName}</p>
          <p className="text-4xl font-bold">Role: {userInfo.role} (pour dev)</p>
        </li>

        {sessionId == userId && (
          <div>
            <div className="my-10">
              <Link
                href={
                  "/users/" + encodeURIComponent(userInfo.id) + "/edit-account"
                }
              >
                <a className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1">
                  Edit Account
                </a>
              </Link>
              <button
                onClick={DeleteAccount}
                className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1 ml-5"
              >
                Delete Account ❌
              </button>
            </div>

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

        <li>
          <p className="text-4xl font-bold mt-6 mb-5">Posts:</p>
          <p className="text-2xl font-bold">
            {posts.length == 0 ? "Aucun post n'a été écrit " : ""}
          </p>
          {posts.map((item) => (
            <li key={item.id}>
              <Link href={"/posts/" + encodeURIComponent(item.id)}>
                <a className="text-4xl font-bold">{item.title}</a>
              </Link>
              <p className="mb-3">
                <span>
                  {new Date(item.publicationDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-justify w-full">{item.content}</p>

              <div className="my-5 mx-auto w-max">***</div>
            </li>
          ))}
        </li>
      </ul>
    </Layout>
  )
}
