# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pokedex clone displaying the first 150 Pokémon. Static website with vanilla HTML, CSS, and JavaScript.

## API

Fetches Pokémon data from [PokeAPI](https://pokeapi.co):
- List: `https://pokeapi.co/api/v2/pokemon?limit=150`
- Single: `https://pokeapi.co/api/v2/pokemon/{id}`

## Development

Open `index.html` directly in a browser, or use a local server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Structure

- `index.html` - Entry point, links CSS in head and JS before closing body tag
- `style.css` - Styles
- `main.js` - JavaScript
