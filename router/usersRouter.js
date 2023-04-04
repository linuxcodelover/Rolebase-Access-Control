const userRouter = require("express").Router();

const { userRegister, userLogin } = require("../controller/Auth");

//! user Registration
userRouter.post("/user-register", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//! admin Registration
userRouter.post("/admin-register", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//! superadmin Registration
userRouter.post("/superadmin-register", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// !user login
userRouter.post("/user-login", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//! admin login
userRouter.post("/admin-login", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//! superadmin login
userRouter.post("/superadmin-login", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

//!users main Profile
userRouter.post("/user-profile", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

//! user protected
userRouter.post("/user-protected", async (req, res) => {
  await userRegister(req.body, "user", res);
});

//! admin protected
userRouter.post("/admin-protected", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

//! superadmin protected
userRouter.post("/superadmin-protected", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});
module.exports = userRouter;
