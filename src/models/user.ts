import { Table, Model, Column, HasMany } from 'sequelize-typescript'
import { IUser } from '../interfaces'
import { Message } from './message'

@Table({tableName: 'users', timestamps: false})
export class User extends Model implements IUser {

  public id!: string

  @Column
  public name!: string

  @Column
  public email!: string

  @Column
  public password!: string

  @HasMany(() => Message)
  public messages: Message[]

}