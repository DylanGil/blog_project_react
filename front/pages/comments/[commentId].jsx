import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Link from "next/link"
import { TiArrowBack } from "react-icons/ti"

export default function Home() {
  const { router, session } = useContext(AppContext)
  const [comment, setComment] = useState({})

  let sessionId
  let sessionRole

  if (session) {
    sessionId = JSON.parse(session).payload.user.id
    sessionRole = JSON.parse(session).payload.user.role
  }

  const {
    query: { commentId },
  } = useRouter()

  useEffect(() => {
    if (commentId) {
      api
        .get(`/comments/${encodeURIComponent(commentId)}`)
        .then((response) => setComment(response.data))
    }
  }, [commentId])

  const DeleteComment = () => {
    api.delete(`/comments/${encodeURIComponent(commentId)}`)
    router.push(`/posts/${encodeURIComponent(comment.post_id)}`)
  }

  return (
    <Layout pagename={`${comment.content}`} displayHeader>
      <Link href={"/posts/" + encodeURIComponent(comment.post_id)}>
        <a>
          <p className="inline-flex text-xl font-bold mb-5">
            <TiArrowBack className="text-3xl" />
            back to post
          </p>
        </a>
      </Link>
      <p></p>
      <div className="mb-3 ">
        <p className="text-1xl font-bold">
          <Link href={"/users/" + encodeURIComponent(comment.user_id)}>
            <a className="font-bold underline">{comment.user_displayName}</a>
          </Link>{" "}
          commented on {new Date(comment.publicationDate).toLocaleDateString()}
        </p>
        <p className="mt-3">{comment.content}</p>
      </div>
      {sessionId == comment.user_id ? (
        <div className="my-10">
          <Link
            href={
              "/comments/" + encodeURIComponent(commentId) + "/edit-comment"
            }
          >
            <a className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1.5">
              Edit Comment
            </a>
          </Link>
          <button
            onClick={DeleteComment}
            className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1 ml-5"
          >
            Delete Comment ❌
          </button>
        </div>
      ) : (
        sessionRole == "admin" && (
          <div className="my-10">
            <Link
              href={
                "/comments/" + encodeURIComponent(commentId) + "/edit-comment"
              }
            >
              <a className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1.5">
                Edit Comment
              </a>
            </Link>
            <button
              onClick={DeleteComment}
              className="bg-blue-500 text-black mt-2 text-lg font-bold px-3 py-1 ml-5"
            >
              Delete Comment ❌
            </button>
          </div>
        )
      )}
    </Layout>
  )
}
