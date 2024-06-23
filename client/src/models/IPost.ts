import {IUser} from "./IUser";

export interface IPost {
	owner: {
		id: number;
		nickname: string;
	}
	likes: Omit<IUser, 'isActivated' | 'email'>[];
	id: number;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}