import { AppError } from './error'

export class ValidacaoForms extends AppError {

  constructor (fields: any) {
    // Overriding both message and status code.
    super('Falha validando os dados', 300)
    // Saving custom property.
    this.fields = fields || {}
  }

}
