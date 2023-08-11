const express = require("express");
const router = express.Router();

//funciona que actualiza las variables en las diferentes llamadas
const { updateLocals } = require("../middlewares/auth.middlewares");
router.use(updateLocals);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

const userRouter = require("./user.routes.js");
router.use("/user", userRouter);

module.exports = router;
