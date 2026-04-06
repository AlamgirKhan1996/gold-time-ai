import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Order, Product, StoreSettings, Language } from "@/types";
import { PRODUCTS, DEMO_ORDERS } from "@/data/products";

interface StoreContextType {
  // Language
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
  isRTL: () => boolean;

  // Products
  products: Product[];

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  lastOrder: Order | null;
  placeOrder: (formData: { name: string; phone: string; address: string; payment: string }, viaWA?: boolean) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;

  // Admin
  isAdmin: boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (s: Partial<StoreSettings>) => void;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    home: "Home", collection: "Collection", cart: "Cart", admin: "Admin",
    heroTag: "2025 Collection", heroTitle: "Timeless Luxury",
    heroSub: "Authentic Swiss watches. Delivered to your door across the Kingdom.",
    shopNow: "Shop Now", orderWA: "Order via WhatsApp",
    categories: "Browse By Category", featured: "Featured Collection", viewAll: "View All →",
    luxury: "Luxury", sport: "Sport", classic: "Classic", allCat: "All",
    addCart: "Add to Cart", outOfStock: "Out of Stock", viewDetails: "View Details",
    qty: "Quantity", description: "Description", specifications: "Specifications",
    back: "← Back to Collection",
    yourCart: "Your Cart", cartEmpty: "Your cart is empty",
    continueShopping: "Continue Shopping", total: "Total",
    checkout: "Proceed to Checkout", remove: "Remove",
    checkoutTitle: "Checkout", yourInfo: "Your Information",
    fullName: "Full Name", phone: "Phone Number", address: "Delivery Address",
    payMethod: "Payment Method", cod: "Cash on Delivery",
    mada: "Mada Card", applePay: "Apple Pay",
    placeOrder: "Confirm Order", orderViaWA: "Order via WhatsApp",
    orderPlaced: "Order Confirmed!", thankYou: "Thank you for shopping with us.",
    orderId: "Order ID", backHome: "Back to Home",
    adminLogin: "Admin Login", email: "Email", password: "Password", login: "Sign In",
    dashboard: "Dashboard", orders: "Orders", settings: "Settings", logout: "Sign Out",
    totalOrders: "Total Orders", revenue: "Total Revenue",
    pending: "Pending", completed: "Completed", processing: "Processing",
    allOrders: "All Orders", customer: "Customer", amount: "Amount",
    status: "Status", actions: "Actions", cancelled: "Cancelled",
    storeName: "Store Name (EN)", storeNameAr: "Store Name (AR)",
    waNum: "WhatsApp Number", brandColor: "Brand Color",
    saveSettings: "Save Changes", sar: "SAR",
    orderSummary: "Order Summary", pieces: "pieces",
    nameRequired: "Name required", phoneRequired: "Phone required", addressRequired: "Address required",
    invalidCreds: "Invalid credentials", settingsSaved: "Settings saved ✓",
    chatWithUs: "Have a Question? Chat With Us",
    chatSub: "Our specialists are ready to help you find the perfect timepiece",
    startChat: "Start Chat",
    storeFront: "Store Front", demoHint: "admin@luxtime.sa / admin123",
  },
  ar: {
    home: "الرئيسية", collection: "المجموعة", cart: "السلة", admin: "الإدارة",
    heroTag: "مجموعة 2025", heroTitle: "فخامة لا تنتهي",
    heroSub: "ساعات سويسرية أصيلة توصل إلى باب منزلك في كل أنحاء المملكة.",
    shopNow: "تسوق الآن", orderWA: "اطلب عبر واتساب",
    categories: "تصفح حسب الفئة", featured: "المجموعة المميزة", viewAll: "← عرض الكل",
    luxury: "فاخرة", sport: "رياضية", classic: "كلاسيكية", allCat: "الكل",
    addCart: "أضف للسلة", outOfStock: "نفد من المخزون", viewDetails: "عرض التفاصيل",
    qty: "الكمية", description: "الوصف", specifications: "المواصفات",
    back: "العودة للمجموعة →",
    yourCart: "سلتك", cartEmpty: "سلتك فارغة",
    continueShopping: "مواصلة التسوق", total: "الإجمالي",
    checkout: "إتمام الطلب", remove: "حذف",
    checkoutTitle: "إتمام الطلب", yourInfo: "بياناتك الشخصية",
    fullName: "الاسم الكامل", phone: "رقم الجوال", address: "عنوان التوصيل",
    payMethod: "طريقة الدفع", cod: "الدفع عند الاستلام",
    mada: "بطاقة مدى", applePay: "Apple Pay",
    placeOrder: "تأكيد الطلب", orderViaWA: "اطلب عبر واتساب",
    orderPlaced: "تم تأكيد طلبك!", thankYou: "شكراً لتسوقك معنا.",
    orderId: "رقم الطلب", backHome: "العودة للرئيسية",
    adminLogin: "تسجيل دخول الإدارة", email: "البريد الإلكتروني", password: "كلمة المرور", login: "دخول",
    dashboard: "لوحة التحكم", orders: "الطلبات", settings: "الإعدادات", logout: "تسجيل الخروج",
    totalOrders: "إجمالي الطلبات", revenue: "إجمالي الإيرادات",
    pending: "قيد الانتظار", completed: "مكتملة", processing: "جاري المعالجة",
    allOrders: "جميع الطلبات", customer: "العميل", amount: "المبلغ",
    status: "الحالة", actions: "إجراءات", cancelled: "ملغي",
    storeName: "اسم المتجر (EN)", storeNameAr: "اسم المتجر (AR)",
    waNum: "رقم واتساب", brandColor: "لون العلامة التجارية",
    saveSettings: "حفظ التغييرات", sar: "ر.س",
    orderSummary: "ملخص الطلب", pieces: "قطعة",
    nameRequired: "الاسم مطلوب", phoneRequired: "الجوال مطلوب", addressRequired: "العنوان مطلوب",
    invalidCreds: "بيانات غير صحيحة", settingsSaved: "تم حفظ الإعدادات ✓",
    chatWithUs: "لديك سؤال؟ تواصل معنا",
    chatSub: "فريقنا المتخصص جاهز لمساعدتك في اختيار ساعتك المثالية",
    startChat: "ابدأ المحادثة",
    storeFront: "المتجر", demoHint: "admin@luxtime.sa / admin123",
  },
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("lux_lang") as Language) || "ar";
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("lux_cart") || "[]"); } catch { return []; }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem("lux_orders") || JSON.stringify(DEMO_ORDERS)); } catch { return DEMO_ORDERS; }
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("lux_admin") === "true");
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try { return JSON.parse(localStorage.getItem("lux_settings") || "null") || {
      storeName: "LUX TIME", storeNameAr: "لوكس تايم",
      primaryColor: "#C4971A", whatsappNumber: "966501234567",
    }; } catch { return { storeName: "LUX TIME", storeNameAr: "لوكس تايم", primaryColor: "#C4971A", whatsappNumber: "966501234567" }; }
  });

  // Persist
  useEffect(() => { localStorage.setItem("lux_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("lux_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("lux_orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("lux_settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { if (isAdmin) sessionStorage.setItem("lux_admin", "true"); else sessionStorage.removeItem("lux_admin"); }, [isAdmin]);

  const toggleLang = () => setLang(l => l === "ar" ? "en" : "ar");
  const t = (key: string) => TRANSLATIONS[lang][key] || key;
  const isRTL = () => lang === "ar";

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: product.id, nameEn: product.nameEn, nameAr: product.nameAr, price: product.price, image: product.image, qty }];
    });
  };
  const removeFromCart = (id: number) => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(p => p.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);

  const placeOrder = (formData: { name: string; phone: string; address: string; payment: string }, viaWA = false) => {
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      customer: formData.name, phone: formData.phone, address: formData.address,
      items: cart.map(i => ({ name: i.nameEn, nameAr: i.nameAr, qty: i.qty, price: i.price })),
      total: cartTotal, payment: (viaWA ? "whatsapp" : formData.payment) as Order["payment"],
      status: "pending", date: new Date().toISOString().split("T")[0],
    };
    setOrders(p => [newOrder, ...p]);
    setLastOrder(newOrder);

    if (viaWA) {
      const itemLines = newOrder.items.map(i => `• ${isRTL() ? i.nameAr : i.name} ×${i.qty} = ${(i.qty * i.price).toLocaleString()} ${t("sar")}`).join("\n");
      const msg = isRTL()
        ? `*طلب جديد — ${settings.storeNameAr}*\n\n👤 ${newOrder.customer}\n📱 ${newOrder.phone}\n📍 ${newOrder.address}\n\n${itemLines}\n\n💰 *الإجمالي: ${cartTotal.toLocaleString()} ${t("sar")}*`
        : `*New Order — ${settings.storeName}*\n\n👤 ${newOrder.customer}\n📱 ${newOrder.phone}\n📍 ${newOrder.address}\n\n${itemLines}\n\n💰 *Total: ${cartTotal.toLocaleString()} ${t("sar")}*`;
      window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    }
    clearCart();
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders(p => p.map(o => o.id === id ? { ...o, status } : o));
  };

  const loginAdmin = (email: string, password: string) => {
    if (email === "admin@luxtime.sa" && password === "admin123") {
      setIsAdmin(true); return true;
    }
    return false;
  };
  const logoutAdmin = () => setIsAdmin(false);

  const updateSettings = (s: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
  };

  return (
    <StoreContext.Provider value={{
      lang, toggleLang, t, isRTL,
      products: PRODUCTS,
      cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart,
      orders, lastOrder, placeOrder, updateOrderStatus,
      isAdmin, loginAdmin, logoutAdmin,
      settings, updateSettings,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
