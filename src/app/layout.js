import "./globals.css";

import { weddingConfig } from "../data/config";

const titleText = `${weddingConfig.groom} & ${weddingConfig.bride} ${weddingConfig.date}`;
const descText = `Құрметті қонақтар! ✨\n\n${weddingConfig.groom} пен ${weddingConfig.bride}ның үйлену тойына арналған шақыруды мына сілтеме арқылы көре аласыздар 👇`;

export const metadata = {
  title: titleText,
  description: descText,
  openGraph: {
    title: titleText,
    description: descText,
    type: 'website',
    locale: 'kk_KZ',
    siteName: 'Шақыру билеті',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
