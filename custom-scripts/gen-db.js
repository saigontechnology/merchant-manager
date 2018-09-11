const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

function generateDb() {
  const fn = ['Rudy', 'Paul', 'Susan', 'John', 'Sam'];
  const ln = ['Hall', 'Rock', 'Min', 'Wick'];
  const booleans = [true, false];

  const bids = [];

  const merchants = Array.from({ length: 20 }).map((_, i) => {
    const firstname = fn[getRandomInt(0, fn.length)];
    const lastname = ln[getRandomInt(0, ln.length)];
    return {
      id: uuid(),
      created: new Date().getTime(),
      firstname,
      lastname,
      avatarUrl: `/avatar${getRandomInt(1, 6)}.png`,
      email: (firstname + '.' + lastname + i + '@gmail.com').toLowerCase(),
      phone: getRandomInt(1000000000, 9000000000),
      hasPremium: booleans[getRandomInt(0, booleans.length)],
      bids: Array.from({ length: getRandomInt(0, 10) }).map((_, j) => {
        const bid = {
          id: uuid(),
          carTitle: `Car Title ${i}${j}`,
          amount: getRandomInt(0, 5),
          created: new Date().getTime()
        };
        bids.push(bid);
        return bid.id;
      })
    };
  });

  return {
    merchants,
    bids
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

fs.writeFileSync(
  path.resolve(__dirname, '../db.json'),
  JSON.stringify(generateDb())
);
