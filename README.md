# 'The Grid' - Rougelike Dungeon Crawler (React and Redux)

A 2D Dungeon Crawler implemented in React and Redux, including `redux-thunk` and `redux-batched-actions` middleware.

Check out the live demo [here](https://thepeted.github.io/dungeon-crawler).


## Features
- Randomly generated map.  The viewport of the map is sized based on browser window size.

- You have health, a level, and a weapon. You can pick up a better weapon. You can pick up health items.

- All the items and enemies on the map are arranged at random.

- You can move throughout the map, discovering items.

- You can move anywhere within the map's boundaries, but you can't move through an enemy until you've beaten it.

- There is an optional 'fog mode' whereby spaces that are within a certain number of spaces from you are hidden.

- When you beat an enemy, the enemy goes away and you get XP, which eventually increases your level.

- When you fight an enemy, you take turns damaging each other until one of you loses. Damage based off of your level and your weapon. The enemy does damage based off of its level. Damage is somewhat random within a range.

- When you find and beat the boss, you win.

- The game should be challenging, but theoretically winnable.

## Run locally

Checkout this repo and
```
> npm install
> npm start
```
The game will be running at http://localhost:8080/
