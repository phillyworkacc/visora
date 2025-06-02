import Link from "next/link";

export const faqs = [
   {
      question: "How does session tracking work?",
      answer:
         <>We use cookie-based sessions to monitor user behavior without compromising your privacy. Sessions expire after inactivity to ensure accurate data.</>
   },
   {
      question: "Is my visitor data secure?",
      answer:
         <>Absolutely — Visora is fully GDPR-compliant and never sells or shares your data. We prioritize security and encryption at every step.</>
   },
   {
      question: "Can I remove a website from my account?",
      answer:
         <>Yes, simply go to website on your dashboard, scroll to the bottom and remove the website you no longer want to track.</>
   },
   {
      question: "How many websites can I add to Visora?",
      answer:
         <>You can track up to 5 websites per account. If you need more, consider removing an unused site to free up space.</>
   },
   {
      question: "What's the installation process like?",
      answer:
         <>Add one simple tracking tag to your website&apos;s code, and you&apos;ll start seeing visitor data in real time—no complex setup required.</>
   },
   {
      question: "Can I integrate Visora with other tools?",
      answer:
         <>Currently, Visora focuses on standalone analytics. Integrations are on our roadmap — stay tuned for updates!</>
   },
   {
      question: "Does Visora support mobile app tracking?",
      answer:
         <>Right now, Visora specializes in website analytics. Mobile app tracking support is planned for future releases.</>
   },
   {
      question: "What if I need help or support?",
      answer:
         <>Our support team is available 24/7. Reach out anytime at <Link className="visible-footer-link" href='/contact' target="_blank">contact us</Link> and we&apos;ll assist you promptly.</>
   },
];
