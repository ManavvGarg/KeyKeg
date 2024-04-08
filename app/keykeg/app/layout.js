import { Raleway } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/authProvider";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "KeyKeg - Password Wizard",
  description:
    "KeyKeg - Password Wizard is an application that securely stores passwords, generates strong and unique passwords, and utilizes artificial intelligence to analyze and classify the strength of user-provided passwords.",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={raleway.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
