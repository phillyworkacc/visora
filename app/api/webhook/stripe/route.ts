import CancelSubscriptionEmail from '@/email/CancelSubscriptionEmail';
import SubscribedConfirmationEmail from '@/email/SubscribedEmail';
import UsersDb from '@/db/user';
import { getUserByEmail } from '@/app/actions/User';
import { sendEmailFromVisora } from '@/email/EmailConfig';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe'
import SubscribedEmail from '@/email/SubscribedEmail';
import CancelSubscription from '@/email/CancelSubscriptionEmail';

// Use Stripe secret key from env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
   const body = await req.text();
   const signature = (await headers()).get('stripe-signature')!;

   let data;
   let eventType;
   let event: Stripe.Event;

   // verify Stripe event is legit
   try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as Stripe.Event;
   } catch (err: any) {
      console.error(`Webhook signature verification failed. ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
   }

   data = event.data as any;
   eventType = event.type;

   try {
      if (eventType == 'checkout.session.completed') {
         // First payment is successful and a subscription is created 
         // ✅ Grant access to the product
         const session = await stripe.checkout.sessions.retrieve(data.object.id, {
            expand: ['line_items']
         });
         const customerId = session?.customer!;
         const customer: any = await stripe.customers.retrieve(customerId as string);

         // get user
         const user: any = await getUserByEmail(customer.email);
         if (!user) return NextResponse.json({ error: "user does not exist" }, { status: 400 })

         // give user basic permissions
         user.hasAccess = true;
         await user.save();
         // await UserDB.subscribeUserBasicPlan(user.userid);
         await sendEmailFromVisora(
            user.email, `Successful Subscription to Visora`,
            SubscribedEmail(user.email)
         );
         console.log(`Customer Email: ${user.email}\nPurchased: Basic Plan`);

      } else if (eventType == 'customer.subscription.deleted') {
         // ❌ Revoke access to the product
         const session = data.object as Stripe.Subscription;
         const customerId = session.customer;
         const customer: any = await stripe.customers.retrieve(customerId as string);

         // get user
         const user: any = await getUserByEmail(customer.email);
         if (!user) return NextResponse.json({ error: "user does not exist" }, { status: 400 })

         // Remove user subscription permission
         user.hasAccess = false;
         await user.save();
         await sendEmailFromVisora(
            user.email, `Cancelled Subscription to Visora`,
            CancelSubscription(user.email, user.email)
         );
         console.log(`Customer Email: ${user.email}\nCancelled/Ended Subscription`);

      } else if (eventType == 'customer.subscription.updated') {
         const subscription = data.object as Stripe.Subscription;
         const previousSubscription: Stripe.Subscription | undefined = data.object.previous_attributes;

         const customerId = subscription.customer;
         const customer: any = await stripe.customers.retrieve(customerId as string);

         const user: any = await getUserByEmail(customer.email);
         if (!user) return NextResponse.json({ error: "user does not exist" }, { status: 400 })

         if (subscription.status === 'active' && subscription.start_date !== (previousSubscription?.start_date || 0)) {
            console.log("Update made - Subscription renewed")
            // give user basic permissions
            user.hasAccess = true;
            await user.save();
            console.log(`Customer Email: ${user.email}\nRenewed to: Basic Plan`);
         }
      }
   } catch (err: any) {
      return NextResponse.json({ error: "error" }, { status: 400 })
   }

   return new Response(JSON.stringify({}));
}