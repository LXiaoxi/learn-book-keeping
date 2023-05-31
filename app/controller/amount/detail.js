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
  async updateAmountDetail() {
    const { ctx } = this;
    const { amountId } = ctx.params;
    const data = ctx.request.body;
    const res = await ctx.service.amount.detail.updateAmountDetail(amountId, data);
    ctx.body = res;
  }
  async deleteAmountDetail() {
    const { ctx } = this;
    const { amountId } = ctx.params;
    const res = await ctx.service.amount.detail.deleteAmountDetail(Number(amountId));
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
