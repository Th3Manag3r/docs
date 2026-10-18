function random(min, max) {
    return Math.trunc((Math.random() * (max - min + 1)) + min);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

const mine = {};
const other = {};

function addToMap(map, value) {
    if (!map[value]) map[value] = 0;
    map[value] += 1;
}

const min = 1, max = 5;
const maxlo = 1000000;
for (let i = 0; i < maxlo; i++) {
    addToMap(mine, random(min, max));
    addToMap(other, randomInteger(min, max));
    console.log(`\r${i} / ${maxlo} - ${i * 100 / maxlo}%`)
}

function calc(map, title) {
    console.log(`===== ${title} =====`)
    let counter = 0;
    for (let k in map) {
        counter += map[k];
    }

    Object.keys(map).forEach(k => {
        console.log(`${k}: ${map[k] * 100 / counter}%`)
    })
}

calc(mine, "mine");
calc(other, "other");
