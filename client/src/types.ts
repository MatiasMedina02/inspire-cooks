export type Instruction = {
	order: number;
	step: string;
}

export type Ingredient = {
	id: number;
	type: string;
}

export type ImageCloudinary = {
  public_id: string
	url: string
}

export enum RecipeCategory {
  Desserts = 'Desserts',
  MainDishes = 'Main Dishes',
  AppetizersAndSnacks = 'Appetizers and Snacks',
  Beverages = 'Beverages',
  FastFood = 'Fast Food',
  VegetarianAndVeganDishes = 'Vegetarian and Vegan Dishes',
  InternationalDishes = 'International Dishes',
  Breakfasts = 'Breakfasts',
  Soups = "Soups"
}

export interface IRecipe {
	title: string;
	description: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
  category: RecipeCategory;
  prepTime: number;
  cookTime: number;
  servings: number;
}

export interface ICreateRecipe extends IRecipe {
  image: string
}

export interface IRecipeWithAll extends IRecipe {
  _id: string;
  image: ImageCloudinary;
  author: User;
  comments: IGetComment[];
  totalTime: number;
  createdAt: Date;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User extends RegisterData {
  _id: string;
  image: ImageCloudinary;
  recipes: string[];
  favorites: string[];
}

export type LoginData = {
  email: string;
  password: string;
};

export type UserData = {
  token: string;
  user: User;
};

export interface IComment {
	text: string;
	author: string;
}

export interface IGetComment {
  _id: string;
  text: string;
  createdAt: Date;
  author: User;
}

export interface IPostComment {
	idRecipe: string;
	comment: IComment;
}

export interface IFavRecipe {
	idRecipe: string;
	idUser: string;
}