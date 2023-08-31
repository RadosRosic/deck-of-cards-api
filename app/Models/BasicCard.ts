import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Card from './Card'

export default class BasicCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public suit: string

  @column()
  public rank: string

  @column()
  public code: string
  @hasMany(() => Card, { foreignKey: 'code' })
  public card: HasMany<typeof Card>

  @column()
  public img: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
