import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "نماد اعتماد الکترونیکی",
  description: "مشاهده و بررسی نماد اعتماد الکترونیکی آموزشگاه یاب.",
};

export default function EnamadPage() {
  return (
    <main className="min-h-screen px-5 py-10 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-foreground lg:text-4xl">
            نماد اعتماد الکترونیکی
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground lg:text-base">
            برای مشاهده و بررسی اعتبار نماد اعتماد الکترونیکی آموزشگاه یاب، روی نماد زیر کلیک کنید.
          </p>
        </div>

        <section className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 lg:p-10">
          <div className="flex flex-col items-center">
            <div
              dangerouslySetInnerHTML={{
                __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=754796&Code=7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj' alt='' style='cursor:pointer' code='7TnLHQ7fELIsmQDvWjxzsPjzf4rCXYXj'></a>`,
              }}
            />
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
