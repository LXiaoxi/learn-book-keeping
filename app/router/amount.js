module.exports = (app) => {
  const { router, controller } = app;
  // 金额明细
  router.get("/amount/detail/list", controller.amount.detail.getAmountDetailList);
  router.post("/amount/detail/add", controller.amount.detail.addAmountDetail);
  router.get("/amount/detail", controller.amount.detail.getAmountDetail);

  // 金额统计
  router.get("/amount/statistical", controller.amount.statistical.getAmountStatistical);
};
