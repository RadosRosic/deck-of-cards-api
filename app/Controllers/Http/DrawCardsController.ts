import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Card from 'App/Models/Card'
import Pile from 'App/Models/Pile'
import DrawCardsService from 'App/services/DrawCardsService'

export default class DrawCardsController {
    public async draw({ request, response }: HttpContextContract) {
        const { deckId, fromPileName, toPileName, amount } = request.body()

        if (!deckId || !fromPileName) {
            return response.status(400).send({ ok: false, message: "deckId and fromPileName are mandatory params." })
        }

        if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
            return response.status(400).send({ ok: false, message: "Amount must be a valid number and greater than 0" })
        }

        const fromPile = await Pile.query().where((query) => {
            query
                .where('deck_external_id', "=", deckId)
                .where('name', "=", fromPileName)
        }).first()

        if (!fromPile) {
            return response.status(400).send({ ok: false, message: "No such deck or pile." })
        }

        let toPile = await Pile.query().where((query) => {
            query
                .where('deck_external_id', "=", deckId)
                .where('name', "=", toPileName)
        }).first()

        if (!toPile) {
            toPile = await Pile.create({ deckExternalId: deckId, name: toPileName })
            toPile.save()
            console.log('toPileId', toPile.id)
        }

        const fromCards = await Card.query().where("pile_id", "=", fromPile.id)
        const toCards = toPile ? await Card.query().where("pile_id", "=", toPile.id) : []
        const { updatedFromCards, updatedToCards, drawnCardsCodes } = DrawCardsService.draw({ fromCards, toCards, amount, toCardsId: toPile.id })

        for (const card of updatedFromCards) {
            await card?.save?.()
        }

        for (const card of updatedToCards) {
            await card?.save?.()
        }

        const cards = await Database.from('basic_cards').select('code', 'suit', 'rank', 'img').whereIn('code', drawnCardsCodes)

        return response.status(200).send({ ok: true, cards })

    }
}
