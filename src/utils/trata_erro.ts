import { NaoAutorizado } from './error_nao_autorizado'
import { ValidacaoForms } from './error_validacao'

export function formataErros (res: any, erro: any) {
  if (erro instanceof NaoAutorizado) {
    return res.status(401).json({
      message: erro.message,
      status: erro.status
    })
  } else if (erro instanceof ValidacaoForms) {
    return res.status(500).json({
      message: erro.message,
      campos: erro.fields
    })
  } else if (erro.name && erro.name === 'SequelizeValidationError') {
    var campos = []
    erro.errors.map(function (err: any) {
      campos.push({
        campo: err.path,
        message: err.message
      })
    })
    return res.status(500).json({
      message: 'Erro validando dados',
      campos: campos
    })
  } else if (erro instanceof Error) {
    if (erro.message) {
      return res.status(500).json({
        message: erro.message
      })
    } else {
      return res.status(500).json(erro)
    }
  } else {
    return res.status(500).json(erro)
  }
}
