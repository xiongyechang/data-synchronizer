module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 1%, last 2 versions, not ie <= 8",
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    // "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-external-helpers",
    [
      "@babel/plugin-transform-runtime", {
        "corejs": {
          "version": 3,
          "proposals": true,
        },
        "useESModules": true,
      }
    ]
  ],
}