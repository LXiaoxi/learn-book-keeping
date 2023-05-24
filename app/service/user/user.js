"use strict";

const Service = require("egg").Service;
const jwt = require("jsonwebtoken");

class UserService extends Service {
  async setToken(id) {
    const { app } = this;
    const token = jwt.sign({ userId: id }, app.config.jwt.secret, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  }
  async login(data) {
    const { ctx, app } = this;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx63c59d2803f0f9df&secret=796441399ef8c8ef052c12e87e8b856f&js_code=${data.code}&grant_type=authorization_code`;
    // const result = await ctx.axios.get(url, data);
    // 如果openid不存在 将userInfo插入数据库; 存在
    const result = await ctx.axios.get(url);
    const { openid } = result;
    if (!openid) {
      return { code: 201, msg: "code重复使用" };
    }
    let res = await app.mysql.select("user", { where: { openid } });
    if (res.length === 0) {
      const obj = {
        nickname: data.userInfo.nickName ?? "微信用户",
        phone: data.userInfo.phone ?? "18307681294",
        password: "123456",
        avatar: data.userInfo.avatarUrl,
        gender: 1,
        openid,
      };
      await app.mysql.insert("user", obj);
      res = await app.mysql.select("user", { where: { openid } });
    }
    const userInfo = { ...res[0] };
    delete userInfo.password;
    const token = await this.setToken(userInfo.id);

    return { code: 200, msg: "成功", token, userInfo };
  }

  async password(data) {
    // 判断该手机号和密码是否存在
    const { app } = this;
    let res = await app.mysql.select("user", {
      where: { phone: data.phoneNumber, password: data.password },
    });
    if (res.length === 0) {
      const obj = {
        nickname: "用户" + Math.floor(Math.random() * 10),
        phone: data.phoneNumber,
        password: data.password,
        gender: 1,
      };
      await app.mysql.insert("user", obj);
      res = await app.mysql.select("user", { where: { phone: data.phoneNumber } });
    }
    const userInfo = { ...res[0] };
    delete userInfo.password;
    const token = await this.setToken(userInfo.id);
    return { code: 200, msg: "成功", token, userInfo };
  }
  async total() {
    const { app, ctx } = this;
    const res = await app.mysql.query(`
    SELECT id FROM amount_detail  WHERE userid = ${ctx.user.id}
    `);
    return { code: 200, msg: "成功", data: res.length };
  }
}

module.exports = UserService;
