// 
'use client'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
// import '@styles/app.css';
import Header from '@/components/layout/header';
import { ThemeProvider } from 'next-themes';
import ThemeSwitcher from '@/components/layout/themeSwitcher';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
            <ThemeSwitcher />
            <div className='container dark:bg-black bg-red-500'>
              {children}
            </div>
          </ThemeProvider>
        </body>
    </html>
    </>
  )
}
