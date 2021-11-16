// declare global {

// }
interface ResponseApi<D = any> extends Response {
	code?: number
	data?: D
	// status?: number
	// url?: string
}
