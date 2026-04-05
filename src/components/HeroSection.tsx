import { motion } from "framer-motion";
import heroImg from "@/assets/hero-watch.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury gold watch" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-body uppercase tracking-[0.3em] text-sm mb-6"
          >
            Premium Collection 2025
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Elevate Your Style with{" "}
            <span className="text-gold-gradient">Luxury Watches</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-4 max-w-lg font-body">
            Discover premium watches for men & women — timeless design, unmatched quality
          </p>
          <p className="text-muted-foreground text-base mb-10 max-w-lg font-body" dir="rtl">
            اكتشف ساعات فاخرة للرجال والنساء — تصميم خالد وجودة لا مثيل لها
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold-gradient text-primary-foreground font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-sm transition-shadow shadow-gold hover:shadow-lg"
            >
              Shop Now
            </motion.a>
            <motion.a
              href="#featured"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gold text-primary font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-sm hover:bg-primary/10 transition-colors"
            >
              Browse Collection
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
