const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT } = require("./config");
const { STATUS_CODE } = require("./constants/statusCode");
const { MENU_LINKS } = require("./constants/navigation");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  res.status(STATUS_CODE.OK).render("index", {
    title: "HMS - Home",
    menuLinks: MENU_LINKS,
  });
});



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});