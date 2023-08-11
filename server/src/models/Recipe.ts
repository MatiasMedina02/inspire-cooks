import { Schema, model, Document } from "mongoose"
import { IComment, IUser, ImageCloudinary, RecipeCategory } from "../types";

interface IRecipe extends Document {
	title: string;
	description: string;
	image: ImageCloudinary;
	ingredients: object[];
	instructions: object[];
	category: RecipeCategory;
	prepTime: number;
  cookTime: number;
	totalTime: number;
  servings: number;
	author: IUser;
	comments: IComment[];
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
	prepTime: {
		type: Number,
		required: true
	},
	cookTime: {
		type: Number,
		required: true
	},
	totalTime: {
		type: Number,
		required: true
	},
	servings: {
		type: Number,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}],
}, {
	versionKey: false,
	timestamps: true
});

const UserModel = model<IRecipe>("Recipe", recipeSchema)

export default UserModel;