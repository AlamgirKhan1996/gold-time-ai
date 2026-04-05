import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "أحمد", text: "خدمة ممتازة وسرعة في التوصيل 🔥", rating: 5, dir: "rtl" as const },
  { name: "Sarah K.", text: "Amazing quality, highly recommended! The watch exceeded my expectations.", rating: 5, dir: "ltr" as const },
  { name: "محمد العلي", text: "ساعات أصلية وجودة عالية. أنصح الجميع بالتعامل معهم", rating: 5, dir: "rtl" as const },
  { name: "James R.", text: "Fast delivery to Riyadh. The packaging was premium and secure.", rating: 5, dir: "ltr" as const },
  { name: "فاطمة", text: "أفضل متجر ساعات في السعودية! تجربة شراء رائعة 💎", rating: 5, dir: "rtl" as const },
  { name: "David L.", text: "Authentic luxury at great prices. Will definitely buy again!", rating: 5, dir: "ltr" as const },
];

const SocialProof = () => (
  <section className="py-24 bg-secondary/20">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">Reviews • آراء العملاء</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">What Our Customers Say</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-sm p-6"
            dir={r.dir}
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-4 leading-relaxed">"{r.text}"</p>
            <p className="text-primary font-semibold text-sm">— {r.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
