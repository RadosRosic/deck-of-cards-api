import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Deck from './Deck'
import Card from './Card'

export default class Pile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deckId: string
  @belongsTo(() => Deck)
  public deck: BelongsTo<typeof Deck>

  @column()
  public name: string

  @hasMany(() => Card)
  public card: HasMany<typeof Card>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
