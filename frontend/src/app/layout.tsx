// 
// 'use client'
// import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
// import '@styles/app.css';
import '@/lib/fontawesome'; // import trước mọi thứ
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Bắt buộc khi dùng Next.js để tránh lỗi CSS

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
            <div className='container'>
              {children}
            </div>
          </ThemeProvider>
        </body>
    </html>
    </>
  )
}
