"use strict";

const Controller = require("egg").Controller;

class StatisticalController extends Controller {
  async getAmountStatistical() {
    const { ctx } = this;
    const data = ctx.query;
    const res = await ctx.service.amount.statistical.getAmountStatistical(data);
    ctx.body = res;
  }
}

module.exports = StatisticalController;
