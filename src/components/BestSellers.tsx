import ProductCard from "./ProductCard";
import watch2 from "@/assets/watch-2.jpg";
import watch4 from "@/assets/watch-4.jpg";
import watch6 from "@/assets/watch-6.jpg";
import { motion } from "framer-motion";

const bestSellers = [
  { image: watch2, name: "Skeleton Rose Tourbillon", nameAr: "توربيون سكيلتون وردي", price: "SAR 8,200", limitedStock: true, large: true },
  { image: watch4, name: "Diamond Elegance", nameAr: "أناقة الماس", price: "SAR 12,500", originalPrice: "SAR 15,000", discount: "-17%", limitedStock: true, large: true },
  { image: watch6, name: "Blue Royale Tourbillon", nameAr: "توربيون بلو رويال", price: "SAR 15,000", limitedStock: true, large: true },
];

const BestSellers = () => (
  <section id="featured" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">Top Picks • الأكثر مبيعاً</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">Best Sellers</h2>
        <p className="text-muted-foreground mt-4 text-lg">Our most coveted timepieces</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {bestSellers.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  </section>
);

export default BestSellers;
