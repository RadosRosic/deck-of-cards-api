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
