import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { profile } from "@/content/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const title = `${profile.fullName} | ${profile.titles[0]}`;

export const metadata: Metadata = {
  title,
  description: profile.tagline,
  openGraph: { title, description: profile.tagline, type: "website" },
  twitter: { card: "summary_large_image", title, description: profile.tagline },
};

export const viewport: Viewport = {
  themeColor: "#0f2620",
};

// Runs before first paint: applies the saved theme and marks that JS is available,
// which is what allows content to start hidden for the scroll reveal. If the page's
// scripts haven't started after 4s (say, a failed download), the hidden state is
// dropped so visitors still get all the content.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}d.setAttribute("data-fx","");setTimeout(function(){if(!d.dataset.fxReady)d.removeAttribute("data-fx")},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
