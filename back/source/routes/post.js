import PostModel from "../models/Post.js"
import auth from "../middleware/auth.js"

const postRoutes = ({ app }) => {
  app.get("/posts", async (req, res) => {
    const posts = await PostModel.query()

    if (!posts.length) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    console.log(posts)

    res.send(posts)
  })

  app.get("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
    } = req
    const post = await PostModel.query().findById(postId)

    if (!post) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(post)
  })

  app.put("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
      body: { title, content },
    } = req

    const post = await PostModel.query().updateAndFetchById(postId, {
      title,
      content,
    })

    if (!post) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.status(200).send({ status: `Post ${postId} updated` })
  })

  app.delete("/posts/:postId", auth, async (req, res) => {
    const {
      params: { postId },
    } = req

    const post = await PostModel.query().findById(postId)

    if (!post) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await PostModel.query().delete().where({ id: postId })

    res.send({ status: `Post ${postId} deleted` })
  })
}

export default postRoutes
