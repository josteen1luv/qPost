import {IInitialLoginValues} from "./IInitialLoginValues";

export interface IInitialRegistrationValues extends IInitialLoginValues {
	nickname: string;
	confirmPassword: string
}