import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pile from './Pile'
import BasicCard from './BasicCard'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pileId: number
  @belongsTo(() => Pile)
  public pile: BelongsTo<typeof Pile>

  @column()
  public code: string
  @belongsTo(() => BasicCard, { foreignKey: 'code' })
  public basicCard: BelongsTo<typeof BasicCard>

  @column()
  public position: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
