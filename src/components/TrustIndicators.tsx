import { motion } from "framer-motion";
import { ShieldCheck, Truck, CreditCard, ThumbsUp } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, title: "100% Authentic", titleAr: "أصلية ١٠٠٪", desc: "Certified genuine watches" },
  { icon: Truck, title: "Fast Delivery", titleAr: "توصيل سريع", desc: "Across Saudi Arabia" },
  { icon: CreditCard, title: "Secure Payment", titleAr: "دفع آمن", desc: "Multiple payment options" },
  { icon: ThumbsUp, title: "Satisfaction", titleAr: "رضا العملاء", desc: "Guaranteed quality" },
];

const TrustIndicators = () => (
  <section className="py-16 border-y border-border bg-secondary/30">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {indicators.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-foreground font-semibold">{item.title}</h3>
            <p className="text-muted-foreground text-sm mt-1" dir="rtl">{item.titleAr}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
