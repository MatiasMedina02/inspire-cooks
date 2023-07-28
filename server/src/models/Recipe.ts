import { Schema, model, Document } from "mongoose"
import { IUser, ImageRecipe, RecipeCategory } from "../types";

interface IRecipe extends Document {
	title: string;
	description: string;
	image: ImageRecipe;
	ingredients: object[];
	instructions: object[];
	category: RecipeCategory;
	author: IUser
}

const recipeSchema = new Schema<IRecipe>({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		public_id: {
		  type: String,
			required: true
		},
		url: {
		  type: String,
			required: true
		},
	},
	ingredients: {
		type: [Object],
		required: true
	},
	instructions: {
		type: [Object],
		required: true
	},
	category: {
		type: String,
		enum: Object.values(RecipeCategory),
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
}, {
	timestamps: false,
	versionKey: false,
});

const UserModel = model<IRecipe>("Recipe", recipeSchema)

export default UserModel;