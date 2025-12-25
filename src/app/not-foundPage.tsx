import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-tor from-white via-slate-50 to-slate-100 antialiased">
        <main className="max-w-5xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* Text Section */}
          <section className="w-full md:w-1/2 text-left">
            <p className="text-sm text-slate-500 mb-3">Page Not Found</p>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
              404 — We couldn’t find that page
            </h1>

            

            
          </section>

         

        </main>
      </body>
    </html>
  );
}
