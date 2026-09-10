'use client'
import "@/styles/loading.css"
import { motion } from "framer-motion"

export default function loading() {
   return (
      <div className='loading-page-visora'>
         <motion.div
            className="logo"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
               duration: 0.8, ease: "easeIn",
               repeat: Infinity, repeatType: "reverse"
            }}
         >
            <img src="/assets/logo/logo.png" alt="gif" />
         </motion.div>
      </div>
   )
}
