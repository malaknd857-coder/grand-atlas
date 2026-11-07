
import { getData } from "./api";

export const getProjects = () => {
    return getData("/projects/all-projects");
};

export const getProjectById = (id) => {
    return getData(`/projects/${id}`);
};
