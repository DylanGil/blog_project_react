import { useEffect, useState } from "react"
import Page from "../src/components/Page"
import api from "../src/components/services/api"

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data))
  }, [])

  return (
    <Page>
      <ul className="pb-10">
        {posts.map((item) => (
          <li key={item.id}>
            <p className="text-4xl font-bold">{item.title}</p>
            <p className="mb-3">
              by{" "}
              <span className="font-bold underline">
                {item.user_displayName ? item.user_displayName : "Deleted user"}
              </span>
              , on <span>{item.publicationDate}</span>
            </p>
            <p className="text-justify w-full">{item.content}</p>

            <div className="my-5 mx-auto w-max">***</div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
