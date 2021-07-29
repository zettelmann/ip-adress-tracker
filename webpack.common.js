module.exports = {
  entry: "./src/script/app.js",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|json)$/i,
        type: "asset/resource",
      },
    ],
  },
};
