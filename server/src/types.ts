declare namespace Express {
  interface RequestWithUser extends Request {
    userId?: string;
  }
}

export interface IPayload {
	_id: string
	iat: number
	exp: number
}

export type Instruction = {
	order: number;
	step: string;
}

export type Ingredient = {
	id: number;
	type: string;
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
}

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	image: string;
}

export interface IRecipe {
	title: string;
	description: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	category: RecipeCategory;
}

export interface ImageRecipe {
	public_id: string;
	url: string;
}

export interface IUpdateRecipe extends IRecipe {
	image: ImageRecipe
}

export interface ICreateRecipe extends IRecipe {
	image: string
}