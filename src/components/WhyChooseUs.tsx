import { motion } from "framer-motion";
import { Gem, BadgeDollarSign, Zap, Headphones } from "lucide-react";

const reasons = [
  { icon: Gem, title: "Premium Quality", titleAr: "جودة فاخرة", desc: "Only the finest materials and craftsmanship in every timepiece." },
  { icon: BadgeDollarSign, title: "Best Prices", titleAr: "أفضل الأسعار", desc: "Competitive pricing with exclusive deals you won't find elsewhere." },
  { icon: Zap, title: "Fast Shipping", titleAr: "شحن سريع", desc: "Express delivery across all cities in Saudi Arabia." },
  { icon: Headphones, title: "24/7 Support", titleAr: "دعم متواصل", desc: "Dedicated customer service via WhatsApp anytime." },
];

const WhyChooseUs = () => (
  <section className="py-24 bg-secondary/20">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">Why Us • لماذا نحن</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">Why Choose Us</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-sm p-8 text-center hover:border-gold transition-colors group"
          >
            <div className="w-16 h-16 rounded-full bg-gold-gradient mx-auto mb-5 flex items-center justify-center group-hover:shadow-gold transition-shadow">
              <r.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">{r.title}</h3>
            <p className="text-muted-foreground text-sm mt-1 mb-3" dir="rtl">{r.titleAr}</p>
            <p className="text-muted-foreground text-sm">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
