import { Table, Model, Column } from 'sequelize-typescript'
import { IFollowing } from '../interfaces/following'

@Table({tableName: 'following', underscored: true, timestamps: false})
export class Following extends Model implements IFollowing {

  public id!: string

  @Column
  public userId!: string

  @Column
  public followUserId!: string

}