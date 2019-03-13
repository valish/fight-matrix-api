
# FightMatrix API
Crawls and parses fighter data from FightMatrix.com

*This api is used in the higher-level [MMA API](https://github.com/valish/mma-api).

## Install
From source:

```bash
git clone https://github.com/valish/fight-matrix-api
cd fight-matrix-api
npm install
```
From npm:

`npm install fight-matrix`

## Use
```node
> var fightMatrix = require('fight-matrix');
> var url = "http://www.fightmatrix.com/fighter-profile/Ronda+Rousey/74813/"
> fightMatrix.getFighter(url, function(data) {
    console.log(data);
  });
> {...}
```
