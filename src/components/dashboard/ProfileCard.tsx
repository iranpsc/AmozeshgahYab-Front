interface InstituteProfile {
  id: number;
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  address: string;
  postal_code: string;
  gender?: string;
  latitude?: string;
  longitude?: string;
  status: string;
}

interface ProfileCardProps {
  profile: InstituteProfile;
  onEdit: () => void;
}

/** همون آرایه‌ی CreateProfileForm.tsx/EditProfileForm.tsx — فقط برای نمایش برچسب فارسی */
const GENDER_LABELS: Record<string, string> = {
  mixed: "مختلط",
  male: "مردانه",
  female: "زنانه",
};

export default function ProfileCard({
  profile,
  onEdit,
}: ProfileCardProps) {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6">

        <div>
          <h2 className="text-2xl font-bold">
            اطلاعات آموزشگاه
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            اطلاعات ثبت شده آموزشگاه
          </p>
        </div>

        <button
          onClick={onEdit}
          className="
            rounded-lg
            bg-primary
            px-5
            py-2.5
            font-medium
            text-primary-foreground
            transition
            hover:bg-primary-hover
          "
        >
          ویرایش اطلاعات
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <InfoCard
          title="نام آموزشگاه"
          value={profile.institute_name}
        />

        <InfoCard
          title="شماره موبایل"
          value={profile.mobile_number}
        />

        <InfoCard
          title="تلفن ثابت"
          value={profile.landline_phone}
        />

        <InfoCard
          title="جنسیت آموزشگاه"
          value={
            profile.gender
              ? (GENDER_LABELS[profile.gender] ?? profile.gender)
              : "—"
          }
        />

        <InfoCard
          title="کد پستی"
          value={profile.postal_code}
        />

        <InfoCard
          title="وضعیت"
          value={profile.status}
        />

        <InfoCard
          title="عرض جغرافیایی"
          value={profile.latitude || "—"}
        />

        <InfoCard
          title="طول جغرافیایی"
          value={profile.longitude || "—"}
        />

        <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
          <p className="mb-2 text-sm text-muted-foreground">
            آدرس
          </p>

          <p className="leading-8">
            {profile.address}
          </p>
        </div>

      </div>

    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">

      <p className="mb-2 text-sm text-muted-foreground">
        {title}
      </p>

      <p className="text-lg font-semibold">
        {value}
      </p>

    </div>
  );
}
