export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}
 export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";
  }
}
