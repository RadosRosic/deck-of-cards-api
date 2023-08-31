import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'piles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('deck_external_id').references('external_id').inTable('decks').notNullable()
      table.string('name').notNullable().defaultTo('BasePile')

      table.unique(['deck_external_id', 'name'])

      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
