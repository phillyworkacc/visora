import { model, models, Schema } from "mongoose";

const VisitorsDataSchema = new Schema<VisitorData>({
   visitorId: { type: String },
   sessions: {
      type: [{
         sessionId: { type: String },
         timestamp: { type: Number },
         sessionDuration: { type: Number },
         interacted: { type: Boolean },
         utmSource: { type: String },
         utmCampaign: { type: String },
         pagesVisited: { type: Number }
      }]
   },
   websiteId: { type: String },
   device: {
      type: { type: String },
      os: { type: String }
   },
   pages: { 
      type: [{
         url: { type: String },
         referrer: { type: String },
         entryPage: { type: Boolean },
         visits: { type: Number }
      }] 
   },
   location: {
      ip: { type: String },
      country: { type: String },
      countryCode: { type: String },
      city: { type: String },
      timezone: { type: String }
   },
   live: { type: Boolean }
})

const VisitorsDataDb = models.VisitorsData || model("VisitorsData", VisitorsDataSchema)
export default VisitorsDataDb;