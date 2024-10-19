import { Providers } from "@/lib/providers";
import "./globals.css";
import { Inter } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PageTransition>
              <main className="flex min-h-screen w-full items-center justify-center">
                {children}
              </main>
            </PageTransition>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
