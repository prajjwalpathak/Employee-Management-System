import { url } from '../../Constant/Url';

// admin/get-hierarchy?userId=10005

export const getHierarchy = async(userId)=>{
    const response=await fetch(url+`admin/get-hierarchy?userId=${userId}`,{
        method:"GET",
        headers:{"Content-Type": "application/json" },
        credentials:"include"
    })

    if(!response.ok){
        throw new Error('Data could not be fetched')
    }else{
        return await response.json();
    }
}