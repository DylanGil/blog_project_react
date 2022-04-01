import CommentModel from "../models/Comment.js"
//import auth from "../middleware/auth.js"

const commentRoutes = ({ app }) => {
  app.get("/:commentId", async (req, res) => {
    const comment = await CommentModel.query()

    if (!comment.length) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(comment)
  })

  app.put("/:commentId", async (req, res) => {
    const {
      params: { commentId },
      body: { content },
    } = req

    const comment = await CommentModel.query().updateAndFetchById(commentId, {
      content,
    })

    if (!comment) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.status(200).send({ status: `Comment ${commentId} updated` })
  })

  app.delete("/:commentId", async (req, res) => {
    const {
      params: { commentId },
    } = req

    const comment = await CommentModel.query().findById(commentId)

    if (!comment) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await CommentModel.query().delete().where({ id: commentId })

    res.send({ status: `Comment ${commentId} deleted` })
  })
}

export default commentRoutes
