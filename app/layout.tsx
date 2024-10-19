import { Providers } from "@/lib/providers";
import "./globals.css";
import { Inter } from "next/font/google";
import PageTransition from "@/components/PageTransition";

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
          <PageTransition>
            <main className="flex min-h-screen w-full items-center justify-center">
              {children}
            </main>
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
