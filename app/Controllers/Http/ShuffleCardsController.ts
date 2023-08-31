import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Card from 'App/Models/Card'
import Pile from 'App/Models/Pile'
import ShuffleService from 'App/services/ShuffleService'

export default class ShuffleCardsController {
    public async shuffle({ request, response }: HttpContextContract) {
        const { deckId, pileName } = request.body()

        if (!deckId || !pileName) {
            return response.status(400).send({ ok: false, message: "deckId and pileName are mandatory params." })
        }

        const pile = await Pile.query().where((query) => {
            query
                .where('deck_external_id', "=", deckId)
                .where('name', "=", pileName)
        }).first()

        if (!pile) {
            return response.status(400).send({ ok: false, message: "No such deck or pile." })
        }

        const cards = await Card.query().where('pile_id', "=", pile.id)
        const shuffledCards = ShuffleService.shuffle(cards)

        for (const card of shuffledCards) {
            await card.save()
        }

        return response.status(200).send({ ok: true })
    }

}
