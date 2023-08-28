import { observable } from 'mobx';

const deliveryImgInfoOnWriting = observable({
  imgInfoOnWriting: [] as any[],

  setImgInfoOnWriting(updatedFiles: any[]) {
    this.imgInfoOnWriting = updatedFiles;
  },
});

export default deliveryImgInfoOnWriting;
