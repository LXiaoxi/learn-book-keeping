module.exports = (app) => {
  const { router, controller } = app;
  // 支出分类
  router.post("/expend/category/add", controller.expend.category.addExpendCategory);
  router.get("/expend/category/list", controller.expend.category.getExpendCategory);

 
};
