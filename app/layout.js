import './globals.css';

export const metadata = {
  title: 'AIJobRadar — How close are you to being replaced?',
  description: 'Get your personal AI Displacement Risk Score. Scored across 5 dimensions, benchmarked against your peers.',
  openGraph: {
    title: 'AIJobRadar — How close are you to being replaced?',
    description: 'Get your personal AI Displacement Risk Score in 2 minutes.',
    url: 'https://aijobradar.app',
    siteName: 'AIJobRadar',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
