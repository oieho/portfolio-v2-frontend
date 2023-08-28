import { observable } from 'mobx';

const modifyContent = observable({
  portfolioContentToServer: '',
  setPortfolioContentToServer(Content: string) {
    this.portfolioContentToServer = Content;
  },
});

export default modifyContent;
