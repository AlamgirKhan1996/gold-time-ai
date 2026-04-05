import { motion } from "framer-motion";
import { Brain, TrendingUp, Sparkles } from "lucide-react";

const SmartRecommendations = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-light blur-[120px]" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-6">Smart Recommendations</h2>
        <p className="text-foreground text-lg mb-2">
          Our system helps you discover the best watches based on your style and trends
        </p>
        <p className="text-muted-foreground text-base mb-12" dir="rtl">
          نظامنا الذكي يساعدك في اكتشاف أفضل الساعات بناءً على ذوقك والاتجاهات الحالية
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Brain, title: "Style Analysis", titleAr: "تحليل الأسلوب", desc: "AI learns your preferences to suggest perfect matches" },
            { icon: TrendingUp, title: "Trend Tracking", titleAr: "تتبع الاتجاهات", desc: "Stay ahead with trending luxury timepieces" },
            { icon: Sparkles, title: "Personalized Picks", titleAr: "اختيارات مخصصة", desc: "Curated selections just for you" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-sm p-8 hover:border-gold transition-colors"
            >
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm mt-1" dir="rtl">{item.titleAr}</p>
              <p className="text-muted-foreground text-sm mt-3">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SmartRecommendations;
