//import auth from "../middleware/auth.js"
import UserModel from "../models/User.js"
import PostModel from "../models/Post.js"
import CommentModel from "../models/Comment.js"

const userRoutes = ({ app }) => {
  app.get("/users", async (req, res) => {
    const users = await UserModel.query()

    if (!users.length) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(users)
  })

  app.get("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req
    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(user)
  })

  app.get("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
    } = req
    const user = await UserModel.query().findById(userId)
    const userPosts = await PostModel.query()
      .where("user_id", "=", userId)
      .orderBy("publicationDate", "DESC")

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(userPosts)
  })

  app.post("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
      body: { postTitle, postContent },
    } = req

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await PostModel.query().insert({
      title: postTitle,
      content: postContent,
      user_displayName: user.displayName,
      user_id: user.id,
    })

    res.status(201).send({ status: "Post created" })
  })

  app.post("/users/:userId/:postId/comments", async (req, res) => {
    const {
      params: { userId, postId },
      body: { comment },
    } = req

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await CommentModel.query().insert({
      content: comment,
      post_id: postId,
      user_displayName: user.displayName,
      user_id: user.id,
    })

    res.status(201).send({ status: "Post created" })
  })

  app.put("/users/:userId", async (req, res) => {
    const {
      params: { userId },
      body: { email, displayName, password },
    } = req

    const user = await UserModel.query().updateAndFetchById(userId, {
      email,
      displayName,
      password,
    })

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.status(200).send({ status: `User ${userId} info updated` })
  })

  app.delete("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await PostModel.query()
      .update({ user_displayName: "Deleted User", user_id: null })
      .where({
        user_id: user.id,
      })
    await UserModel.query().delete().where({ id: userId })

    res.send({ status: `User ${userId} deleted` })
  })
}

export default userRoutes
