import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useStore } from "@/context/StoreContext";

const PAYMENT_OPTIONS = [
  { id: "cod", icon: "💵" },
  { id: "mada", icon: "💳" },
  { id: "apple_pay", icon: "🍎" },
] as const;

const Checkout = () => {
  const { cart, cartTotal, placeOrder, t, lang, isRTL } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cod" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t("nameRequired");
    if (!form.phone.trim()) e.phone = t("phoneRequired");
    if (!form.address.trim()) e.address = t("addressRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (viaWA = false) => {
    if (!validate()) return;
    placeOrder(form, viaWA);
    navigate("/order-success");
  };

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">LUX TIME</p>
          <h1 className="font-display text-5xl font-bold text-gold-gradient">{t("checkoutTitle")}</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="glass-card p-7">
              <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-6 font-semibold">{t("yourInfo")}</p>
              {([
                ["name", t("fullName"), "text"],
                ["phone", t("phone"), "tel"],
                ["address", t("address"), "text"],
              ] as const).map(([field, label, type]) => (
                <div key={field} className="mb-5">
                  <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wider">{label}</label>
                  <input
                    type={type}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => set(field, e.target.value)}
                    placeholder={label}
                    className={`w-full bg-card border px-4 py-3 text-foreground font-body text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 ${
                      errors[field] ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="glass-card p-7">
              <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-6 font-semibold">{t("payMethod")}</p>
              {PAYMENT_OPTIONS.map(({ id, icon }) => (
                <div
                  key={id}
                  onClick={() => set("payment", id)}
                  className={`flex items-center gap-4 p-4 mb-3 border cursor-pointer transition-all ${
                    form.payment === id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="flex-1 font-body text-sm">{t(id)}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      form.payment === id ? "border-primary" : "border-border"
                    }`}
                  >
                    {form.payment === id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="glass-card p-6 h-fit sticky top-24">
            <p className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-5 font-semibold">{t("orderSummary")}</p>
            {cart.map((i) => (
              <div key={i.id} className="flex gap-3 mb-4 items-center">
                <img src={i.image} alt="" className="w-14 h-14 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs truncate mb-1">{lang === "ar" ? i.nameAr : i.nameEn}</p>
                  <p className="text-xs text-muted-foreground">×{i.qty}</p>
                </div>
                <span className="text-xs text-primary flex-shrink-0">{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-border my-5" />
            <div className="flex justify-between items-baseline mb-6">
              <span className="font-display text-xl">{t("total")}</span>
              <span className="font-display text-2xl text-primary">
                {cartTotal.toLocaleString()} <span className="text-sm">{t("sar")}</span>
              </span>
            </div>
            <button
              onClick={() => handleSubmit(false)}
              className="w-full bg-gold-gradient text-primary-foreground font-semibold py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold mb-3 hover:opacity-90 transition-opacity"
            >
              {t("placeOrder")}
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="w-full flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-3 rounded-sm uppercase tracking-wider text-sm hover:bg-primary/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t("orderViaWA")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
