import { Schema, model, Document } from "mongoose"
import { IRecipe, ImageCloudinary } from "../types";

interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	image: ImageCloudinary;
	recipes: IRecipe[];
	favorites: IRecipe[];
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
		public_id: {
		  type: String,
			required: true,
		},
		url: {
		  type: String,
			required: true,
			default: "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg"
		},
	},
	recipes: [{
		type: Schema.Types.ObjectId,
		ref: "Recipe"
	}],
	favorites: [{
		type: Schema.Types.ObjectId,
		ref: "Recipe"
	}],
}, {
	versionKey: false,
});

const UserModel = model<IUser>("User", userSchema)

export default UserModel;