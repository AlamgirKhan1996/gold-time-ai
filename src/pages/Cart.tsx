import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useStore } from "@/context/StoreContext";

const Cart = () => {
  const { cart, cartTotal, removeFromCart, updateQty, t, lang, isRTL } = useStore();

  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">LUX TIME</p>
          <h1 className="font-display text-5xl font-bold text-gold-gradient">{t("yourCart")}</h1>
        </motion.div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-muted-foreground text-xl mb-8 font-body">{t("cartEmpty")}</p>
            <Link
              to="/products"
              className="inline-block bg-gold-gradient text-primary-foreground font-semibold px-10 py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold"
            >
              {t("continueShopping")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 flex gap-5 items-center"
                >
                  <img src={item.image} alt="" className="w-24 h-24 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg font-semibold mb-1 truncate">
                      {lang === "ar" ? item.nameAr : item.nameEn}
                    </p>
                    <p className="text-primary font-display text-base mb-3">
                      {item.price.toLocaleString()} {t("sar")}
                    </p>
                    {/* Qty */}
                    <div className="flex items-center border border-border w-fit">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-9 h-9 text-lg hover:bg-secondary transition-colors">−</button>
                      <span className="w-10 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-9 h-9 text-lg hover:bg-secondary transition-colors">+</button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-lg text-primary mb-4">
                      {(item.price * item.qty).toLocaleString()}{" "}
                      <span className="text-sm">{t("sar")}</span>
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/70 transition-colors flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t("remove")}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass-card p-6 h-fit sticky top-24">
              <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-5 font-semibold">{t("orderSummary")}</p>
              {cart.map((i) => (
                <div key={i.id} className="flex justify-between mb-3 text-sm">
                  <span className="text-muted-foreground truncate mr-2">
                    {lang === "ar" ? i.nameAr : i.nameEn} ×{i.qty}
                  </span>
                  <span className="flex-shrink-0">{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border my-5" />
              <div className="flex justify-between items-baseline mb-6">
                <span className="font-display text-xl">{t("total")}</span>
                <span className="font-display text-2xl text-primary">
                  {cartTotal.toLocaleString()} <span className="text-sm">{t("sar")}</span>
                </span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-gold-gradient text-primary-foreground font-semibold py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold mb-3"
              >
                {t("checkout")}
              </Link>
              <Link
                to="/products"
                className="block w-full text-center border border-primary text-primary font-semibold py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-primary/10 transition-colors"
              >
                {t("continueShopping")}
              </Link>
            </div>
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Cart;
