import { MessageCircle, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-gold-gradient mb-4">LUX TIME</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your trusted destination for luxury watches in Saudi Arabia.
          </p>
          <p className="text-muted-foreground text-sm mt-2" dir="rtl">
            وجهتك الموثوقة للساعات الفاخرة في المملكة العربية السعودية
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-4">Contact Us • تواصل معنا</h4>
          <div className="space-y-3 text-muted-foreground text-sm">
            <a href="https://wa.me/966500000000" className="flex items-center gap-3 hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp: +966 50 000 0000
            </a>
            <a href="tel:+966500000000" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> +966 50 000 0000
            </a>
            <a href="mailto:info@luxtime.sa" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> info@luxtime.sa
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-4">Follow Us • تابعنا</h4>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Instagram className="w-5 h-5" /> @luxtime.sa
          </a>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} LUX TIME. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
