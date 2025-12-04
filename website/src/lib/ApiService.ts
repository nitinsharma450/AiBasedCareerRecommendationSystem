
import { AuthenticationService } from "./AuthencationService.js";

 

export async function Api(
  endpoint: string,
  body: any = {}
): Promise<false | any> {
  const token = await AuthenticationService.getToken();

  try {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${import.meta.env.BACKEND_ENDPOINT}${endpoint}`, {
      method: "POST",
      body:  JSON.stringify(body),
      headers,
    });

    

    const json = await response.json();
    return json;
   

  } catch (error) {
    alert("Something went wrong");
    return null;
  }
}
