import { getData } from "./api";

export const getUnits = (filters = {}) => {
    return getData("/unit", filters);
};

export const getUnitById = (id) => {
    return getData(`/unit/${id}`);
};