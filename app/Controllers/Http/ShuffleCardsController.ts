import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShuffleCardsController {
    public async shuffle({ request, response }: HttpContextContract) {
        console.log(request, response)
    }

}
