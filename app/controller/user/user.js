"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.user.user.login(data);
    console.log(res);
    ctx.body = res;
  }
  // 密码登录
  async password() {
    const { ctx } = this;
    const res = await ctx.service.user.user.password(ctx.params);
    ctx.body = res;
  }
  async test() {
    const { ctx } = this;

    ctx.body = ctx.user;
  }
  async total() {
    const { ctx } = this;
    const res = await ctx.service.user.user.total();
    ctx.body = res;
  }
}

module.exports = UserController;
