'use client'
import "@/styles/dashboard.css"
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import { CreditCard, LayoutDashboard, LogOut, Trash2, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react";
import { CustomIcon } from "@/components/Icons/Icon";
import { customerBillingPortal, userDefaultImage } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/Modal/ModalContext";
import { deleteUserAccount } from "../actions/User";
import { toast } from "sonner";
import Link from "next/link";

export default function Account () {
   const { data: session, status } = useSession();
   const { showModal, close } = useModal();
   const router = useRouter();

   const deleteAccountButton = async () => {
      const response = await deleteUserAccount();
      if (response) {
         signOut();
         toast.success("Successfully deleted your account");
         router.push("/login");
      } else {
         toast.error("Failed to delete your account. Please try again later");
      }
      close();
   }

   const deleteAccountModal = () => {
      showModal({
         title: 'Delete Account',
         content: <>
            <div className="text-xs grey-5">Are you sure you want to permanently delete your account? <b>This action cannot be undone.</b></div>
            <div className="text-s pd-1">
               <div className="list gap-8">
                  <button className="outline-black full xxs" onClick={close}>
                     <X size={15} /> Cancel
                  </button>
                  <button className="full delete xxs" onClick={deleteAccountButton}>
                     <Trash2 size={15} /> Delete Permanently
                  </button>
               </div>
            </div>
         </>
      })
   }

   return (
      <div className="dashboard">
         <div className="user-account">
            <div className="welcoming">
               <div className="text-m bold-500">Hello {session?.user?.name}</div>
            </div>
            <div className="account">
               <button className="outline-black xxs" onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard size={20} /> <span>Dashboard</span>
               </button>
            </div>
         </div>
         <div className="content">
            <Card padding="20px">
               <div className="text-s pd-1">
                  <CustomIcon size={60} url={session?.user?.image || userDefaultImage} round />
               </div>
               <div className="text-m bold-600">{session?.user?.name}</div>
               <div className="text-s">{session?.user?.email}</div>

               <Spacing size={1} />
               {status == "authenticated" ? <>
                  <Link href={`${customerBillingPortal}?prefilled_email=${session.user?.email}`} target="_blank">
                     <button className="s">
                        <CreditCard size={18} /> Manage Subscription
                     </button>
                  </Link>
               </> : <>
                  <div className="text-xxs grey-2">Loading Billing Manager...</div>
               </>}

               <Spacing size={1} />
               <button className="s" onClick={() => signOut()}><LogOut size={18} /> Sign Out</button>

               <Spacing size={1} />
               <button className="s delete" onClick={deleteAccountModal}><Trash2 size={18} /> Delete Account</button>
            </Card>
         </div>
      </div>
   )
}
