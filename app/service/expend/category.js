"use strict";

const Service = require("egg").Service;

class CategoryService extends Service {
  async addExpendCategory(data) {
    // 判断body的name还有icon是否存在数据库中
    // 不存在: 添加
    // 存在: 返回
    const { app } = this;
    const res = await app.mysql.query(`
      SELECT * FROM expend WHERE icon = '${data.icon}' AND name = '${data.name}'
    `);
    if (res.length) {
      return { code: 500, msg: "该数据已存在" };
    }
    await app.mysql.insert("expend", data);
    return { code: 200, msg: "插入成功" };
  }
  // 获取支出分类列表
  async getExpendCategory() {
    const { app } = this;
    const res = await app.mysql.query(`
      SELECT * FROM expend 
    `);
    return { code: 200, msg: "成功", data: res };
  }
}

module.exports = CategoryService;
