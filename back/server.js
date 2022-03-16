import express from "express"
import config from "./source/config.js"
import knex from "knex"
import knexfile from "./knexfile.js"
import { Model } from "objection"

import userRoutes from "./source/routes/user.js"
import commentRoutes from "./source/routes/comment.js"
import postRoutes from "./source/routes/post.js"
import sessionRoutes from "./source/routes/session.js"

const app = express()
const db = knex(knexfile)
Model.knex(db)
app.use(express.json)

userRoutes({ app })
commentRoutes({ app })
postRoutes({ app })
sessionRoutes({ app })

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`🎉 Listening on :${config.port}`))
