/*
 * @Author: gongxi33
 * @Date: 2022-08-20 17:03:00
 * @LastEditTime: 2023-02-20 15:53:55
 * @LastEditors: gongxi33
 * @Description:
 * @FilePath: /rail-all/metro.config.js
 */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')
module.exports = mergeConfig({
  // custom your metro config here
  // https://facebook.github.io/metro/docs/configuration
  resolver: {}
}, getMetroConfig())
