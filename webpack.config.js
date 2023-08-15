const URL_PATH = './';

module.exports = {
  devServer: {
    historyApiFallback: true, // before https://localhost:3000/index.html로 fallback
    publicPath: URL_PATH,
  },
};
