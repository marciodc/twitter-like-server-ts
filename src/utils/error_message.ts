import { AppError } from './error'

export class ErroMessage extends AppError {

  constructor (message: string = null) {
    super('Erro', 500)
    this.message = message
  }

}