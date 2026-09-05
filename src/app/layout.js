import "./globals.css";

import { weddingConfig } from "../data/config";

const siteUrl = "https://shaqyrtu-kappa.vercel.app";
const previewImage = `${siteUrl}/wedding-preview-v2.jpg`;
const titleText = `${weddingConfig.groom} & ${weddingConfig.bride} ${weddingConfig.date}`;
const descText = `Құрметті қонақтар! ✨\n\n${weddingConfig.groom} мен ${weddingConfig.brideGenitive} үйлену тойына арналған шақыруды мына сілтеме арқылы көре аласыздар 👇`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: titleText,
  description: descText,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: titleText,
    description: descText,
    url: siteUrl,
    type: "website",
    locale: "kk_KZ",
    siteName: "Шақыру билеті",
    images: [{
      url: previewImage,
      secureUrl: previewImage,
      type: "image/jpeg",
      width: 600,
      height: 804,
      alt: `${weddingConfig.groom} & ${weddingConfig.bride}`,
    }],
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
