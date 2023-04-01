const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/Container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // some built files will gonna use this as a template for naming them
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig);
