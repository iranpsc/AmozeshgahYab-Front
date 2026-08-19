import localFont from 'next/font/local';

// فونت آذر مهر با همه وزن‌ها
export const azarMehr = localFont({
  src: [
    { path: './AzarMehr-Light.woff2', weight: '300', style: 'normal' },
    { path: './AzarMehr-Regular.woff2', weight: '400', style: 'normal' },
    { path: './AzarMehr-Medium.woff2', weight: '500', style: 'normal' },
    { path: './AzarMehr-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './AzarMehr-Bold.woff2', weight: '700', style: 'normal' },
    { path: './AzarMehr-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-azarMehr',
  display: 'swap', // متن بدون تأخیر (فوراً با fallback) رندر می‌شه
  // ۶ فایل با هم preload نمی‌شن؛ چون display:swap داریم، preload لازم نیست
  // و فقط داشت با CSS اصلی رقابت می‌کرد. مرورگر با اولویت عادی، وزنی که
  // واقعاً تو صفحه استفاده شده رو خودش fetch می‌کنه.
  preload: false,
  fallback: ['system-ui', 'Tahoma', 'sans-serif'],
});

// فونت رخ (فقط وزن Bold) — یه فایل کوچیکه، preload موندنش هزینه‌ای نداره
export const rokh = localFont({
  src: [
    { path: './Rokh-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-rokh',
  display: 'swap',
});