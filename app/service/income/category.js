"use strict";

const Service = require("egg").Service;

class CategoryService extends Service {
  async getIncomeCategory() {
    const { app } = this;
    const res = await app.mysql.query(`
      SELECT * FROM income
    `);
    return { code: 200, msg: "成功", data: res };
  }
  async addIncomeCategory(data) {
    const { app } = this;
    await app.mysql.insert("income", data);
    return { code: 200, msg: "成功" };
  }
}

module.exports = CategoryService;
