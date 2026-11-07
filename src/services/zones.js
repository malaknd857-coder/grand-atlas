
import { getData } from "./api";

export const getZones = () => {
    return getData("/zone");
};

export const getZoneById = (id) => {
    return getData(`/zone/${id}`);
};
