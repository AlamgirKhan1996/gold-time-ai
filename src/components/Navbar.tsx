import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "@/context/StoreContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, lang, toggleLang, cartCount, isAdmin, settings, isRTL } = useStore();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("home") },
    { to: "/products", label: t("collection") },
  ];

  const storeName = lang === "ar" ? settings.storeNameAr : settings.storeName;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-card"
      dir={isRTL() ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-gold-gradient tracking-widest">
          {storeName}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 font-body">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm uppercase tracking-wider transition-colors ${
                location.pathname === to
                  ? "text-primary border-b border-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Lang Toggle */}
          <button
            onClick={toggleLang}
            className="text-xs border border-border text-muted-foreground px-3 py-1 hover:border-primary hover:text-primary transition-colors tracking-widest"
          >
            {lang === "ar" ? "EN" : "عر"}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-gradient text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Admin */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="bg-gold-gradient text-primary-foreground font-semibold px-5 py-2 uppercase tracking-wider text-xs hover:opacity-90 transition-opacity"
            >
              {t("dashboard")}
            </Link>
          ) : (
            <Link
              to="/admin-login"
              className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider"
            >
              {t("admin")}
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-gradient text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border px-6 py-4 space-y-4"
        >
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-primary text-sm uppercase tracking-wider">
              {label}
            </Link>
          ))}
          <button onClick={() => { toggleLang(); setOpen(false); }} className="block text-xs border border-border text-muted-foreground px-3 py-1 tracking-widest hover:border-primary">
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          {isAdmin ? (
            <Link to="/admin" onClick={() => setOpen(false)} className="block bg-gold-gradient text-primary-foreground font-semibold px-5 py-2 uppercase tracking-wider text-xs text-center">
              {t("dashboard")}
            </Link>
          ) : (
            <Link to="/admin-login" onClick={() => setOpen(false)} className="block text-xs text-muted-foreground tracking-wider">
              {t("admin")}
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
