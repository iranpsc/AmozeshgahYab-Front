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
    <div className="flex flex-1 items-center">

      <div className="flex flex-col items-center">

        <div
          className={`flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition ${style.circle}`}
        >
          {style.icon}
        </div>

        <span className="mt-3 text-center text-sm font-medium">
          {title}
        </span>

      </div>

      {!last && (
        <div
          className={`mx-3 hidden h-1 flex-1 rounded-full lg:block ${style.line}`}
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

  // Step 1 : ثبت اطلاعات آموزشگاه
  if (profile) {
    steps[0] = "done";
  } else {
    steps[0] = "current";
  }

  // Step 2 : ثبت برند
  if (profile && !branding) {
    steps[1] = "current";
  }

  if (branding) {
    steps[1] = "done";
  }

  // Step 3 : بررسی پروفایل
  if (branding && profile?.status === "pending") {
    steps[2] = "current";
  }

  if (profile?.status === "approved") {
    steps[2] = "done";
  }

  if (profile?.status === "rejected") {
    steps[2] = "rejected";
  }

  // Step 4 : بررسی برند
  if (
    profile?.status === "approved" &&
    branding?.status === "pending"
  ) {
    steps[3] = "current";
  }

  if (branding?.status === "approved") {
    steps[3] = "done";
  }

  if (branding?.status === "rejected") {
    steps[3] = "rejected";
  }

  // Step 5 : تکمیل حساب
  if (
    profile?.status === "approved" &&
    branding?.status === "approved"
  ) {
    steps[4] = "done";
  } else if (
    branding?.status === "approved"
  ) {
    steps[4] = "current";
  }

  return (
    <div className="mx-auto mb-8 rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          مراحل تکمیل آموزشگاه
        </h2>

        <p className="mt-2 text-slate-500">
          وضعیت تکمیل حساب کاربری شما
        </p>

      </div>

      <div className="flex items-start">

        <Step
          title="ثبت آموزشگاه"
          state={steps[0]}
        />

        <Step
          title="ثبت برند"
          state={steps[1]}
        />

        <Step
          title="بررسی آموزشگاه"
          state={steps[2]}
        />

        <Step
          title="بررسی برند"
          state={steps[3]}
        />

        <Step
          title="تکمیل حساب"
          state={steps[4]}
          last
        />

      </div>

    </div>
  );
}