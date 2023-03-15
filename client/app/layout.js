import './globals.css'

export const metadata = {
  title: 'BakkaStream',
  description: 'Streaming platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
