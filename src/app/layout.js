import "./globals.css";

export const metadata = {
  title: "Шақыру билеті",
  description: "Үйлену тойына шақыру",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
