import { isEmptyObj } from "@utils/helper";
import { BASE_SERVER_URL } from "..";

const customFetch = async (method: string, endpoint: string, data = null, token?: string, isMultipart: boolean = false) => {
    const url = `${BASE_SERVER_URL}${endpoint}`;
    const myHeaders = new Headers();
    
    if (isMultipart) {
        // For multipart form data (image uploads)
        myHeaders.append("Content-Type", "multipart/form-data");
    } else {
        // For regular form data
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    }
    
    if (token) myHeaders.append("Authorization", "Bearer " + `${token}`);

    const options: RequestInit = {
        method: method,
        headers: myHeaders,
        redirect: "follow",
      };
    
      if (data && !isEmptyObj(data)) {
        options.body = isMultipart ? data : data.toString();
      }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // console.log("🚀 ~ customFetch ~ error:", error)
        return error;
    }
};

export default customFetch;
