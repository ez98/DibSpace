// import request from './request';

let globalToken = null

export function setToken(token: string): void {
	globalToken = token
	localStorage.setItem('token', token)
}

export function getToken(): string {
	// if (globalToken) {
	// 	return globalToken
	// }
	globalToken = localStorage.getItem('token')
	return globalToken
}

export function clearToken(): void {
	globalToken = null
	localStorage.removeItem('token')
}
