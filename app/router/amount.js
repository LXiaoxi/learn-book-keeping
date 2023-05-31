module.exports = (app) => {
  const { router, controller } = app;
  // 金额明细
  router.get("/amount/detail/list", controller.amount.detail.getAmountDetailList);
  router.post("/amount/detail/add", controller.amount.detail.addAmountDetail);
  router.put("/amount/detail/update/:amountId", controller.amount.detail.updateAmountDetail);
  router.delete("/amount/detail/delete/:amountId", controller.amount.detail.deleteAmountDetail)
  router.get("/amount/detail", controller.amount.detail.getAmountDetail);

  // 金额统计
  router.get("/amount/statistical", controller.amount.statistical.getAmountStatistical);
};
