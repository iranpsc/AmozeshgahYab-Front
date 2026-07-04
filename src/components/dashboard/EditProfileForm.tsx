"use client";

import { useMemo, useState } from "react";

import FormField from "@/components/form/FormField";
import FormGrid from "@/components/form/FormGrid";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import Select from "@/components/form/Select";
import Button from "@/components/form/Button";
import {
  validateInstitute,
} from "@/utils/validation/institute";
import useFormErrors from "@/hooks/useFormErrors";
interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  province: number;
}

export interface InstituteProfile {
  id: number;
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  address: string;
  postal_code: string;
  province?: number;
  city?: number;
  status: string;
}

interface Props {
  profile: InstituteProfile;

  provinces: Province[];

  cities: City[];

  onSubmit: (data: {
    institute_name: string;
    mobile_number: string;
    landline_phone: string;
    province: number;
    city: number;
    address: string;
    postal_code: string;
  }) => Promise<void>;

  onCancel: () => void;
}

export default function EditProfileForm({
  profile,
  provinces,
  cities,
  onSubmit,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);
const {
  errors,
  clearErrors,
  setBackendErrors,
} = useFormErrors();

  const [form, setForm] = useState({
    institute_name: profile.institute_name,
    mobile_number: profile.mobile_number,
    landline_phone: profile.landline_phone,
    postal_code: profile.postal_code,
    address: profile.address,
    province: profile.province ?? 0,
    city: profile.city ?? 0,
  });

  const filteredCities = useMemo(() => {
    return cities.filter(
      (city) => city.province === form.province
    );
  }, [cities, form.province]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    if (name === "province") {
      setForm((prev) => ({
        ...prev,
        province: Number(value),
        city: 0,
      }));

      return;
    }

    if (name === "city") {
      setForm((prev) => ({
        ...prev,
        city: Number(value),
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

async function submit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  clearErrors();

  const validationErrors = validateInstitute({
    institute_name: form.institute_name,
    mobile_number: form.mobile_number,
    landline_phone: form.landline_phone,
    province: Number(form.province),
    city: Number(form.city),
    address: form.address,
    postal_code: form.postal_code,
  });

  if (Object.keys(validationErrors).length) {
    setBackendErrors(validationErrors);
    return;
  }

try {
  setLoading(true);

  await onSubmit({
    institute_name: form.institute_name,
    mobile_number: form.mobile_number,
    landline_phone: form.landline_phone,
    province: Number(form.province),
    city: Number(form.city),
    address: form.address,
    postal_code: form.postal_code,
  });

} catch (err) {
  setBackendErrors(err);
} finally {
  setLoading(false);
}
}

console.log(errors);
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-8 shadow"
    >
      <h2 className="mb-8 text-3xl font-bold">
        ویرایش اطلاعات آموزشگاه
      </h2>

      <FormGrid>

        <FormField
          label="نام آموزشگاه"
          required
          error={errors.institute_name}
        >
          <Input
            name="institute_name"
            value={form.institute_name}
            onChange={handleChange}
            error={!!errors.institute_name}
          />
        </FormField>

        <FormField
          label="شماره موبایل"
          required
          error={errors.mobile_number}
        >
          <Input
            name="mobile_number"
            value={form.mobile_number}
            onChange={handleChange}
            error={!!errors.mobile_number}
          />
        </FormField>

        <FormField
          label="تلفن ثابت"
          required
           error={errors.landline_phone}
        >
          <Input
            name="landline_phone"
            value={form.landline_phone}
            onChange={handleChange}
            error={!!errors.landline_phone}
          />
        </FormField>

        <FormField
          label="کد پستی"
          required
          error={errors.postal_code}
        >
          <Input
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            error={!!errors.postal_code}
          />
        </FormField>

        <FormField
          label="استان"
          required
          error={errors.province}
        >
          <Select
            name="province"
            value={form.province}
            onChange={handleChange}
            error={!!errors.province}
            
          >
            <option value={0}>
              انتخاب استان
            </option>

            {provinces.map((province) => (
              <option
                key={province.id}
                value={province.id}
              >
                {province.name}
               
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="شهر"
          required
          error={errors.city}
        >
          <Select
            name="city"
            value={form.city}
            onChange={handleChange}
            error={!!errors.city}
          >
            <option value={0}>
              انتخاب شهر
            </option>

            {filteredCities.map((city) => (
              <option
                key={city.id}
                value={city.id}
              >
                {city.name}
              </option>
            ))}
          </Select>
        </FormField>

      </FormGrid>

      <div className="mt-5">
        <FormField
          label="آدرس"
          required
          error={errors.address}
        >
          <Textarea
            rows={5}
            name="address"
            value={form.address}
            onChange={handleChange}
            error={!!errors.address}
          />
        </FormField>
      </div>

      <div className="mt-8 flex gap-3">

        <Button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          className="bg-slate-200 text-slate-700 hover:bg-slate-300"
        >
          انصراف
        </Button>

      </div>
    </form>
  );
}