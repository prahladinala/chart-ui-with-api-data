import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const circularStd = localFont({
  src: "./fonts/CircularStd.ttf",
  variable: "--font-circular-std",
});

export const metadata = {
  title: "Catalog Frontend Developer",
  description: "Catalog Frontend Developer Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${circularStd.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
