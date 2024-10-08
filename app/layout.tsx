import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RPG Habit Tracker',
  description: 'Level up your life with habit tracking!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground shadow-md">
              <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">RPG Habit Tracker</Link>
                <div className="flex items-center space-x-6">
                  <Link href="/habits" className="hover:underline">Habits</Link>
                  <Link href="/skills" className="hover:underline">Skills</Link>
                  <Link href="/attributes" className="hover:underline">Attributes</Link>
                  <Link href="/profile" className="hover:underline">Profile</Link>
                  <Link href="/todays-adventure" className="hover:underline">Today's Adventure</Link>
                  <ModeToggle />
                </div>
              </nav>
            </header>
            <main className="flex-grow bg-background">
              {children}
            </main>
            <footer className="bg-secondary text-secondary-foreground py-4">
              <div className="container mx-auto px-4 text-center">
                © 2023 RPG Habit Tracker. Level up your life!
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}