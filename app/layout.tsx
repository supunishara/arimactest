import { Providers } from "@/lib/providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen w-full items-center justify-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
