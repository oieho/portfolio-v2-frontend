import { observable } from 'mobx';

const deliveryCountedWnos = observable({
  countedWnos: [] as any[],

  setCountedWnos(alreadyCountedWnos: any[]) {
    this.countedWnos = alreadyCountedWnos;
  },
});

export default deliveryCountedWnos;
