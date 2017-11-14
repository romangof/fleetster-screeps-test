var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');

var Worker = require('worker');

module.exports.loop = function () {
  
  // Clean memory
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  
  // List workers
  var workers_lists = {
    harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
    upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
    builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
  }
  
  // Create workers
  if (workers_lists.harvesters.length < 4) {
    Worker.create(Game.spawns['Spawn1'].room.energyCapacityAvailable, 'harvester')
  }
  else if (workers_lists.upgraders.length < 2) {
    Worker.create(Game.spawns['Spawn1'].room.energyCapacityAvailable, 'upgrader')
  }
  else if (workers_lists.builders.length < 2) {
    Worker.create(Game.spawns['Spawn1'].room.energyCapacityAvailable, 'builder')
  }
  
  
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      { align: 'left', opacity: 0.8 });
    }
    
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }
      if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }
      if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }
      creep.memory.last_pos = creep.pos
    }
  }