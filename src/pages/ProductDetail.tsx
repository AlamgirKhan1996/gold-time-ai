import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useStore } from "@/context/StoreContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, t, lang, isRTL, addToCart, settings } = useStore();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/products" className="text-primary underline">{t("back")}</Link>
        </div>
      </div>
    );
  }

  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const desc = lang === "ar" ? product.descriptionAr : product.descriptionEn;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = lang === "ar"
      ? `مرحباً، أريد الاستفسار عن: *${product.nameAr}*\nالسعر: ${product.price.toLocaleString()} ${t("sar")}\nالكمية: ${qty}`
      : `Hello, I'm interested in: *${product.nameEn}*\nPrice: ${product.price.toLocaleString()} ${t("sar")}\nQty: ${qty}`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-10 font-body"
        >
          {isRTL() ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {t("back")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card overflow-hidden h-[480px] mb-4"
            >
              <img
                src={product.images[activeImg]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                      i === activeImg ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-primary text-[10px] uppercase tracking-[4px] mb-3 font-semibold">{product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">{name}</h1>

            <div className="flex items-baseline gap-5 mb-8">
              <span className="font-display text-4xl text-primary font-bold">
                {product.price.toLocaleString()}{" "}
                <span className="text-xl">{t("sar")}</span>
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-xl">
                  {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8 text-base">{desc}</p>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-3 font-semibold">{t("qty")}</p>
              <div className="flex items-center border border-border w-fit">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 text-xl hover:bg-secondary transition-colors">−</button>
                <span className="w-12 text-center text-base font-body">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 text-xl hover:bg-secondary transition-colors">+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-10">
              <motion.button
                whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 bg-gold-gradient text-primary-foreground font-semibold py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? (added && "✓ Added!") : (product.inStock ? t("addCart") : t("outOfStock"))}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 border border-primary text-primary font-semibold py-4 rounded-sm uppercase tracking-widest text-sm hover:bg-primary/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t("orderWA")}
              </motion.button>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-8">
              <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-4 font-semibold">{t("specifications")}</p>
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-border/40 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
