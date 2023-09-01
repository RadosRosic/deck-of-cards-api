import Card from "App/Models/Card";

export default class DrawCardsService {
    public static draw(options: { fromCards: Card[], toCards: Card[], toCardsId: number, amount: number }) {
        const { fromCards, toCards, toCardsId, amount } = options;
        const fromCardsCopy = [...fromCards]
        const toCardsCopy = [...toCards] || []

        const drawnCards = fromCardsCopy.splice(0, amount);
        toCardsCopy.unshift(...drawnCards)

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

