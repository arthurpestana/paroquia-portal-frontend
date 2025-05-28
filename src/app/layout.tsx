import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.scss";
import { ScreenSizeProvider } from "@/context/ScreenSizeContext";

const montserrat = Montserrat({
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
      <body className={`${montserrat.className}`}>
        <ScreenSizeProvider>
          {children}
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
