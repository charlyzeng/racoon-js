module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties', { loose: true },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ],
};
