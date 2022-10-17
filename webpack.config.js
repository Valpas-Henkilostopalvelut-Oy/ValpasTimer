const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [new webpack.DefinePlugin(envKeys)],
    resolve: {
      fallback: {
        path: false,
        os: false,
        fs: false,
      },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        open: true,
        port: 3000,
        hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: "defaults",
                    },
                  ],
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },
      ],
    },

    mode: "development",
    entry: path.resolve(__dirname, "src", "index.jsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
  };
};
