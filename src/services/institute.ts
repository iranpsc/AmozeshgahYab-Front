import api from "./api";

export interface InstituteProfile {
  id: number;
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  address: string;
  postal_code: string;
  status: string;
}

export interface CreateInstituteDto {
  institute_name: string;
  landline_phone: string;
  mobile_number: string;
  province: number;
  city: number;
  address: string;
  postal_code: string;
}
export interface InstituteBranding {
  id: number;

  courses: number[];

  logo: string | null;
  logo_problem: string;

  banner: string | null;
  banner_problem: string;

  status: "pending" | "approved" | "rejected";
}


export async function getProfile() {
  const res = await api.get<InstituteProfile>(
    "/academy/institute/profile/"
  );

  return res.data;
}

export async function createProfile(
  data: CreateInstituteDto
) {
  const res = await api.post(
    "/academy/institute/profile/",
    data
  );

  return res.data;
}