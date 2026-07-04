interface InstituteProfile {
  id: number;
  institute_name: string;
  mobile_number: string;
  landline_phone: string;
  address: string;
  postal_code: string;
  status: string;
}

interface ProfileCardProps {
  profile: InstituteProfile;
  onEdit: () => void;
}

export default function ProfileCard({
  profile,
  onEdit,
}: ProfileCardProps) {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-2xl font-bold">
            اطلاعات آموزشگاه
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            اطلاعات ثبت شده آموزشگاه
          </p>
        </div>

        <button
          onClick={onEdit}
          className="
            rounded-lg
            bg-blue-600
            px-5
            py-2.5
            font-medium
            text-white
            transition
            hover:bg-blue-700
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
          title="کد پستی"
          value={profile.postal_code}
        />

        <InfoCard
          title="وضعیت"
          value={profile.status}
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
          <p className="mb-2 text-sm text-gray-500">
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
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <p className="mb-2 text-sm text-gray-500">
        {title}
      </p>

      <p className="text-lg font-semibold">
        {value}
      </p>

    </div>
  );
}