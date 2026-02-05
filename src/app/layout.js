import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminProvider } from '@/app/context/AdminContext';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "ANS Gaming Tournament - Competitive Gaming Platform",
    description: "Join and compete in exciting esports tournaments",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <AdminProvider>
                        <Navigation />
                            {children}
                    </AdminProvider>
                <Footer />
            </body>
        </html>
    );
}