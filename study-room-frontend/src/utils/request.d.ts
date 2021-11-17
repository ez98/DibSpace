type RequestType = <D>(url: string, option?: any) => Promise<ResponseApi<D>>
declare module 'utils/request' {
	const request: RequestType
	export default request
}
