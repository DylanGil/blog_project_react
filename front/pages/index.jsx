import { useEffect, useState } from "react"
import Layout from "../src/components/Layout"
import api from "../src/components/services/api"
import Link from "next/link"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data))
  }, [])

  return (
    <Layout>
      <ul className="pb-10">
        {posts.map((item, index) => (
          <li
            key={item.id}
            className={index % 2 ? "bg-white p-3" : "bg-gray-200 p-3 pb-5"}
          >
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
            </p>
            <p className="text-justify w-full">{item.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
