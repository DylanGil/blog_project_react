import express from "express"
import config from "./source/config.js"

const app = express()
const port = 3000

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🎉 Listening on :${port}`))
