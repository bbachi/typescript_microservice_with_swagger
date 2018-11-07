var path =  require('path');

module.exports = {
  entry: ["./index.ts"],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,"build")
  },

  devServer: {
    port:9000,
    compress: true,
    hot:true,
    inline: true,
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader',exclude: /node_modules/,},
      { test: /\.json/, loader: "json-loader", exclude:/node_modules/,},
      { test: /\.pug/, loaders: [{loader: 'apply-loader'}, {loader: 'pug-loader',options: { pretty: true }}], exclude:/node_modules/,}
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js",".json"]
  },
  target: 'node',
  node: {
        __dirname: true
    },
  plugins: []
};
