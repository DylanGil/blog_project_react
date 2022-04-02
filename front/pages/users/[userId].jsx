import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import AppContext from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import Link from "next/link"

export default function Home() {
  const { session, logOut } = useContext(AppContext)
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
        )}

        <li>
          <p className="text-4xl font-bold mt-6 mb-5">Posts:</p>
          <p className="text-2xl font-bold">
            {posts.length == 0 ? "Aucun post n'a été écrit " : ""}
          </p>
          {posts.map((item, index) => (
            <li
              key={item.id}
              className={index % 2 ? "bg-gray-50 p-3" : "bg-gray-200 p-3"}
            >
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
