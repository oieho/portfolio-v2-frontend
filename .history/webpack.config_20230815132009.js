const URL_PATH = 'https://relaxed-biscuit-61dc25.netlify.app';

module.exports = {
  devServer: {
    historyApiFallback: {
      index: `${URL_PATH}index.html`, // after https://localhost:3000/react-blog/index.html로 fallback
    },
    publicPath: URL_PATH,
  },
};
