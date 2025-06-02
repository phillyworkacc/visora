import { model, models, Schema } from "mongoose";

const UsersSchema = new Schema<User>({
   email: { type: String, unique: true },
   userid: { type: String, unique: true },
   websites: { type: [String] },
   hasAccess: { type: Boolean },
   createdAt: { type: Number, default: () => Date.now() },
})

const UsersDb = models.Users || model("Users", UsersSchema)
export default UsersDb;