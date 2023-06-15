/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1682567531987_452";

  config.mysql = {
    client: {
      // host
      host: "localhost",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "123456",
      // database
      database: "bookkeeping",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // add your middleware config here
  config.middleware = [];

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    // domainWhiteList: [ 'http://localhost:3000' ],
  };
  config.jwt = {
    secret: "123456", //自定义 token 的加密条件字符串
    enable: true,
    ignore: ["/user/login", "/user/password/*"], // 哪些不需要验证
    sign: {
      expiresIn: "24h",
    },
  };
  config.cluster = {
    listen: {
      path: "",
      post: "7001",
      hostname: "192.168.1.214",
      // hostname: "127.0.0.1",
    },
  };
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
