import PostModel from "../models/Post.js"
import CommentModel from "../models/Comment.js"
//import auth from "../middleware/auth.js"

const postRoutes = ({ app }) => {
  app.get("/posts", async (req, res) => {
    const posts = await PostModel.query().orderBy("createdAt", "desc")

    if (!posts) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(posts)
  })

  app.get("/posts/:postId", async (req, res) => {
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

  app.get("/posts/:postId/comments", async (req, res) => {
    const {
      params: { postId },
    } = req
    const post = await PostModel.query().findById(postId)
    const postComments = await CommentModel.query().where(
      "post_id",
      "=",
      postId
    )

    if (!post || !postComments) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(postComments)
  })

  app.put("/posts/:postId", async (req, res) => {
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

  app.delete("/posts/:postId", async (req, res) => {
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
