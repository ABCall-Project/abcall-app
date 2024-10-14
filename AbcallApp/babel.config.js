module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
          '@utils': './src/utils'
        },
      },
    ],
  ],
};
