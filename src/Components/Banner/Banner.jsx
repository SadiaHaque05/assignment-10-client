import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const artworks = [
    {
      id: 1,
      name: "Starry Night",
      artist: "Vincent van Gogh",
      year: 1889,
      category: "Post-Impressionism",
      medium: "Oil on Canvas",
      description:
        "A mesmerizing masterpiece by Vincent van Gogh, capturing the swirling beauty of a starlit sky over a quiet town. Known for its emotional depth, bold colors, and dynamic brushwork that reflect Van Gogh's inner turmoil and passion.",
      image: "https://i.ibb.co.com/nqxznm2B/starry-night.jpg",
    },
    {
      id: 2,
      name: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: 1931,
      category: "Surrealism",
      medium: "Oil on Canvas",
      description:
        "Salvador Dalí’s surreal painting depicting melting clocks in a dreamlike landscape. This work explores the fluidity of time and the subconscious, challenging conventional perceptions of reality and logic.",
      image: "https://i.ibb.co.com/ZpjZFFBB/memory.jpg",
    },
    {
      id: 3,
      name: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: 1503,
      category: "Renaissance",
      medium: "Oil on Poplar Panel",
      description:
        "Leonardo da Vinci’s iconic portrait of a woman with an enigmatic smile. Celebrated for its exquisite detail, atmospheric sfumato technique, and timeless mystery that continues to intrigue viewers worldwide.",
      image: "https://i.ibb.co.com/Y74v1cMb/monalisa.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-5">
      <div className="carousel w-full py-5">
        {artworks.map((artwork) => (
          <motion.div
            key={artwork.id}
            className="carousel-item w-full flex flex-col lg:flex-row items-center bg-gray-900 rounded-xl overflow-hidden mx-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: artwork.id * 0.2 }}
          >
            {/* Left: Art Image */}
            <div className="flex justify-center items-center p-4 lg:p-6">
              <motion.img
                src={artwork.image}
                alt={artwork.name}
                className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120 }}
              />
            </div>

            {/* Right: Artwork Info */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center text-center lg:text-left">
              <motion.h2
                className="text-5xl font-extrabold mb-2 text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Typewriter
                  words={[artwork.name]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                  typeSpeed={80}
                  deleteSpeed={60}
                />
              </motion.h2>

              <motion.p
                className="text-gray-300 mb-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="font-semibold text-accent">Artist:</span>{" "}
                {artwork.artist} |{" "}
                <span className="font-semibold text-accent">Year:</span>{" "}
                {artwork.year}
              </motion.p>

              <motion.p
                className="text-gray-300 mb-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <span className="font-semibold text-accent">Category:</span>{" "}
                {artwork.category} |{" "}
                <span className="font-semibold text-accent">Medium:</span>{" "}
                {artwork.medium}
              </motion.p>

              <motion.p
                className="text-lg text-gray-300"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                {artwork.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
