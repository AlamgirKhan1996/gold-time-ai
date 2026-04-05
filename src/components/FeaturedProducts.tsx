import ProductCard from "./ProductCard";
import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
import watch4 from "@/assets/watch-4.jpg";
import watch5 from "@/assets/watch-5.jpg";
import watch6 from "@/assets/watch-6.jpg";
import { motion } from "framer-motion";

const products = [
  { image: watch1, name: "Royal Gold Chronograph", nameAr: "كرونوغراف رويال ذهبي", price: "SAR 4,500", originalPrice: "SAR 5,600", discount: "-20%", limitedStock: true },
  { image: watch2, name: "Skeleton Rose Tourbillon", nameAr: "توربيون سكيلتون وردي", price: "SAR 8,200", limitedStock: true },
  { image: watch3, name: "Silver Sport Chronograph", nameAr: "كرونوغراف رياضي فضي", price: "SAR 3,800", originalPrice: "SAR 4,500", discount: "-15%" },
  { image: watch4, name: "Diamond Elegance", nameAr: "أناقة الماس", price: "SAR 12,500", limitedStock: true },
  { image: watch5, name: "Black Ceramic Gold", nameAr: "سيراميك أسود ذهبي", price: "SAR 5,900", originalPrice: "SAR 7,200", discount: "-18%" },
  { image: watch6, name: "Blue Royale Tourbillon", nameAr: "توربيون بلو رويال", price: "SAR 15,000", limitedStock: true },
];

const FeaturedProducts = () => (
  <section id="products" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-3">Our Collection • مجموعتنا</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient">Featured Watches</h2>
        <p className="text-muted-foreground mt-4 text-lg" dir="rtl">ساعات فاخرة مختارة بعناية</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProducts;
