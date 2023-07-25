
export async function fetchLocation(){

    return new Promise((resolve, reject) => {
      const getlocation = async (pos)=>{
        const lat = await pos.coords.latitude;
        const log = await pos.coords.longitude;
        await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${log}&localityLanguage=en`)
          .then((res)=>res.json())
          .then((data)=>{
            resolve(data.city);
          })
          .catch((error)=>{
            reject(error);
          })
      }
  
      navigator.geolocation.getCurrentPosition(getlocation);
    });
  }
  