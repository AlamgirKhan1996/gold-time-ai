import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { useStore } from "@/context/StoreContext";

const CATS = ["all", "luxury", "sport", "classic"] as const;

const Products = () => {
  const { t, products, isRTL } = useStore();
  const [searchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState<string>(searchParams.get("cat") || "all");

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) setActiveCat(cat);
  }, [searchParams]);

  const filtered = activeCat === "all" ? products : products.filter((p) => p.category === activeCat);

  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">LUX TIME</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gold-gradient mb-8">{t("collection")}</h1>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${
                  activeCat === cat
                    ? "bg-gold-gradient text-primary-foreground border-transparent"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                {t(cat === "all" ? "allCat" : cat)}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
