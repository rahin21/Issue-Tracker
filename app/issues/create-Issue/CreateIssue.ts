
import axios, { AxiosResponse } from "axios";

interface dataTypeI{
    title:string,
    description: string,
}
export const CreateIssue = async(data:dataTypeI) =>{
    try {
        await axios
          .post("/api/auth/createIssue", {
            title: data.title,
            description: data.description,
            status: "Open",
          })
          .then((res: AxiosResponse) => console.log(res))
          .catch((err: Error) => {
            console.log(err);
          });
        // router.push("/issues");
      } catch (error) {
        return error;
      }
}