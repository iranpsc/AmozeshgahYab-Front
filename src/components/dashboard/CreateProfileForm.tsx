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

interface CreateProfileFormProps {
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
}

export default function CreateProfileForm({
  provinces,
  cities,
  onSubmit,
}: CreateProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    errors,
    clearErrors,
    setBackendErrors,
  } = useFormErrors();

  const [form, setForm] = useState({
    institute_name: "",
    mobile_number: "",
    landline_phone: "",
    province: 0,
    city: 0,
    address: "",
    postal_code: "",
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

  clearErrors(name);

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

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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

    if (Object.keys(validationErrors).length > 0) {
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

  return (
    <div className="mx-auto w-full rounded-2xl bg-white p-8 shadow">
      <h2 className="mb-8 text-3xl font-bold">
        ایجاد پروفایل آموزشگاه
      </h2>

      <form onSubmit={submit} className="space-y-6">
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
              placeholder="نام آموزشگاه"
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
              placeholder="شماره موبایل"
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
              placeholder="تلفن ثابت"
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
              placeholder="کد پستی"
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
              <option value={0}>استان را انتخاب کنید</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
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
              disabled={!form.province}
            >
              <option value={0}>شهر را انتخاب کنید</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Select>
          </FormField>
        </FormGrid>

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
            placeholder="آدرس کامل آموزشگاه"
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="min-w-[180px]"
          >
            {loading ? "در حال ایجاد..." : "ثبت اطلاعات"}
          </Button>
        </div>
      </form>
    </div>
  );
}