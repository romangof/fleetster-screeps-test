var role = {
  builder: require('role.builder'),
  upgrader: require('role.upgrader'),
  harvester: require('role.harvester')
}

var Worker = require('worker');
var Tower = require('tower');

module.exports.loop = function () {
  
  // Clean memory
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  
  // List workers
  var worker_lists = {
    harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
    upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
    builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
  }
  
  // Create workers (To be wraped in another loop when there are more spawns)
  for (let worker in worker_lists) {
    if (worker_lists[worker].length < 3) {
      Worker.create('Spawn1', Worker.buildBody(Game.spawns['Spawn1'].room.energyCapacityAvailable), worker.slice(0, -1));
    }
  }
  
  // Text when spawning
  if (Game.spawns['Spawn1'].spawning) {
    let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
  }

  // Run creeps per role
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    role[creep.memory.role].run(creep);
  }

  // Run towers
  Tower.getTowers().forEach( tower => Tower.run(tower) );

}