import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import http from "http"

const app = express();
const port = 8080;

app.use(cors({
  credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port https://localhost:${port}`)
})