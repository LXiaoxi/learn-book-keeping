"use strict";

const Service = require("egg").Service;

class DetailService extends Service {
  // 获取金额明细列表
  async getAmountDetailList(data) {
    const { app, ctx } = this;
    if (!data.date) {
      return { code: 500, msg: "参数错误" };
    }
    const allData = await app.mysql.query(`
      SELECT * FROM amount_detail
      WHERE userid = ${ctx.user.id} AND time LIKE "${data.date}%"
    `);
    const res = await app.mysql.query(`
      SELECT 
        id,
        icon,
        name,
        remark,
        amount,
        date,
        IF(isExpend, 'true', 'false') isExpend
      FROM amount_detail
      WHERE userid = ${ctx.user.id} AND time LIKE "${data.date}%"
      ORDER BY date DESC,id DESC
      LIMIT  ${data.pageSize ?? 10}
      OFFSET ${data.page * data.pageSize ?? 0}
    `);
    let haxPageNext = false;
    if (data.page * data.pageSize < allData.length - data.pageSize) {
      haxPageNext = true;
    }
    let expendArr = [];
    let incomeArr = [];
    allData.forEach((item) => {
      if (item.amount < 0) {
        expendArr.push(item.amount);
      } else {
        incomeArr.push(item.amount);
      }
    });
    let finallyData = res.map((item) => {
      item.isExpend = JSON.parse(item.isExpend);
      return item;
    });
    let expendTotal = expendArr?.reduce((prev, cur) => {
      return prev + cur;
    }, 0);
    let incomeTotal = incomeArr?.reduce((prev, cur) => {
      return prev + cur;
    }, 0);
    return {
      code: 200,
      msg: "成功",
      data: finallyData,
      total: allData.length,
      haxPageNext,
      expendTotal: expendTotal.toFixed(2),
      incomeTotal: incomeTotal.toFixed(2),
    };
  }

  async addAmountDetail(data) {
    const { app, ctx } = this;
    let { icon, name, amount, date, isExpend } = data;
    if (!icon || !name || !amount || !date) {
      return { code: 500, msg: "参数错误" };
    }
    if (isExpend) {
      data.amount = amount > 0 ? -amount : amount;
    } else {
      data.amount = amount < 0 ? -amount : amount;
    }
    data.userid = ctx.user.id;
    data.time = date;
    data.date = new Date(date).getTime();
    await app.mysql.insert("amount_detail", data);
    return { code: 200, msg: "成功" };
  }
  async updateAmountDetail(amountId, data) {
    const { app, ctx } = this;
    const { id } = ctx.user;
    const { icon, name, amount, date, isExpend } = data;
    if (icon == null || name == null || amount == null || date == null || isExpend == null)
      return {
        code: 500,
        msg: "参数错误",
      };
    const res = await app.mysql.select("amount_detail", { where: { id: amountId, userid: id } });
    if (res.length > 0) {
      data.date = new Date(date).getTime();
      await app.mysql.update("amount_detail", data, { where: { id: amountId } });
    } else {
      return { code: 500, msg: "参数错误" };
    }
    return { code: 200, msg: "修改成功" };
  }
  async deleteAmountDetail(id) {
    const { app } = this;
    const res = await app.mysql.select("amount_detail", { where: { id } });
    if (!res.length) {
      return { code: 500, msg: "参数错误" };
    }
    await app.mysql.delete("amount_detail", { id });
    return { code: 200, msg: "删除成功" };
  }

  async getAmountDetail(id) {
    const { app } = this;
    let [res] = await app.mysql.query(`
      SELECT 
        id,
        icon,
        name,
        remark,
        amount,
        time date,
        IF(isExpend, 'true', 'false') isExpend
      FROM amount_detail
      WHERE id = ${id}
    `);
    res.isExpend = JSON.parse(res.isExpend);
    return { code: 200, msg: "成功", data: res };
  }
}

module.exports = DetailService;
