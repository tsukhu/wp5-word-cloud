const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "https://word-cloud.netlify.app/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "wordapp",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./WordApp": "./src/wordApp",
      },
      shared: {
        ...require("./package.json").dependencies,
        "react-dom": {
          import: "react-dom", // the "react" package will be used a provided and fallback module
          shareKey: "react-dom", // under this name the shared module will be placed in the share scope
          shareScope: "legacy", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        react: {
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "legacy", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
      },
     
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
