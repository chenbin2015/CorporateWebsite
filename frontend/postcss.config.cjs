module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore-rem'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    },
  },
}

