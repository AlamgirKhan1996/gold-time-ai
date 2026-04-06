import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  large?: boolean;
}

const ProductCard = ({ product, large = false }: ProductCardProps) => {
  const { t, lang, addToCart } = useStore();
  const name = lang === "ar" ? product.nameAr : product.nameEn;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-sm overflow-hidden group relative"
    >
      {discount && (
        <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-sm">
          -{discount}%
        </div>
      )}
      {!product.inStock && (
        <div className="absolute inset-0 bg-background/75 z-10 flex items-center justify-center">
          <span className="border border-border text-muted-foreground px-5 py-2 text-xs tracking-widest uppercase">
            {t("outOfStock")}
          </span>
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${large ? "aspect-square" : ""}`}
        />
      </Link>

      <div className="p-5">
        <p className="text-primary text-[10px] uppercase tracking-[3px] font-semibold mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-display font-semibold text-foreground hover:text-primary transition-colors ${large ? "text-xl" : "text-lg"} mb-3`}>
            {name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-display text-primary font-bold text-lg">
            {product.price.toLocaleString()} {t("sar")}
          </span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: product.inStock ? 1.02 : 1 }}
            whileTap={{ scale: product.inStock ? 0.98 : 1 }}
            disabled={!product.inStock}
            onClick={() => product.inStock && addToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-gold-gradient text-primary-foreground font-semibold py-3 rounded-sm uppercase tracking-wider text-xs transition-shadow shadow-gold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {t("addCart")}
          </motion.button>
          <Link
            to={`/product/${product.id}`}
            className="border border-primary text-primary px-3 py-3 rounded-sm text-xs uppercase tracking-wider hover:bg-primary/10 transition-colors font-semibold whitespace-nowrap flex items-center"
          >
            ···
          </Link>
        </div>

        <p className="text-destructive text-xs mt-2 font-medium">
          {product.inStock ? "Only few pieces left! • !بقي قطع قليلة" : ""}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
