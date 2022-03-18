import UserModel from "../models/User.js"
import auth from "../middleware/auth.js"

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

  app.put("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req

    const user = await UserModel.query().updateAndFetchById(userId, {
      role,
    })

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.status(200).send({ status: `User ${userId} role: changed` })
  })

  app.delete("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
    } = req

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await UserModel.query().delete().where({ id: userId })

    res.send({ status: `User ${userId} deleted` })
  })
}

export default userRoutes
