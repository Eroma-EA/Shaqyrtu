import "./globals.css";

import { weddingConfig } from "../data/config";

const siteUrl = "https://shaqyrtu-kappa.vercel.app";
const titleText = `${weddingConfig.groom} & ${weddingConfig.bride} ${weddingConfig.date}`;
const descText = `Құрметті қонақтар! ✨ ${weddingConfig.groom} мен ${weddingConfig.brideGenitive} үйлену тойына арналған шақыруды осы сілтеме арқылы көре аласыздар.`;
const previewImage = "/hero_couple.jpg?v=20260905";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: titleText,
  description: descText,
  openGraph: {
    title: titleText,
    description: descText,
    url: siteUrl,
    type: "website",
    locale: "kk_KZ",
    siteName: "Шақыру билеті",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: `${weddingConfig.groom} & ${weddingConfig.bride}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleText,
    description: descText,
    images: [previewImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
