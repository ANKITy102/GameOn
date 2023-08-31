import "./globals.css";
import type { Metadata, ResolvingMetadata } from "next";
import Header from "@/components/Header/Header";
import { Montserrat, Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { Providers } from "@/redux/Providers";
import Cart from "@/components/Cart/Cart";
import Toast from "@/components/Toast/Toast";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-montserrat",
});
export const metadata: Metadata = {
  title: "GameOn - Welcome to GameOn. Try our latest games.",
  description: "GameOn is platform where you can purchase your favourite video games.",
  metadataBase: new URL('https://gameon-ten.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '../../public/images/mainpage.png',
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Toast/>
        <Providers>
          <NextAuthProvider>
						<Cart />
						<Header />
						<main className='bg-primary-gradient min-h-screen'>{children}</main>
						<Footer />
					</NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
