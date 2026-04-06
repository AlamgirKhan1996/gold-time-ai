import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustIndicators from "@/components/TrustIndicators";
import WhyChooseUs from "@/components/WhyChooseUs";
import SocialProof from "@/components/SocialProof";
import SmartRecommendations from "@/components/SmartRecommendations";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import heroImg from "@/assets/hero-watch.jpg";

const Index = () => {
  const { t, products, settings, isRTL, lang } = useStore();
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury gold watch" className="w-full h-full object-cover" />
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
              ✦ {t("heroTag")} ✦
            </motion.p>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              {t("heroTitle").split(" ").slice(0, 1).join(" ")}{" "}
              <span className="text-gold-gradient">{t("heroTitle").split(" ").slice(1).join(" ")}</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-4 max-w-lg font-body">
              {t("heroSub")}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold hover:shadow-lg transition-shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t("shopNow")}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gold text-primary font-semibold px-8 py-4 rounded-sm uppercase tracking-widest text-sm hover:bg-primary/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("orderWA")}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustIndicators />

      {/* ── CATEGORIES ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">{lang === "ar" ? "الفئات" : "Categories"}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">{t("categories")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(["luxury", "sport", "classic"] as const).map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/products?cat=${cat}`}
                  className="glass-card rounded-sm p-10 text-center hover:border-gold transition-colors group block"
                >
                  <div className="text-5xl mb-5">{cat === "luxury" ? "💎" : cat === "sport" ? "🏆" : "⌚"}</div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{t(cat)}</h3>
                  <p className="text-muted-foreground text-sm">
                    {products.filter((p) => p.category === cat).length}{" "}
                    {lang === "ar" ? "قطعة" : "pieces"}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-14 flex-wrap gap-4"
          >
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">
                {lang === "ar" ? "مجموعتنا المميزة" : "Our Featured"}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">{t("featured")}</h2>
            </div>
            <Link
              to="/products"
              className="border border-gold text-primary font-semibold px-6 py-2 rounded-sm uppercase tracking-wider text-sm hover:bg-primary/10 transition-colors"
            >
              {t("viewAll")}
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} large />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <SocialProof />
      <SmartRecommendations />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
