// Import necessary modules and components here
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import ReactQueryProvider from "@/components/reactQueryProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Skills Vibe",
  description: "Sell your Skills",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>{/* Move import statements and CSS-in-JS here */}</head>
    <body className={inter.className}>
      <NextTopLoader color="#ff0000" />
      <ReduxProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ReduxProvider>
    </body>
  </html>
);

export default RootLayout;
