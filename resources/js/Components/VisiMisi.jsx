import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    // SLIDE 1
    src: "/images/slideshow.jpeg", 
    alt: "Slide 1: Akreditasi Institusi Unggul",
  },
  {
    // SLIDE 2
    src: "/images/slideshow2.jpeg", 
    alt: "Slide 2: Informasi Baru",
  },
  {
    // SLIDE 3
    src: "/images/slideshow3.jpeg",
    alt: "Slide 3: Acara Kampus",
  },
];

export default function VisiMisi() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {

      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-[#2BB673] via-[#A6E6C6] to-white py-20 px-6 lg:px-12 text-gray-900 overflow-hidden">
      
      <div className="mx-auto max-w-7xl"> 

          <div className="relative w-full mx-auto pb-[42.85%] mb-20 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={slides[current].src}
                  src={slides[current].src}
                  alt={slides[current].alt}
                  className="absolute inset-0 w-full h-full object-cover" 
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2 }}
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      i === current ? "bg-[#006241]" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
          </div>

          {/* VISI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="shadow-lg p-16 mb-16 w-full mx-auto text-white 
                       rounded-tr-[50px] rounded-br-[50px] rounded-bl-[50px] rounded-tl-none"
            style={{
              background: "linear-gradient(135deg, #004D2C 65%, #118C54 85%, #1DAE63 100%)",
            }}
          >
            <h3 className="text-4xl font-extrabold mb-6 text-white drop-shadow-md">
              Visi
            </h3>
            <p className="text-2xl leading-relaxed text-gray-100">
              “Mewujudkan perguruan tinggi Islam yang terpandang, berwibawa, bermutu tinggi,
              dan mampu bersaing dalam forum nasional maupun internasional.”
            </p>
          </motion.div>

          {/* MISI */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative shadow-lg p-16 w-full mx-auto text-white
                       rounded-tl-[50px] rounded-br-[50px] rounded-bl-[50px] rounded-tr-none"
            style={{
              background: "linear-gradient(315deg, #004D2C 65%, #118C54 85%, #1DAE63 100%)",
            }}
          >
            <h3 className="absolute top-10 right-10 text-4xl font-extrabold mb-6 text-right drop-shadow-md">
              Misi
            </h3>

            <ol className="list-decimal list-inside space-y-6 text-2xl leading-relaxed text-gray-100 mt-24">
              <li>
                Mengembangkan ilmu pengetahuan, teknologi, dan seni melalui pendidikan,
                pengajaran, dan pembelajaran yang unggul dan bermutu tinggi sesuai Islam.
              </li>
              <li>
                Mengembangkan ilmu pengetahuan, teknologi, dan seni melalui pengkajian,
                penelitian, dan publikasi yang unggul dan bermutu tinggi sesuai Islam.
              </li>
              <li>
                Mengembangkan ilmu pengetahuan, teknologi, dan seni yang dapat menjawab
                tantangan masyarakat dunia yang unggul dan bermutu tinggi sesuai Islam.
              </li>
              <li>
                Mengembangkan sumber daya manusia dan tata kelola yang menjawab persoalan
                masyarakat serta memberi arah perubahan dalam rangka membangun masyarakat
                Indonesia yang adil, makmur, dan beradab sesuai Islam.
              </li>
            </ol>
          </motion.div>
      </div>
    </section>
  );
}