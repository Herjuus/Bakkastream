import { SessionProvider } from 'next-auth/react';
import getCurrentUser from './actions/getCurrentUser'
import Header from './components/header';
import './globals.css'

export const metadata = {
  title: 'Bakkastream',
  description: 'Streaming platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className=''>
        <Header currentUser={currentUser}/>
        {children}
      </body>
    </html>
  )
}
