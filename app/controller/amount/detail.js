"use strict";

const Controller = require("egg").Controller;

class DetailController extends Controller {
  async getAmountDetailList() {
    const { ctx } = this;
    const data = ctx.query;
    const res = await ctx.service.amount.detail.getAmountDetailList(data);
    ctx.body = res;
  }
  async addAmountDetail() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.amount.detail.addAmountDetail(data);
    ctx.body = res;
  }
  async getAmountDetail() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.amount.detail.getAmountDetail(id);
    ctx.body = res;
  }
}

module.exports = DetailController;
