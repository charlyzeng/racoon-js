// Whether the process is run in rollup.
const isInRollup = Object.prototype.hasOwnProperty.call(
  process.env,
  'ROLLUP',
);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isInRollup ? false : 'umd',
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
    [
      '@babel/plugin-transform-runtime',
      { useESModules: isInRollup },
    ],
  ],
};
