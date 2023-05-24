"use strict";

const Service = require("egg").Service;

class StatisticalService extends Service {
  async getAmountStatistical(data) {
    const { app } = this;
    let { date, type, isExpend } = data;
    let sql = `
    SELECT * 
    FROM amount_detail
    WHERE isExpend = ${isExpend} AND time regexp '${date}'
    ORDER BY time
    `;
    let res = await app.mysql.query(sql);
    const map = new Map();
    date.split("|").forEach((item) => {
      map.set(item, []);
    });
    // 根据日期存放数据
    res.forEach((item) => {
      if (type == 2) {
        item.time = item.time.slice(0, 7);
      }
      if (map.has(item.time)) {
        map.get(item.time).push(item);
      }
    });
    let newData = {
      list: [],
      total: 0,
      ranking: [],
    };
    for (let [key, value] of map.entries()) {
      newData.list.push({
        date: key,
        amount: value.reduce((pre, item) => {
          return pre + item.amount;
        }, 0),
      });
    }
    newData.total = newData.list.reduce((pre, i) => {
      i.amount = i.amount < 0 ? -i.amount : i.amount;
      return pre + i.amount;
    }, 0);

    // 根据分类统计
    const iconMap = new Map();
    res.forEach((item) => {
      if (iconMap.has(item.icon)) {
        iconMap.get(item.icon).push(item);
      } else {
        iconMap.set(item.icon, [item]);
      }
    });
    for (let [key, value] of iconMap.entries()) {
      newData.ranking.push({
        icon: key,
        amount: value.reduce((pre, item) => {
          let num = item.amount < 0 ? -item.amount : item.amount;
          return pre + num;
        }, 0),
        name: value[0]?.name,
      });
    }
    // 处理排行榜的百分比
    newData.ranking = newData.ranking.map((item) => {
      let num = item.amount < 0 ? -item.amount : item.amount;
      item.proportion = Math.round((num / newData.total) * 10000) / 100.0;
      return item;
    });
    return { code: 200, msg: "成功", data: newData };
  }
}

module.exports = StatisticalService;
