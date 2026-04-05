import { motion } from "framer-motion";
import { Watch, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-card"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Watch className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-bold text-gold-gradient">LUX TIME</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-body">
          <a href="#products" className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Collection</a>
          <a href="#featured" className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Best Sellers</a>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="bg-gold-gradient text-primary-foreground font-semibold px-6 py-2 rounded-sm uppercase tracking-wider text-xs">
            Order Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border px-6 py-4 space-y-4"
        >
          <a href="#products" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-primary text-sm uppercase tracking-wider">Collection</a>
          <a href="#featured" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-primary text-sm uppercase tracking-wider">Best Sellers</a>
          <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="block bg-gold-gradient text-primary-foreground font-semibold px-6 py-2 rounded-sm uppercase tracking-wider text-xs text-center">
            Order Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
