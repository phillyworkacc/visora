'use client'
import "./Navbar.css"
import { Menu } from "lucide-react"
import { CustomIcon, VisoraRawLogo } from "@/components/Icons/Icon"
import { useSession } from "next-auth/react"
import { userDefaultImage } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { useModal } from "@/components/Modal/ModalContext"
import Link from "next/link"

export default function Navbar () {
   const { data: session } = useSession();
   const { showModal, close } = useModal();
   const router = useRouter();

   const openMenuModal = () => {
      showModal({
         title: "Navigation",
         content: <>
            <Link href='#features'>
               <div className="text-xs pd-1 mb-05 bold-500">Features</div>
            </Link>
            <Link href='#how'>
               <div className="text-xs pd-1 mb-05 bold-500">How It Works</div>
            </Link>
            <Link href='#reviews'>
               <div className="text-xs pd-1 mb-05 bold-500">Reviews</div>
            </Link>
            <Link href='#pricing'>
               <div className="text-xs pd-1 mb-05 bold-500">Pricing</div>
            </Link>
            <Link href='#faqs'>
               <div className="text-xs pd-1 mb-2 bold-500">FAQs</div>
            </Link>
            {session?.user ? <>
               <div className="text-xs bold-500 dfb align-center gap-7" onClick={() => {
                  router.push('/account');
                  close();
               }}>
                  <CustomIcon url={session.user.image || userDefaultImage} size={30} round />
                  <span>{session.user.name}</span>
               </div>
            </> : <>
               <button
                  className="xs" 
                  style={{
                     backgroundColor: '#6600af',
                     border: 'none',
                     padding: '0.5rem 1rem',
                     borderRadius: '100px',
                     color: 'white'
                  }}
                  onClick={() => {
                     router.push('/login');
                     close();
                  }}
               >Login</button>
            </>}
         </>
      })
   }

   return (
      <div className="navbar">
         <div className="navbar-container">

            <div className="branding" onClick={() => router.push('/')}>
               <div className="logo"><VisoraRawLogo size={23} /></div>
               <div className="text-m bold-600">Visora</div>
            </div>

            <div className="links">
               <Link href='#features'>
                  <div className="link text-xxs pd-1 bold-500">Features</div>
               </Link>
               <Link href='#testimonials'>
                  <div className="link text-xxs pd-1 bold-500">Testimonials</div>
               </Link>
               <Link href='#pricing'>
                  <div className="link text-xxs pd-1 bold-500">Pricing</div>
               </Link>
               <Link href='#faqs'>
                  <div className="link text-xxs pd-1 bold-500">FAQs</div>
               </Link>
               <Link href='/contact' target="_blank">
                  <div className="link text-xxs pd-1 bold-500">Contact Us</div>
               </Link>
            </div>

            <div className="action">
               {session?.user ? <>
                  <div className="user-account-button" onClick={() => router.push('/account')}>
                     <CustomIcon url={session.user.image || userDefaultImage} size={40} round />
                  </div>
               </> : <>
                  <button className="xs" onClick={() => router.push('/login')}>Login</button>
               </>}
            </div>

            <div className="menu">
               <div className="menu-btn" onClick={openMenuModal}>
                  <Menu size={30} />
               </div>
            </div>
         </div>
      </div>
   )
}
