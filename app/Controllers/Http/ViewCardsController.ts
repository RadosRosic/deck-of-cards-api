import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Pile from 'App/Models/Pile'


export default class ViewCardsController {
    public async view({ request, response }: HttpContextContract) {
        const { deckId, pileName, count } = request.body()

        if (!deckId || !pileName) {
            return response.status(400).send({ ok: false, message: "deckId and pileName are mandatory params." })
        }

        if (count <= 0 || isNaN(count)) {
            return response.status(400).send({ ok: false, message: "Count must be a number and greater than 0!" })
        }

        const pile = await Pile.query().where((query) => {
            query
                .where('deck_external_id', "=", deckId)
                .where('name', "=", pileName)
        }).first()

        if (!pile) {
            return response.status(400).send({ ok: false, message: "No such deck or pile." })
        }

        const cards = await Database.from('cards')
            .join('basic_cards', 'cards.code', "=", "basic_cards.code")
            .select('basic_cards.code', 'basic_cards.rank', 'basic_cards.suit', 'basic_cards.img')
            .orderBy('position', 'asc')
            .limit(count)

        return response.status(200).send({ ok: true, cards })
    }
}
