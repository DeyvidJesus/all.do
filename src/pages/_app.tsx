import { DarkModeProvider } from '@/context/useDarkMode';
import '../styles/global.css';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  } }: AppProps) {
  return (
    <DarkModeProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </DarkModeProvider>
  )
}
