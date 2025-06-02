'use client'
import "./Testimonials.css"
import { testimonials } from "@/utils/AppTestimonials";

const companyLogos = [
  { src: "https://qualysservs.com/assets/img/logo.png", alt: "Qualys" },
  { src: "https://minweb.freevar.com/logo.png", alt: "Minweb" },
];

export default function Testimonials () {
   return (
      <section className="testimonials-section" id="testimonials">
         <h2>What Our Users Say</h2>

         <div className="testimonial-list">
         {testimonials.map((t, i) => (
            <blockquote key={i} className="testimonial-card">
               <p>"{t.quote}"</p>
               <footer>— {t.author}</footer>
            </blockquote>
         ))}
         </div>

         <div className="company-logos">
         {companyLogos.map(({ src, alt }, i) => (
            <img key={i} src={src} alt={alt} className="company-logo" />
         ))}
         </div>
      </section>
   );
}
