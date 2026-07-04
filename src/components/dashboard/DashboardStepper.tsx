"use client";

import type {
  InstituteBranding,
  InstituteProfile,
} from "@/services/institute";

interface Props {
  profile: InstituteProfile | null;
  branding: InstituteBranding | null;
}

type StepState =
  | "done"
  | "current"
  | "waiting"
  | "rejected";

function Step({
  title,
  state,
  last = false,
}: {
  title: string;
  state: StepState;
  last?: boolean;
}) {
  const colors = {
    done: {
      circle:
        "bg-green-600 border-green-600 text-white",
      line: "bg-green-600",
      icon: "✓",
    },
    current: {
      circle:
        "bg-blue-600 border-blue-600 text-white animate-pulse",
      line: "bg-slate-300",
      icon: "•",
    },
    waiting: {
      circle:
        "bg-white border-slate-300 text-slate-400",
      line: "bg-slate-300",
      icon: "",
    },
    rejected: {
      circle:
        "bg-red-600 border-red-600 text-white",
      line: "bg-slate-300",
      icon: "✕",
    },
  };

  const style = colors[state];

  return (
    <div className="flex flex-1 items-center ">

      <div className="flex flex-col items-center">

        <div
          className={`flex w-10 h-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition ${style.circle}`}
        >
          {style.icon}
        </div>

        <span className="mt-3 text-center text-sm font-medium">
          {title}
        </span>

      </div>

      {!last && (
        <div
          className={`mx-3 hidden lg:block h-1 flex-1 rounded-full ${style.line}`}
        />
      )}
    </div>
  );
}

export default function DashboardStepper({
  profile,
  branding,
}: Props) {
  const steps: StepState[] = [
    "waiting",
    "waiting",
    "waiting",
    "waiting",
    "waiting",
  ];

  // مرحله ۱
  if (profile) {
    steps[0] = "done";
  }

  // مرحله ۲
  if (profile?.status === "pending")
    steps[1] = "current";

  if (profile?.status === "approved")
    steps[1] = "done";

  if (profile?.status === "rejected")
    steps[1] = "rejected";

  // مرحله ۳
  if (
    profile?.status === "approved" &&
    !branding
  ) {
    steps[2] = "current";
  }

  if (branding) {
    steps[2] = "done";
  }

  // مرحله ۴
  if (branding?.status === "pending")
    steps[3] = "current";

  if (branding?.status === "approved")
    steps[3] = "done";

  if (branding?.status === "rejected")
    steps[3] = "rejected";

  // مرحله ۵
  if (branding?.status === "approved")
    steps[4] = "done";

  return (
    <div className="mb-8 rounded-3xl border bg-white p-8 shadow-sm mx-auto">

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          مراحل تکمیل آموزشگاه
        </h2>

        <p className="mt-2 text-slate-500">
          وضعیت فعلی آموزشگاه شما
        </p>

      </div>

      <div className="flex items-start">

        <Step
          title="ثبت اطلاعات"
          state={steps[0]}
        />

        <Step
          title="تایید اطلاعات"
          state={steps[1]}
        />

        <Step
          title="ثبت برند"
          state={steps[2]}
        />

        <Step
          title="تایید برند"
          state={steps[3]}
        />

        <Step
          title="تکمیل"
          state={steps[4]}
          last
        />

      </div>

    </div>
  );
}