/*
 * @Author: gongxi33
 * @Date: 2022-08-20 17:03:00
 * @LastEditTime: 2023-02-20 18:01:06
 * @LastEditors: gongxi33
 * @Description:
 * @FilePath: /rail-all/babel.config.js
 */
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: false,
      },
    ],
    'module:metro-react-native-babel-preset',
  ],
  plugins: ['react-native-reanimated/plugin',[
    [
        "module:react-native-dotenv",
        {
            "moduleName": "@env",
            "path": ".env",
            "blacklist": null,
            "whitelist": null,
            "safe": false,
            "allowUndefined": true
        }
    ]
]],
};
module.exports = {     presets: ['module:metro-react-native-babel-preset'],     plugins: [         [             'module:react-native-dotenv',             {                 moduleName: '@env',                 path: '.env',                 blacklist: null,                 whitelist: null,                 safe: false,                 allowUndefined: true,             },         ],     ], };
