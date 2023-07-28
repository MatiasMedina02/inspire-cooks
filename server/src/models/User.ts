import { Schema, model, Document } from "mongoose"
import { IRecipe } from "../types";

interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	image: string;
	recipes: IRecipe[];
}

const userSchema = new Schema<IUser>({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
	},
	image: {
		type: String,
		default: "https://cdn-icons-png.flaticon.com/512/552/552721.png"
	},
	recipes: [{
		type: Schema.Types.ObjectId,
		ref: "Recipe"
	}],
}, {
	timestamps: false,
	versionKey: false,
});

const UserModel = model<IUser>("User", userSchema)

export default UserModel;