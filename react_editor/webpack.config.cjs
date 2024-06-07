// webpack.config.js
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    library: {
      type: "module",
    },
  },
  performance: {
    maxEntrypointSize: 5 * 1024 * 1024, // 5mb
    maxAssetSize: 5 * 1024 * 1024, // 5mb
  },
  // mode: "development",
  mode: "production",
  module: {
    rules: [
      //typescript
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
        exclude: /node_modules/,
      },

      //javascript
      {
        test: /\.js$/,
        use: "babel-loader",
      },

      //css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".css"],
  },
  optimization: {
    splitChunks: false,
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
