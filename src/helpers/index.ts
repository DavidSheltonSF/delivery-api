import { randomBytes } from 'crypto';

export const random = () => {
  return randomBytes(123).toString('base64');
}

export const arraysOfObjAreEqual = (arr1: Array<any>, arr2: Array<any>): Boolean => {
  if (arr1.length !== arr2.length){
    console.log('Dif length')
    return false;
  }
  
  for (let i=0; i < arr1.length; i++) {

    // Removing all fields that starts with '_'
    const obj1 = Object.keys(arr1).forEach((key: any) => {
      if (key.startsWith('_')){
        delete arr1[key];
      }
    });
    const obj2 = Object.keys(arr1).forEach((key: any) => {
      if (key.startsWith('_')){
        delete arr2[key];
      }
    });

    if (JSON.stringify(obj1) != JSON.stringify(obj2)){
      return false
    }
  }

  return true;
}