import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { Header } from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tutorelli",
  description: "AI powered tutoring platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-blue overflow-auto"}>
        <ThemeProvider
          enableColorScheme
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AuthProvider>
            <Header />
            <NextTopLoader />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
