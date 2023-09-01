import Card from "App/Models/Card";

export default class ShuffleService {
    public static shuffle(cards: Partial<Card>[]) {

        const cardsCopy = [...cards]

        for (let i = cardsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsCopy[i].position, cardsCopy[j].position] = [cardsCopy[j].position, cardsCopy[i].position];
        }
        return cardsCopy;
    }
}