import { AppError } from './error'

export class NaoAutorizado extends AppError {

  constructor (message: string = null) {
    super('Não Autorizado', 401)
    this.message = message || 'Acesso não autorizado'
  }

}