module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@styles': './src/styles',
          '@components': './src/components',
          '@modules': './src/modules',
          '@app': './src',
          '@clients': './src/clients',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@contexts': './src/contexts',
          '@tests': './tests',
        },
      },
    ],
    ["@babel/plugin-transform-class-properties", { "loose": true }],
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
  ],
};
