import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pile from './Pile'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public externalId: string

  @column()
  public userId: string | null

  @hasMany(() => Pile)
  public pile: HasMany<typeof Pile>

  @column.dateTime({ autoCreate: true })
  public lastUsed: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
