
import { postData } from "./api";

export const sendContactMessage = (data) => {
    return postData("/contactus", data);
};
