const express = require('express');
const router = express.Router();

const {updatelocal} = require("../middlewares/auth.middlewares")
router.use(updatelocal)

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const userRouter = require("./user.routes.js")
router.use("/user", userRouter)

module.exports = router;
