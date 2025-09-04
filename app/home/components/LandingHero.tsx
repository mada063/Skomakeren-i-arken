export default function LandingHero() {
  return (
    <div id="hero-section" className="min-h-screen relative">
      <div className="w-full min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/skomaker2.jpg')",
            backgroundPosition: "center 70%"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Tekst og knapp plassert nederst */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-8 text-center pb-16">
          <h4 className="text-lg md:text-4xl uppercase text-white px-4">
            Åsane senter, Bygg B
          </h4>
          <div className="w-full h-[0.1rem] bg-white"></div>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-semibold uppercase text-white px-4">
            Skomakeren<br />i Arken
          </h1>
        </div>
      </div>
    </div>
  );
}
