// 
'use client'
// import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
import '@/styles/app.css';
import '@/lib/fontawesome'; // import trước mọi thứ
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Bắt buộc khi dùng Next.js để tránh lỗi CSS

import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/themeProvider';
import ThemeSwitcher from '@/components/layout/themeSwitcher';
import { getTheme } from '@/components/layout/themeProvider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Header />
            <ThemeSwitcher />
            <div className='container'>
              {children}
            </div>
        </body>
      </ThemeProvider>
    </html>
    </>
  )
}
