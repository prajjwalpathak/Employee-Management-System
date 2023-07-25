import { url } from '../../Constant/Url';

// admin/requests/get-monthly-requests?startDate=2023-06-01

export const getRequestData = async(startDate,endDate)=>{
    const response=await fetch(url+`admin/requests/get-range-requests?startDate=${startDate}&endDate=${endDate}`,{
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