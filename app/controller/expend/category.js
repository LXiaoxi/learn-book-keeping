"use strict";

const Controller = require("egg").Controller;

class CategoryController extends Controller {
  async addExpendCategory() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.expend.category.addExpendCategory(body);
    ctx.body = res;
  }

  async getExpendCategory() {
    const { ctx } = this;
    const res = await ctx.service.expend.category.getExpendCategory();
    ctx.body = res;
  }
}

module.exports = CategoryController;
