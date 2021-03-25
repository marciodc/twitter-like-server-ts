import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript'

@Table({tableName: 'token', underscored: true, timestamps: false})
export class Token extends Model {

  @PrimaryKey
  @Column
  public token: string

  @Column
  public userId!: string

}