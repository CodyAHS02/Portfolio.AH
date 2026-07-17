import '../styles/globals.css'

export const metadata = {
  title: 'DevDesk OS',
  description: 'DevDesk OS — a creative developer portfolio.',
}

export const viewport = {
  themeColor: '#f3edd9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f3edd9" />
      </head>
      <body>{children}</body>
    </html>
  )
}
