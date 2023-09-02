# Deck of Cards API

This app is an API simulating a deck of cards. Supports creating of decks and piles, shuffling, drawing, and viewing cards.

There are no scores, values, or rules. Those should be implemented separately.

## Setup

### Clone the repo

    git clone git@github.com:RadosRosic/deck-of-cards-api.git

### Install the needed dependencies.

    npm install

### Configure Lucid ORM

    node ace configure @adonisjs/lucid

You can select any database. My suggestion is PostgreSQL.

After selecting the db, an .env file will be created.

**This will not create the database!**

### Edit .env file

Edit .env file and enter your own database name, username, and password.

### Run database migrations

    node ace migration:run

### Run database seeder

    node ace db:seed

### Start the application

    node ace serve --watch

## Routes and how to use

All routes use POST method and are prefixed with /api

### New Deck

Route: `/new-deck`

The request takes 2 optional parameters in body.

    shuffle?: boolean
    pileName?: string

`shuffle` controls weateher the deck will be shuffled or a brand new deck.

If it's set to `false` the deck generated will be in order of spades, diamonds, clubs, hearts. Ace, two, three ... up to the King.

Defaults to `true`.

`pileName` sets the name of initial pile which contains all cards from the deck.

Defaults to `BasePile`.

Example response:

    {
        "ok": true,
        "shuffle": false,
        "deckId": "05b9271e-29c8-46f6-87e5-c0873d7c52cc",
        "pileName": "BasePile"
    }

### Draw Card

Route: `/draw`

There are 3 mandatory parameters and 1 optional.

    deckId: UUID,
    fromPileName: string
    toPileName: string
    amount?: number

`deckId` must be a valid deck id.

`fromPileName` must be as valid pile that belongs to deckId.

`toPileName` if a pile of that name exists it will be used, otherwise it will be created.

`amount` must be a number greater than 0. Defaults to 1.

Example response:

    {
        "ok": true,
        "cards": [
            {
                "code": "AC",
                "suit": "CLUBS",
                "rank": "Ace",
                "img": "http://127.0.0.1:3333/AC.svg"
            },
            {
                "code": "QH",
                "suit": "HEARTS",
                "rank": "Queen",
                "img": "http://127.0.0.1:3333/QH.svg"
            }
        ]
    }

### Shuffle

Route: `/shuffle`

There are 2 mandatory parameters.

    deckId: UUID
    pileName: string

`deckId` must be a valid deck id.

`pileName` must be as valid pile that belongs to deckId.

Example response:

    {
        "ok": true
    }

### View

Route: `/view`

There are 2 mandatory parameters and 1 optional

    deckId: UUID
    pileName: string
    count?: number

`deckId` must be a valid deck id.

`pileName` must be as valid pile that belongs to deckId.

`count` must be a number and greater than 0. Defaults to showing all cards in the pile.

Example response:

    {
        "ok": true,
        "cards": [
            {
                "code": "AH",
                "rank": "Ace",
                "suit": "HEARTS",
                "img": "http://127.0.0.1:3333/AH.svg"
            },
            {
                "code": "3D",
                "rank": "3",
                "suit": "DIAMONDS",
                "img": "http://127.0.0.1:3333/3D.svg"
            },
            {
                "code": "KC",
                "rank": "King",
                "suit": "CLUBS",
                "img": "http://127.0.0.1:3333/KC.svg"
            }
        ]
    }

## Error responses

Error responses will be in the following format:

    ok: false
    message?: string
