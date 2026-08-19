export type { City, Province, Course, HomeInstitute, HomeInstituteQuery } from "./api-types";
export type { AcademyCardData } from "./queries";
export {
  getCities,
  getProvinces,
  getHomeInstitutes,
  getCourses,
  mapInstituteToCard,
  resolveApiUrl,
  DEFAULT_PROVINCE_NAME,
} from "./queries";