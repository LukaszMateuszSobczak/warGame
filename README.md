# War – Simple Card Game

This repository contains a **web‑based implementation of the classic *War* card game**.  The game pits you against the computer: two cards are drawn from a shuffled deck, and whichever card has the higher value wins the round.  The scores are tracked on screen and the deck is exhausted after 52 draws.

The project is built with plain **HTML**, **CSS** and **JavaScript** and uses the external **[Deck of Cards API](https://deckofcardsapi.com)** to supply a fresh deck and card images.  No frameworks are required, making this a great example of DOM manipulation and asynchronous JavaScript in the browser.

## Overview

The user interface is defined in the `index.html` file.  It contains buttons to shuffle a new deck and to draw cards, a title and score displays, and two slots where drawn cards are displayed:contentReference[oaicite:0]{index=0}.  Styling is provided by `style.css`, which sets a table‑themed background, uses a modern font, and defines simple animations for cards sliding in and out:contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}.  Game logic is encapsulated in `app.js`:

* When you click **“New deck, please!”**, the script calls the Deck of Cards API to create a new shuffled deck and stores its ID:contentReference[oaicite:3]{index=3}.  Scores are reset and the “Draw” button becomes active.
* Clicking **“Draw”** fetches two cards from the API using the stored deck ID:contentReference[oaicite:4]{index=4}.  The card images are displayed with sliding animations, and the remaining card count is updated.
* Card ranks are converted to numerical values (2 through Ace → 2–14) using a lookup table:contentReference[oaicite:5]{index=5}.  The values are compared and a modal briefly shows whether the computer or the player won the round, or if there was a tie:contentReference[oaicite:6]{index=6}.  Scores are incremented accordingly and displayed on screen.

### About this project

This small project was built as part of a **Scrimba** web‑development course.  Scrimba’s interactive screencasts make it easy to follow along and practise coding in real time.  You can learn more about the platform at [scrimba.com](https://scrimba.com).

## Features

* **New deck generation** – Shuffle a fresh 52‑card deck using the Deck of Cards API:contentReference[oaicite:7]{index=7}.
* **Card drawing** – Draw two cards at once and display their images and values:contentReference[oaicite:8]{index=8}.
* **Animated UI** – Cards slide into view and slide out when new ones are drawn; scores update dynamically:contentReference[oaicite:9]{index=9}.
* **Score tracking** – Keeps running totals for the player and the computer and resets when a new deck is requested:contentReference[oaicite:10]{index=10}.
* **Modal notifications** – Briefly displays messages indicating who won each round or if there is a tie:contentReference[oaicite:11]{index=11}.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/LukaszMateuszSobczak/warGame.git
   cd warGame
