import { Schema, model, Document } from "mongoose";
import { IUser } from "../types";

interface IComment extends Document {
	text: string;
	author: IUser;
}

const commentSchema = new Schema<IComment>({
	text: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
}, {
	versionKey: false,
})

const CommentModel = model<IComment>("Comment", commentSchema);

export default CommentModel;