export interface IApiError extends Error{
	status: number,
	errors: unknown[]
}