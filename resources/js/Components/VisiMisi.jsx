/**
 * Komponen VisiMisi
 * Menampilkan visi dan misi institusi dengan animasi scroll-reveal menggunakan Framer Motion
 * dan desain kartu gradien kustom.
 */
import React from "react";
import { motion } from "framer-motion";

export default function VisiMisi() {
  return (
    <section className="w-full bg-gradient-to-b from-[#2BB673] via-[#A6E6C6] to-white py-12 md:py-20 text-gray-900 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        
        {/* VISI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="shadow-xl p-8 md:p-12 lg:p-16 mb-8 md:mb-12 w-full mx-auto text-white rounded-tr-[40px] md:rounded-tr-[80px] rounded-bl-[40px] md:rounded-bl-[80px] rounded-br-[10px] rounded-tl-none border-l-8 border-[#1DAE63]"
          style={{
            background: "linear-gradient(135deg, #004D2C 65%, #118C54 85%, #1DAE63 100%)",
          }}
        >
          <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-white drop-shadow-md font-kaisei">
            Visi
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100 italic font-sans">
            “Mewujudkan perguruan tinggi Islam yang terpandang, berwibawa, bermutu
            tinggi, dan mampu bersaing dalam forum nasional maupun internasional.”
          </p>
        </motion.div>

        {/* MISI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative shadow-xl p-8 md:p-12 lg:p-16 w-full mx-auto text-white rounded-tl-[40px] md:rounded-tl-[80px] rounded-br-[40px] md:rounded-br-[80px] rounded-bl-[10px] rounded-tr-none border-r-8 border-[#1DAE63]"
          style={{
            background: "linear-gradient(315deg, #004D2C 65%, #118C54 85%, #1DAE63 100%)",
          }}
        >
          {/* Judul Misi */}
          <h3 className="md:absolute md:top-12 md:right-12 text-3xl md:text-4xl font-black mb-6 md:mb-0 text-left md:text-right drop-shadow-md font-kaisei">
            Misi
          </h3>

          <ol className="list-decimal list-outside ml-5 md:ml-0 space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl leading-relaxed text-gray-100 md:mt-16 lg:mt-20 font-sans">
            <li className="pl-2">
              Mengembangkan ilmu pengetahuan, teknologi, dan seni melalui
              pendidikan, pengajaran, dan pembelajaran yang unggul dan bermutu
              tinggi sesuai Islam.
            </li>
            <li>
              Mengembangkan ilmu pengetahuan, teknologi, dan seni melalui
              pengkajian, penelitian, dan publikasi yang unggul dan bermutu
              tinggi sesuai Islam.
            </li>
            <li>
              Mengembangkan ilmu pengetahuan, teknologi, dan seni yang dapat
              menjawab tantangan masyarakat dunia yang unggul dan bermutu tinggi
              sesuai Islam.
            </li>
            <li>
              Mengembangkan sumber daya manusia dan tata kelola yang menjawab
              persoalan masyarakat serta memberi arah perubahan dalam rangka
              membangun masyarakat Indonesia yang adil, makmur, dan beradab
              sesuai Islam.
            </li>
          </ol>
        </motion.div>

      </div>
    </section>
  );
}