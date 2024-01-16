module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 1%, last 2 versions, not ie <= 8",
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-external-helpers",
    [
      "@babel/plugin-transform-runtime", {
        "corejs": 3,
        "useESModules": false
      }
    ]
  ]
}