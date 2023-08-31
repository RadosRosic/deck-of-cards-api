import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BasicCard from 'App/Models/BasicCard'
import Card from 'App/Models/Card'
import Deck from 'App/Models/Deck'
import Pile from 'App/Models/Pile'
import ShuffleService from 'App/services/ShuffleService'

export default class NewDecksController {
    public async create({ request, response }: HttpContextContract) {
        const { shuffle = true, pileName } = request.body()

        const deck = new Deck()
        await deck.save()

        const pile = new Pile()
        pile.deckExternalId = deck.externalId;
        if (typeof pileName === 'string') {
            pile.name = pileName
        }
        await pile.save()

        const basicCards = await BasicCard.query().select('code')
        const cards = basicCards.map((basicCard, i) => { return { ...basicCard.$attributes, position: i + 1, pileId: pile.id } })

        if (shuffle) {
            const shuffledCards = ShuffleService.shuffle(cards)
            await Card.createMany(shuffledCards)
        } else {
            await Card.createMany(cards)
        }

        return response.status(200).send({ ok: true, shuffle })
    }
}
