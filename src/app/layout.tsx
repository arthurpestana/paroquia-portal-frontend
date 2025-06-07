import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import { ScreenSizeProvider } from "@/context/ScreenSizeContext";
import { ToastContainer } from 'react-toastify';

const space = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paróquia Nossa Senhora do Carmo",
  description: "Exposição de eventos da paróquia",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${space.className}`}>
        <ScreenSizeProvider>
          <ToastContainer/>
          {children}
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
