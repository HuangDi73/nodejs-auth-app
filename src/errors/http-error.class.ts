export class HTTPError extends Error {
	public statusCode: number;
	public context?: string;
	public message: string;

	constructor(statusCode: number, message: string, context?: string) {
		super(message);
		this.statusCode = statusCode;
		this.context = context;
		this.message = message;
	}
}
