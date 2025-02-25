
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
	email: string;
	password?: string;
	name: string;
	image?: string;
	id: string;
	skills?: string[];
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String },
	skills: { type: [String] },
});

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
