const URL_PATH = 'https://relaxed-biscuit-61dc25.netlify.app';

module.exports = {
  devServer: {
    historyApiFallback: true, // before https://localhost:3000/index.html로 fallback
    publicPath: URL_PATH,
  },
};
