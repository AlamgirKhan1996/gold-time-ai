// ─────────────────────────────────────────────
// src/pages/OrderSuccess.tsx
// ─────────────────────────────────────────────
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useStore } from "@/context/StoreContext";

export const OrderSuccess = () => {
  const { lastOrder, t, isRTL } = useStore();
  return (
    <div className="min-h-screen bg-background" dir={isRTL() ? "rtl" : "ltr"}>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-5xl font-bold text-gold-gradient mb-4">{t("orderPlaced")}</h1>
          <p className="text-muted-foreground text-lg mb-3 font-body">{t("thankYou")}</p>
          {lastOrder && (
            <p className="text-muted-foreground text-sm mb-10">
              {t("orderId")}:{" "}
              <strong className="text-foreground font-semibold">{lastOrder.id}</strong>
            </p>
          )}
          <Link
            to="/"
            className="inline-block bg-gold-gradient text-primary-foreground font-semibold px-12 py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold"
          >
            {t("backHome")}
          </Link>
        </motion.div>
      </div>
      <WhatsAppButton />
    </div>
  );
};

// ─────────────────────────────────────────────
// src/pages/AdminLogin.tsx
// ─────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const { loginAdmin, t, isRTL, settings, lang } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (loginAdmin(email, pw)) { navigate("/admin"); }
    else setErr(t("invalidCreds"));
  };

  const storeName = lang === "ar" ? settings.storeNameAr : settings.storeName;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6" dir={isRTL() ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-bold text-gold-gradient tracking-widest mb-2">{storeName}</div>
          <p className="text-muted-foreground text-sm tracking-wider">{t("adminLogin")}</p>
        </div>
        <div className="mb-4">
          <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("email")}</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@luxtime.sa"
            className="w-full bg-card border border-border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors font-body"
          />
        </div>
        <div className="mb-6">
          <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("password")}</label>
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-card border border-border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors font-body"
          />
        </div>
        {err && <p className="text-destructive text-xs text-center mb-4">{err}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-gold-gradient text-primary-foreground font-semibold py-4 rounded-sm uppercase tracking-widest text-sm shadow-gold hover:opacity-90 transition-opacity"
        >
          {t("login")}
        </button>
        <p className="text-muted-foreground/50 text-xs text-center mt-4">{t("demoHint")}</p>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// src/pages/Admin.tsx
// ─────────────────────────────────────────────
import { useEffect } from "react";
import { Order } from "@/types";

const STATUS_COLORS: Record<string, [string, string]> = {
  pending: ["#F59E0B", "rgba(245,158,11,.1)"],
  processing: ["#3B82F6", "rgba(59,130,246,.1)"],
  completed: ["#10B981", "rgba(16,185,129,.1)"],
  cancelled: ["#EF4444", "rgba(239,68,68,.1)"],
  whatsapp: ["#25D366", "rgba(37,211,102,.1)"],
};

const StatusBadge = ({ status }: { status: string }) => {
  const [col, bg] = STATUS_COLORS[status] || ["#777", "rgba(120,120,120,.1)"];
  const { t } = useStore();
  const label = { pending: t("pending"), processing: t("processing"), completed: t("completed"), cancelled: t("cancelled"), whatsapp: "WhatsApp" }[status] || status;
  return (
    <span className="px-2.5 py-1 text-xs font-bold tracking-wide" style={{ color: col, background: bg, border: `1px solid ${col}30` }}>
      {label}
    </span>
  );
};

export const Admin = () => {
  const { orders, updateOrderStatus, isAdmin, settings, t, lang, isRTL, logoutAdmin, updateSettings } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"dashboard" | "orders" | "settings">("dashboard");
  const [sForm, setSForm] = useState(settings);

  useEffect(() => { if (!isAdmin) navigate("/admin-login"); }, [isAdmin]);

  const total = orders.reduce((s, o) => s + o.total, 0);
  const pend = orders.filter((o) => o.status === "pending").length;
  const comp = orders.filter((o) => o.status === "completed").length;
  const proc = orders.filter((o) => o.status === "processing").length;

  const storeName = lang === "ar" ? settings.storeNameAr : settings.storeName;

  const TABS = [
    { id: "dashboard", icon: "▦", label: t("dashboard") },
    { id: "orders", icon: "◫", label: t("orders") },
    { id: "settings", icon: "◎", label: t("settings") },
  ] as const;

  const handleSaveSettings = () => {
    updateSettings(sForm);
    alert(t("settingsSaved"));
  };

  const OrdersTable = ({ data }: { data: Order[] }) => (
    <div className="glass-card overflow-x-auto">
      <table className="w-full border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-border">
            {["ID", t("customer"), t("amount"), t("status"), t("actions")].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-muted-foreground text-xs font-semibold uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id} className="border-b border-border/30 hover:bg-primary/3 transition-colors">
              <td className="px-5 py-4 text-primary text-xs font-mono">{o.id}</td>
              <td className="px-5 py-4">
                <div className="text-sm font-medium">{o.customer}</div>
                <div className="text-xs text-muted-foreground">{o.date} · {o.phone}</div>
              </td>
              <td className="px-5 py-4 font-display text-primary text-base">
                {o.total.toLocaleString()} <span className="text-xs font-body">{t("sar")}</span>
              </td>
              <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
              <td className="px-5 py-4">
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])}
                  className="bg-card border border-border text-foreground text-xs px-3 py-2 outline-none focus:border-primary cursor-pointer"
                >
                  {["pending", "processing", "completed", "cancelled"].map((s) => (
                    <option key={s} value={s}>{t(s)}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex" dir={isRTL() ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border fixed top-0 bottom-0 flex flex-col z-20">
        <div className="p-5 border-b border-border">
          <div className="font-display text-lg font-bold text-gold-gradient tracking-widest mb-1">{storeName}</div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="flex-1 py-3">
          {TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 w-full px-5 py-3 text-sm transition-all text-left border-l-3 ${
                tab === id
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary border-l-4 border-transparent"
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border py-3">
          <button onClick={() => { logoutAdmin(); navigate("/"); }} className="flex items-center gap-3 w-full px-5 py-3 text-sm text-destructive hover:bg-destructive/5 transition-colors">
            ↩ {t("logout")}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8 pt-10">
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h2 className="font-display text-4xl font-bold text-gold-gradient mb-8">{t("dashboard")}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { l: t("totalOrders"), v: orders.length, icon: "📦", col: "#3B82F6" },
                { l: t("revenue"), v: `${total.toLocaleString()} ${t("sar")}`, icon: "💰", col: "#C4971A" },
                { l: t("pending"), v: pend, icon: "⏳", col: "#F59E0B" },
                { l: t("completed"), v: comp, icon: "✅", col: "#10B981" },
              ].map((c) => (
                <div key={c.l} className="glass-card p-5" style={{ borderTop: `3px solid ${c.col}` }}>
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="font-display text-2xl mb-1" style={{ color: c.col }}>{c.v}</div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest">{c.l}</div>
                </div>
              ))}
            </div>
            {/* Distribution */}
            <div className="glass-card p-6 mb-6">
              <h3 className="font-display text-xl mb-5">{lang === "ar" ? "توزيع الطلبات" : "Order Distribution"}</h3>
              {[[t("pending"), pend, "#F59E0B"], [t("processing"), proc, "#3B82F6"], [t("completed"), comp, "#10B981"]].map(([lbl, val, col]) => (
                <div key={lbl as string} className="mb-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{lbl}</span>
                    <span className="font-semibold" style={{ color: col as string }}>{val as number}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ background: col as string, width: orders.length ? `${Math.round((val as number) / orders.length * 100)}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <OrdersTable data={orders.slice(0, 5)} />
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            <h2 className="font-display text-4xl font-bold text-gold-gradient mb-8">{t("allOrders")}</h2>
            <OrdersTable data={orders} />
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div>
            <h2 className="font-display text-4xl font-bold text-gold-gradient mb-8">{t("settings")}</h2>
            <div className="glass-card p-8 max-w-lg">
              {([
                ["storeName", t("storeName"), "LUX TIME"],
                ["storeNameAr", t("storeNameAr"), "لوكس تايم"],
                ["whatsappNumber", t("waNum"), "966501234567"],
              ] as [keyof typeof sForm, string, string][]).map(([field, label, ph]) => (
                <div key={field} className="mb-5">
                  <label className="block text-xs text-muted-foreground mb-2 uppercase tracking-wider">{label}</label>
                  <input
                    value={sForm[field]}
                    onChange={(e) => setSForm((f) => ({ ...f, [field]: e.target.value }))}
                    placeholder={ph}
                    className="w-full bg-card border border-border px-4 py-3 text-foreground text-sm outline-none focus:border-primary transition-colors font-body"
                  />
                </div>
              ))}
              <div className="mb-8">
                <label className="block text-xs text-muted-foreground mb-3 uppercase tracking-wider">{t("brandColor")}</label>
                <div className="flex gap-3 flex-wrap items-center">
                  <input
                    type="color" value={sForm.primaryColor}
                    onChange={(e) => setSForm((f) => ({ ...f, primaryColor: e.target.value }))}
                    className="w-14 h-10 border border-border bg-card cursor-pointer p-1"
                  />
                  {["#C4971A", "#E8C97A", "#D4AF37", "#C0392B", "#2980B9", "#8E44AD"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSForm((f) => ({ ...f, primaryColor: c }))}
                      className="w-7 h-7 rounded transition-transform hover:scale-125"
                      style={{ background: c, border: sForm.primaryColor === c ? "2px solid white" : "2px solid transparent" }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                className="bg-gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-sm uppercase tracking-widest text-sm shadow-gold hover:opacity-90 transition-opacity"
              >
                {t("saveSettings")}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
