import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BasicCard from 'App/Models/BasicCard';
import Env from "@ioc:Adonis/Core/Env";

export default class extends BaseSeeder {
  public async run() {
    const url = Env.get('URL') || "http://127.0.0.1"
    const port = Env.get("PORT") || "3333"

    const suits = ['SPADES', 'DIAMONDS', 'CLUBS', 'HEARTS'];
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const cards: Partial<BasicCard>[] = []

    for (const suit of suits) {
      for (const rank of ranks) {
        const code = rank.charAt(0).concat(suit.charAt(0))
        const img = `${url}:${port}/${code}.svg`
        cards.push({
          suit, rank, code, img
        });
      }
    }

    await BasicCard.createMany(cards)
  }
}
