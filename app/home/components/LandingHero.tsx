export default function LandingHero() {
  return (
    <div
      id="hero-section"
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/skomaker2.jpg')" }}
    >
      <main className="flex flex-col items-center justify-center gap-8 text-center min-h-screen">
        <h1 className="text-7xl font-semibold uppercase text-white">
          Skomakeren<br />i Arken
        </h1>
        <h4 className="text-xl uppercase text-white">Åsane senter, Bygg B</h4>
        <a
          href="https://www.skomakeren.no/"
          className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg inline-block"
        >
          Kontakt oss
        </a>
      </main>
    </div>
  );
}
