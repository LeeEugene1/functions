const express = require("express");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");

require("dotenv").config();
// const {port} = ensureEnv('PORT')

app.use(cors());
// app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.get("/", async function (req, res) {
  res.render("index", {});
});
app.use("/", router);
app.use("/sse/", require("./router/sse.js"));

// app.get("*", (req, res) => {//get요청에 대해 설정한 경로외의 모든경로 처리
//   return res.render("invalid", { message: "404" });//invalid.ejs(에러처리 페이지)로 넘어감
// });

const port = "9999";
app.listen(port, () => {
  console.log(`The Express server is listening at PORT: ${port}`);
});

module.exports = app;
