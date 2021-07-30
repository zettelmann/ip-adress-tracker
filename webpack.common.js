module.exports = {
  entry: "./src/script/controller.js",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|json)$/i,
        type: "asset/resource",
      },
    ],
  },
};
