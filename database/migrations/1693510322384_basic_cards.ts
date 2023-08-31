import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'basic_cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('suit', ['SPADES', 'DIAMONDS', 'CLUBS', 'HEARTS']).notNullable()
      table.enu('rank', ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']).notNullable()
      table.string('code', 2).notNullable().unique()
      table.string('img').notNullable()

      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
