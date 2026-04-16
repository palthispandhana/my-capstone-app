export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-6">
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Build Smarter Web Apps 🚀
      </h1>

      <p className="text-lg md:text-xl mb-8 max-w-xl">
        Full Stack + AI + Real-Time Features in one platform
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
          Get Started
        </button>

        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition">
          Learn More
        </button>
      </div>

    </section>
  );
}