import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import AppContext from "../../../src/components/AppContext"
import Layout from "../../../src/components/Layout"
import api from "../../../src/components/services/api"
import EditPostForm from "../../../src/components/EditPostForm"

export default function Home() {
  const { router, session } = useContext(AppContext)
  const [postInfo, setPostInfo] = useState(null)
  let sessionId

  if (session) {
    sessionId = JSON.parse(session).payload.user.id
  }

  const {
    query: { postId },
  } = useRouter()

  useEffect(() => {
    if (postId) {
      api
        .get(`/posts/${encodeURIComponent(postId)}`)
        .then((response) => setPostInfo(response.data))
    }
  }, [postId])

  if (!postInfo) {
    return null
  }

  return (
    <Layout pagename={`Post: ${postInfo.user_displayName}`} displayHeader>
      <EditPostForm
        postInfo={postInfo}
        sessionId={sessionId}
        postId={postId}
        router={router}
      />
    </Layout>
  )
}
