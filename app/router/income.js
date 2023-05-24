module.exports = (app) => {
  const { router, controller } = app;
  router.get("/income/category/list", controller.income.category.getIncomeCategory);
  router.post("/income/category/add", controller.income.category.addIncomeCategory);
};
