import { Mail, Phone, Linkedin, Youtube, MessageCircle, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full relative z-20 backdrop-blur-lg bg-white/5 border-t border-white/10 px-6 py-12">
      <div className="max-w-7xl mx-auto grid gap-8 text-white md:grid-cols-3">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            CodingMeet
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Learn & grow with real-world coding projects.<br />
            100% free resources, practical learning, and a supportive community.
          </p>
          <p className="text-xs text-white/50">
            Founded by <span className="font-semibold text-white/70">Sanjay Choudhary</span>
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-indigo-400">Contact</h3>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-indigo-300" />
            <a href="mailto:codingmeet18@gmail.com" className="hover:text-indigo-400">
              codingmeet18@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-indigo-300" />
            <a href="tel:+917568045830" className="hover:text-indigo-400">
              +91 7568045830
            </a>
          </p>
        </div>

        {/* Connect */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-indigo-400">Connect</h3>
          <p className="flex items-center gap-2 text-sm">
            <Linkedin size={16} className="text-indigo-300" />
            <a
              href="https://www.linkedin.com/in/sanjaychoudhary99/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              LinkedIn
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Youtube size={16} className="text-indigo-300" />
            <a
              href="https://youtube.com/@sanjay_tutorials?si=sJ4fWoqLdRqJqVwN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              YouTube
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MessageCircle size={16} className="text-indigo-300" />
            <a
              href="https://chat.whatsapp.com/JFMGj2zcFY41CcIVV0Op50"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              Join WhatsApp Group
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Instagram size={16} className="text-indigo-300" />
            <a
              href="https://instagram.com/sanjuuu_x18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              Instagram
            </a>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Twitter size={16} className="text-indigo-300" />
            <a
              href="https://x.com/sanjay_x18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              Twitter (X)
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-white/40">
        &copy; 2025 CodingMeet. All rights reserved.
      </div>
    </footer>
  );
}
