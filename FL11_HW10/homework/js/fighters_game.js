/*
function Fighter (obj) {


  obj.wins = 0;
  obj.loses = 0;

  return {
    getName: function() {
      return obj.name;
    },

    getDamage: function() {
      return obj.damage;
    },

    getAgility: function() {
      return obj.agility;
    },

    getHealth: function() {
      return obj.hp;
    },

    attack: function( defender ) {
      if ( defender.getHealth() > 0 ) {
        let min = 0,
            max = 100,
            rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);

        if (defender.getAgility() > rand) {
          console.log(`${this.getName()} attack missed`);
        } else {
          defender.dealDamage( this.getDamage() );
          console.log(`${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}, ${defender.getName()} left ${defender.getHealth()}`);
        }

        //if (defender.getHealth() === 0) {
         // obj.wins = 1;
         // defender.loses = 1;
        //}
        //console.log('*', obj.wins, defender.getHealth());
      } else {
        console.log(`${defender.getName()} is dead and can't fight.`);
      }
    },

    logCombatHistory: function() {
      console.log( `Name: ${this.getName()}, Wins: ${obj.wins}, Losses: ${obj.loses}` );
    },

    heal: function(healthPoints) {
      obj.hp += healthPoints;
      console.log(`now ${this.getName()} hp: ${this.getHealth()}`);
    },

    dealDamage: function(healthPoints) {
      //console.log(`--\nbefore damage ${this.getName()} hp: ${this.getHealth()}`);
      if (this.getHealth() > 0) {
        obj.hp -= healthPoints;
      }
      //console.log(`after damage ${this.getName()} hp: ${this.getHealth()}\n--`);
    },

    addWin: function() {

    },
    
    addLoss: function() {

    }
  }
}



function battle (obj1, obj2) {
  //console.log('***', obj1.getHealth(), obj2.getHealth());
  while (obj1.getHealth() || obj2.getHealth()) {
    //console.log('*', obj1.getHealth(), obj2.getHealth());
    obj1.attack(obj2);
    obj2.attack(obj1);
    //console.log('**', obj1.getHealth(), obj2.getHealth());
    //console.log(`${obj1.getName()} hp: ${obj1.getHealth()} ${obj2.getName()} hp: ${obj2.getHealth()}`);
  }
}*/

//const Combat = () => {

let Fighter = function(obj) {

  let name = obj.name,
      damage = obj.damage,
      agility = obj.agility,
      hp = obj.hp;

  /*
class Fighter {
  constructor(obj) {
    this._name = obj.name;
    this._damage = obj.damage;
  }*/

  /*
  Object.defineProperties(this, {
      'name': {
        value: obj.name
      },
      'damage': {
        value: obj.damage
      },
      'agility': {
        value: obj.agility
      },
      'hp': {
        value: obj.hp
      },
  });*/

    //this.name = obj.name;
   /* this.damage = obj.damage;
    this.agility = obj.agility;
    this.hp = obj.hp;*/
    //this.wins    = 0;
    //this.loses   = 0;


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
      if (defender.getHealth() > 0) {
        let min = 0,
          max = 100,
          rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);

        if (defender.getAgility() > rand) {
          console.log(`${this.getName()} attack missed`);
        } else {
          defender.dealDamage(this.getDamage());
          console.log(`${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}, ${defender.getName()} left ${defender.getHealth()}`);
        }

        //if (defender.getHealth() === 0) {
        // obj.wins = 1;
        // defender.loses = 1;
        //}
        //console.log('*', obj.wins, defender.getHealth());
      } else {
        console.log(`${defender.getName()} is dead and can't fight.`);
      }
    };
    this.logCombatHistory = function () {
      console.log(`Name: ${this.getName()}, Wins: ${obj.wins}, Losses: ${obj.loses}`);
    };
    this.heal = function (healthPoints) {
      obj.hp += healthPoints;
      console.log(`now ${this.getName()} hp: ${this.getHealth()}`);
    };
    this.dealDamage = function (healthPoints) {
      //console.log(`--\nbefore damage ${this.getName()} hp: ${this.getHealth()}`);
      if (this.getHealth() > 0) {
        obj.hp -= healthPoints;
      }
      //console.log(`after damage ${this.getName()} hp: ${this.getHealth()}\n--`);
    };
    this.addWin = function () {

    };
    this.addLoss = function () {

    };
}

Fighter.prototype.wins = 0;
Fighter.prototype.loses = 0;

/*
Fighter.prototype.getName = function() {
  return name;
};*/

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



  //battle(fighter1, fighter2);

  //battle(fighter1, fighter2);

  //fighter1.getHealth();

  //fighter2.getHealth();

  //fighter2.heal(50);
//}

//document.addEventListener('DOMContentLoaded', Combat);