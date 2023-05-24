"use strict";

const Controller = require("egg").Controller;

class IncomeController extends Controller {
  async getIncomeCategory() {
    const { ctx } = this;
    const res = await ctx.service.income.category.getIncomeCategory();
    ctx.body = res;
  }
  async addIncomeCategory() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.income.category.addIncomeCategory(data);
    ctx.body = res;
  }
}

module.exports = IncomeController;
