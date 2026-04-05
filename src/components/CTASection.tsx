import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const CTASection = () => (
  <section className="py-24 bg-secondary/20">
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4">
          Ready to Upgrade Your Style?
        </h2>
        <p className="text-foreground text-lg mb-2">Order your dream watch today</p>
        <p className="text-muted-foreground text-base mb-10" dir="rtl">
          هل أنت مستعد لتطوير أسلوبك؟ اطلب ساعتك الآن
        </p>

        <motion.a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-gold-gradient text-primary-foreground font-bold px-10 py-5 rounded-sm uppercase tracking-widest text-sm shadow-gold hover:shadow-lg transition-shadow"
        >
          <MessageCircle className="w-5 h-5" />
          Order Now via WhatsApp
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
