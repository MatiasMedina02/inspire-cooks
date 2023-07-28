export type Instruction = {
	order: number;
	step: string;
}

export type Ingredient = {
	id: number;
	type: string;
}

export type ImageRecipe = {
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
}

export interface IRecipe {
	title: string;
	description: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
  category: RecipeCategory;
}

export interface ICreateRecipe extends IRecipe {
  image: string
}

export interface IRecipeWithId extends IRecipe {
  _id: string;
  image: ImageRecipe;
  author: User
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User extends RegisterData {
  _id: string;
  image: string;
}

export type LoginData = {
  email: string;
  password: string;
};

export type UserData = {
  token: string;
  user: User;
};