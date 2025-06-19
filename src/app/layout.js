import { Fascinate, Fredoka } from "next/font/google";
import "./globals.css";

const fascinate = Fascinate({
  variable: "--font-t",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const fredoka = Fredoka({
  variable: "--font-b",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
});

export const metadata = {
  title: "BlueView",
  description: "View the greatest Blue arts!",
  openGraph: {
    title: "Get a BlueView.",
    description:
      "BlueView has a tailored selection of blue images for your utmost enjoyment.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-bg text-txt font-b ${fascinate.variable} ${fredoka.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
