import { Table, Model, Column, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { IMessage } from '../interfaces'
import { User } from './user'

@Table({tableName: 'message', underscored: true, timestamps: false})
export class Message extends Model implements IMessage {

  public id!: string

  @Column
  @ForeignKey(() => User)
  public userId!: string

  @Column
  public text!: string

  @Column
  public dateTime!: Date

  @Column
  public public!: Boolean

  @Column
  public color!: number

  @BelongsTo(() => User)
  public user: User

}