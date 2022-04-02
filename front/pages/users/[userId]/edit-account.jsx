import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import AppContext from "../../../src/components/AppContext"
import Layout from "../../../src/components/Layout"
import api from "../../../src/components/services/api"
import EditAccountForm from "../../../src/components/EditAccountForm"

export default function Home() {
  const { router, session } = useContext(AppContext)
  const [userInfo, setUserInfo] = useState(null)
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

  if (!userInfo) {
    return null
  }

  return (
    <Layout pagename={`User: ${userInfo.displayName}`} displayHeader>
      <EditAccountForm
        userInfo={userInfo}
        sessionId={sessionId}
        userId={userId}
        router={router}
      />
    </Layout>
  )
}
