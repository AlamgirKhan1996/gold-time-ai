import { motion } from "framer-motion";

interface ProductCardProps {
  image: string;
  name: string;
  nameAr: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  limitedStock?: boolean;
  large?: boolean;
}

const ProductCard = ({ image, name, nameAr, price, originalPrice, discount, limitedStock, large }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className={`glass-card rounded-sm overflow-hidden group relative ${large ? "col-span-1" : ""}`}
  >
    {discount && (
      <div className="absolute top-3 left-3 z-10 bg-gold-gradient text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm">
        {discount}
      </div>
    )}
    {limitedStock && (
      <div className="absolute top-3 right-3 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-sm animate-pulse-gold">
        Limited Stock!
      </div>
    )}

    <div className="overflow-hidden aspect-square">
      <img
        src={image}
        alt={name}
        loading="lazy"
        width={800}
        height={800}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <div className="p-5">
      <h3 className={`font-display font-semibold text-foreground ${large ? "text-xl" : "text-lg"}`}>{name}</h3>
      <p className="text-muted-foreground text-sm mt-1" dir="rtl">{nameAr}</p>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-primary font-bold text-lg">{price}</span>
        {originalPrice && (
          <span className="text-muted-foreground line-through text-sm">{originalPrice}</span>
        )}
      </div>
      <p className="text-destructive text-xs mt-1 font-medium">Only few pieces left! • !بقي قطع قليلة فقط</p>
      <motion.a
        href="https://wa.me/966500000000"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 block text-center bg-gold-gradient text-primary-foreground font-semibold py-3 rounded-sm uppercase tracking-wider text-sm transition-shadow shadow-gold"
      >
        Buy Now • اشترِ الآن
      </motion.a>
    </div>
  </motion.div>
);

export default ProductCard;
