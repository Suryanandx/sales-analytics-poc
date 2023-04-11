export const firebaseLooper = (snapshot: any) => {
    let data = <any>[];
    snapshot.forEach((doc : any) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  };
  
  export const firebaseLooperTwo = (snapshot: any) => {
    let data = <any>[];
    snapshot.forEach((doc : any) => {
      data.push({
        ...doc.val(),
      });
    });
    return data;
  };
 
  
