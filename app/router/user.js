module.exports = (app) => {
  const { router, controller } = app;
  router.post("/user/login", controller.user.user.login);
  router.get("/user/password/:phoneNumber/:password", controller.user.user.password);
  router.get("/user/book-keeping/total", controller.user.user.total)
  router.get("/test", controller.user.user.test);

};
