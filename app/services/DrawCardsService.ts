import Card from "App/Models/Card";

type Side = 'top' | 'bot'

export default class DrawCardsService {
    public static draw(options: { fromCards: Card[], toCards: Card[], toCardsId: number, amount: number, fromSide: Side, toSide: Side }) {
        const { fromCards, toCards, toCardsId, amount, fromSide, toSide } = options;
        const fromCardsCopy = [...fromCards]
        const toCardsCopy = [...toCards] || []

        const drawnCards = fromSide === 'top' ?
            fromCardsCopy.splice(0, amount) :
            fromCardsCopy.splice(-amount)

        switch (toSide) {
            case "top":
                toCardsCopy.unshift(...drawnCards)
                break;
            case "bot":
                toCardsCopy.push(...drawnCards)
                break
        }

        fromCardsCopy.forEach((card, i) => card.position = i + 1)
        toCardsCopy.forEach((card, i) => {
            card.position = i + 1;
            card.pileId = toCardsId;
        })

        const drawnCardsCodes = drawnCards.map(card => card.code)

        return { drawnCardsCodes, updatedFromCards: fromCardsCopy, updatedToCards: toCardsCopy }
    }

    public static updatePositionsAndPiles() {

    }
}

