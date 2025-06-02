"use client"
import Link from "next/link";
import "./Footer.css"

export default function Footer() {
   return (
      <footer className="footer">
         <nav className="footer-nav">
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
         </nav>
         <p className="footer-copy text-xxxs">&copy; {new Date().getFullYear()} Visora. All rights reserved.</p>
      </footer>
   );
}
