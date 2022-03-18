import express from "express"
import config from "./source/config.js"
import knex from "knex"
import { Model } from "objection"
import cors from "cors"

import postRoutes from "./source/routes/post.js"
import userRoutes from "./source/routes/user.js"
import commentRoutes from "./source/routes/comment.js"
import sessionRoutes from "./source/routes/session.js"

const app = express()
const db = knex(config.db)
Model.knex(db)
app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
)
app.use(express.json())

postRoutes({ app })
userRoutes({ app })
commentRoutes({ app })
sessionRoutes({ app })

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`🎉 Listening on :${config.port}`))
