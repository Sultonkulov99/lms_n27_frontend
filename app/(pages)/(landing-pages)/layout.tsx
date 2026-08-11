import Footer from "../../components/landing/home/Footer";
import Navbar from "../../components/landing/home/Navbar";


export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white text-slate-900 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
