import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 text-center space-y-8 p-6">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-white">
          Siddharth
        </h1>

        <div className="text-lg md:text-xl uppercase tracking-[0.2em] text-gray-300 space-y-2 font-light">
          <p>Architecture</p>
          <p>Urban Planning</p>
          <p>Sustainable Design</p>
        </div>

        <p className="text-sm md:text-base uppercase tracking-widest text-gray-400 pt-4">
          India / Sweden
        </p>

        <div className="pt-12">
          <Link
            href="/all-projects"
            className="inline-block px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300"
          >
            Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
