import { model, models, Schema } from "mongoose";

const WebsitesSchema = new Schema<Website>({
   userid: { type: String },
   websiteId: { type: String, unique: true },
   favicon: { type: String },
   domain: { type: String },
   createdAt: { type: Number, default: () => Date.now() }
})

const WebsitesDb = models.Websites || model("Websites", WebsitesSchema)
export default WebsitesDb;