var express = require("express");
var cors = require("cors");
require("dotenv").config();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  async function (req, res, next) {
    const { originalname, mimetype, size } = req.file;
    await unlinkAsync(req.file.path);
    res.json({
      name: originalname,
      type: mimetype,
      size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
