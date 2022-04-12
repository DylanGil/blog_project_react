import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import AppContext from "../../../src/components/AppContext"
import Layout from "../../../src/components/Layout"
import api from "../../../src/components/services/api"
import EditCommentForm from "../../../src/components/EditCommentForm"

export default function Home() {
  const { router, session } = useContext(AppContext)
  const [commentInfo, setCommentInfo] = useState(null)
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
        .then((response) => setCommentInfo(response.data))
    }
  }, [commentId])

  if (!commentInfo) {
    return null
  }

  return (
    <Layout pagename={`Comment: ${commentInfo.user_displayName}`} displayHeader>
      <EditCommentForm
        commentInfo={commentInfo}
        sessionId={sessionId}
        sessionRole={sessionRole}
        commentId={commentId}
        router={router}
      />
    </Layout>
  )
}
