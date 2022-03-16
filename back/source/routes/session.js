import jsonwebtoken from "jsonwebtoken"
import UserModel from "../models/User.js"

const userRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password, displayName },
    } = req

    const userEmail = await UserModel.query().findOne({ email })
    const userName = await UserModel.query().findOne({ displayName })

    if (userEmail && userName) {
      res.send({ status: "Pseudo or Email already used" })

      return
    }

    const [hash, salt] = UserModel.hashPassword(password)

    await UserModel.query().insert({
      displayName,
      email,
      role: "reader",
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.send({ status: "Account created" })
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { emailOrDisplayName, password },
    } = req

    const user = await UserModel.query().findOne({ emailOrDisplayName })

    if (!user || !user.checkPassword(password)) {
      res
        .status(401)
        .send({ error: "Incorrect Password or Login(Username or Email)" })

      return
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
          },
        },
      },
      process.env.JWT_SECRET
    )

    res.send(jwt)
  })
}

export default userRoutes
