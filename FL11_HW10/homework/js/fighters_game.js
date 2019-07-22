let Fighter = function (obj) {
  const name = obj.name,
        damage = obj.damage,
        agility = obj.agility,
        totalHp = obj.hp;

  let hp = obj.hp,
      wins = 0,
      loses = 0;

  this.getName = function () {
    return name;
  };
  this.getDamage = function () {
    return damage;
  };
  this.getAgility = function () {
    return agility;
  };
  this.getHealth = function () {
    return hp;
  };

  this.attack = function (defender) {
    let min = 0,
        max = 100,
        rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);

    if (defender.getAgility() > rand) {
      console.log(`${this.getName()} attack missed`);
    } else {
      defender.dealDamage(this.getDamage());
      console.log(`${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}`);
    }
  };

  this.logCombatHistory = function () {
    console.log(`Name: ${this.getName()}, Wins: ${wins}, Losses: ${loses}`);
  };

  this.heal = function (healthPoints) {
    if (hp + healthPoints > totalHp) {
      hp = totalHp;
    } else {
      hp += healthPoints;
    }
  };

  this.dealDamage = function (healthPoints) {
    if (this.getHealth() - healthPoints < 0) {
      hp = 0;
    } else {
      hp -= healthPoints;
    }
  };

  this.addWin = function () {
    wins += 1;
  };

  this.addLoss = function () {
    loses += 1;
  };
}

function battle (obj1, obj2) {
  if (obj1.getHealth() <= 0) {
    console.log(`${obj1.getName()} is dead and can't fight.`);
  }

  if (obj2.getHealth() <= 0) {
    console.log(`${obj2.getName()} is dead and can't fight.`);
  }

  while (obj1.getHealth() > 0 && obj2.getHealth() > 0) {
    obj1.attack(obj2);
    if (obj2.getHealth() <= 0) {
      obj1.addWin();
      obj2.addLoss();
      return;
    }

    obj2.attack(obj1);
    if (obj1.getHealth() <= 0) {
      obj2.addWin();
      obj1.addLoss();
      return;
    }
  }
}

const fighter1 = new Fighter({
  name: 'John',
  damage: 20,
  agility: 25,
  hp: 100
});

const fighter2 = new Fighter({
  name: 'Jim',
  damage: 10,
  agility: 40,
  hp: 120
});