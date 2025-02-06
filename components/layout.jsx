'use client';

import { SessionProvider } from 'next-auth/react'
// import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Layout({ children }) {

    return (
        <SessionProvider>
            {/* <Toaster /> */}
            {/* <NextThemesProvider defaultTheme={'dark'} attribute={'class'}> */}
            {/* <Header /> */}
            {children}
            {/* </NextThemesProvider> */}
        </SessionProvider>
    )
}
