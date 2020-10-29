module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    standardFontWeights: true,
    defaultLineHeights: true,
  },
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [],
};
