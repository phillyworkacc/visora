import { Lightbulb, TrendingUp, Wrench } from "lucide-react"

export const AiRecommendations = {
   currentVisitors: (value: number) => {
      if (value == 0) {
         // no current live visitors
         return {
            title: 'No active users',
            text: 'Review recent changes or test site availability',
            help: [
               "Check if the website is accessible and loads correctly",
               "Review recent updates or deploy logs for potential bugs",
               "Verify if analytics script is correctly embedded",
               "Share site on socials or run a small test ad for traffic",
               "Consider scheduling content drops or email campaigns"
            ],
            action: <><Wrench size={16} /> Fix Now</>,
            priority: 'high'
         }
      } else if (value <= 10) {
         // low amount of visitors
         return {
            title: 'Low activity',
            text: 'Consider launching a popup offer or directing users to a CTA',
            help: [
               "Promote your content or offers on social media during peak hours",
               "Create urgency with limited-time offers or banners",
               "Launch a live chat or chatbot to guide users",
               "Analyze heatmaps to understand where users drop off"
            ],
            action: <><TrendingUp size={16} /> Improve</>
         }
      } else if (value > 45) {
         // high traffic
         return {
            title: 'Traffic is high',
            text: 'Promote on social or schedule content during peak hours',
            help: [
               "Add a popup offer to convert users while they're active",
               "Highlight a strong CTA (signup, product page, etc.) above the fold",
               "Temporarily increase ad spend to capitalize on momentum",
               "Track which pages are most active and optimize them in real time"
            ],
            action: <><Lightbulb size={16} /> Tips</>
         }
      }
   },

   bounceRate: (value: number) => {
      if (value < 40) {
         // good
         return {
            title: 'Great engagement',
            text: 'Consider expanding your winning pages or duplicating flow',
            help: [
               "Clone the structure of successful pages for new content",
               "Double down on content format (video, layout, CTAs) that work",
               "Use similar UX patterns across other pages to improve consistency",
               "Expand paid ads pointing to these high-performing pages"
            ],
            action: <><Lightbulb size={16} /> Tips</>
         }
      } else if (value > 70) {
         // bad
         return {
            title: 'High bounce rate',
            text: 'Improve page load time or adjust messaging above the fold',
            help: [
               "Reduce initial page load time and improve core web vitals",
               "Make the hero section clearer, more value-driven, and engaging",
               "Add interactive elements above the fold (e.g., button, form)",
               "Ensure CTAs match ad messaging or search intent",
               "Simplify the design — avoid overwhelming users at first glance"
            ],
            action: <><Wrench size={16} /> Fix Now</>,
            priority: 'high'
         }
      } else {
         // mid
         return {
            title: 'Moderate bounce rate',
            text: 'A/B test headlines or CTAs to boost engagement',
            help: [
               "Run A/B tests on headlines and CTAs using a tool like VWO or Google Optimize",
               "Test changing button text, placement, or contrast",
               "Use session recordings to spot friction or confusion",
               "Adjust layout to emphasize core value proposition faster"
            ],
            action: <><TrendingUp size={16} /> Improve</>
         }
      }
   },

   averageSessionDuration: (value: number) => {
      if (value < 30) {
         // low session time
         return {
            title: 'Very low session time',
            text: 'Content may not be compelling. Rework layout or UX',
            help: [
               "Break long blocks of text with visuals or bullet points",
               "Make key content easier to find with a better nav/menu",
               "Add video, carousels, or product demos to hold attention",
               "Improve internal linking to guide visitors through site",
               "Check if page content matches expectations from the source (Google, ads, etc.)"
            ],
            action: <><Wrench size={16} /> Fix Now</>,
            priority: 'high'
         }
      } else if (value > 90) {
         // very good session time
         return {
            title: 'Strong interest',
            text: 'Consider adding lead capture or upsell during session',
            help: [
               "Add a lead magnet or opt-in popup after ~60 seconds",
               "Introduce cross-sell or upsell CTAs during content",
               "Add persistent CTAs that don't interrupt but are visible",
               "Prompt users to bookmark or share with value-based buttons"
            ],
            action: <><Lightbulb size={16} /> Tips</>
         }
      } else {
         // average session time
         return {
            title: 'Average session',
            text: 'Try interactive elements or clearer navigation',
            help: [
               "Add subtle animations or interactivity (hover cards, tabs)",
               "Improve navigation clarity or use sticky nav bars",
               "Introduce a CTA at 25%, 50%, and 75% scroll points",
               "Embed quizzes or feedback tools to engage users more"
            ],
            action: <><TrendingUp size={16} /> Improve</>
         }
      }
   },

   growthOfVisitorsLast30Days: (growth: number) => {
      if (growth > 20) {
         // growing traffic
         return {
            title: 'Traffic is growing',
            text: 'Double down on your best content and optimize SEO',
            help: [
               "Double output on channels/content types driving growth",
               "Refresh and republish older high-performing posts",
               "Create advanced content upgrades or gated PDFs",
               "Add opt-ins to build a newsletter audience during growth"
            ],
            action: <><Lightbulb size={16} /> Tips</>
         }
      } else if (growth < -20) {
         // declining traffic
         return {
            title: 'Traffic is dropping',
            text: 'Investigate marketing channels or performance issues',
            help: [
               "Check Google Search Console for indexing issues or penalties",
               "Evaluate recent changes in design, speed, or content",
               "Analyze referral and social channels for drops in posts or mentions",
               "Re-engage audience with email or retargeting ads"
            ],
            action: <><Wrench size={16} /> Fix Now</>,
            priority: 'high'
         }
      } else {
         // average/consistent traffic
         return {
            title: 'Consistent traffic',
            text: 'Time to experiment with content or conversion tests',
            help: [
               "Run new tests (CTAs, layout, colors) to push conversion higher",
               "Launch a limited-time experiment or offer",
               "Start building a community (Discord, mailing list, etc.)",
               "Use polls or surveys to get qualitative insights"
            ],
            action: <><TrendingUp size={16} /> Improve</>
         }
      }
   },
}