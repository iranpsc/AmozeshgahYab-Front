export { ApiError } from "./api-client";
export type {
  City,
  Province,
  Course,
  Subcourse,
  HomeInstitute,
  HomeInstituteQuery,
  InstituteDetail,
} from "./api-types";
export type {
  AcademyCardData,
  AcademyListItemData,
  GenderInfo,
  InstituteDetailData,
  InstituteCourseCard,
  InstituteSubcourseCard,
} from "./queries";
export {
  getCities,
  getProvinces,
  getHomeInstitutes,
  getInstituteBySlug,
  getCourses,
  getSubcourses,
  mapInstituteToCard,
  mapInstituteToListItem,
  mapInstituteToDetail,
  resolveApiUrl,
  DEFAULT_PROVINCE_NAME,
  DEFAULT_PAGE_SIZE,
} from "./queries";
