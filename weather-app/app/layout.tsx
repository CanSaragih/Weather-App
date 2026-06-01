import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { WeatherProvider } from "@/contexts/WeatherContext";
import { NavbarDemo } from "@/components/layout/NavbarDemo";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Weatherly - Simple Weather App",
  description:
    "Get real-time weather updates and accurate forecasts for any city around the world with Weatherly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <WeatherProvider>
            <NavbarDemo />
            {children}
            <Toaster position="top-center" duration={3000} />
          </WeatherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
