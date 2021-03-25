export class AppError extends Error {

  public status: number
  public message: string
  public fields: any

  constructor (message?: string, status?: number, fields?: any) {
    super(message)
    this.name = this.constructor.name
    this.fields = fields
    Error.captureStackTrace(this, this.constructor)
    this.status = status || 500
  }

}
