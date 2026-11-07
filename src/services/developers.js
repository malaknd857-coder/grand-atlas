
import { getData } from "./api";

export const getDevelopers = () => {
    return getData("/developer");
};

export const getDeveloperById = (id) => {
    return getData(`/developer/${id}`);
};
