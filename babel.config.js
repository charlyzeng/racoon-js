module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'umd',
        targets: {
          chrome: 38,
          ie: 11,
          node: 10,
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      { loose: true },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ],
};
