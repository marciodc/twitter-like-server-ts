import { Request, Response } from 'express'
import { NextFunction } from "express-serve-static-core"
import { Token } from '../models'

export async function validaToken(
  request: Request,
  response: Response,
  next: NextFunction | undefined): Promise<void> {

  if (request.url === '/public' || request.url === '/user/signup' ||
      request.url === '/user/login' || request.url === '/user/login/google' ||
      request.url === '/user/login/facebook' ||
      request.url.substring(0, 10) === '/socket.io') {
    next()
    return
  }

  try {
    let authorization = request.headers['authorization']

    if (authorization) {
      authorization = authorization.toString().replace('Bearer', '').trim()

      if (authorization.match(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/m)) {
        const token = await Token.findOne({where: {token: authorization}})
        if (token) {
          next()
        } else {
          response.status(401).json({ result: false, message: 'Token nao localizado' })
        }
      } else {
        response.status(401).json({ result: false, message: 'Token inválido' })
      }
    } else {
      if (!authorization) {
        response.status(401).json({ result: false, message: 'Acesso negado' })
      }
    }
  } catch (e) {
    next(e)
  }

}
