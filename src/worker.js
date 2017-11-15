module.exports = {
  roles: ['harvester', 'builder', 'upgrader', 'defender', 'attacker'],
  
  create: (spawn, body, role) => {
    var newName = role + Game.time;
    if (Game.spawns[spawn].canCreateCreep(body) === OK) {
      console.log('Spawning new worker: ' + newName);
      return Game.spawns[spawn].spawnCreep(body, newName, { memory: { role: role } });
    }
  },
  
  buildBody: (resources) => {
    var body = [];
    var quantity = Math.floor(resources / 200);
    // var costs = { MOVE: 50, CARRY: 50, WORK: 100 }
    for (var index = 0; index < (quantity*2) + (quantity/2); index++) {
      if (body.length < quantity) {
        body.push(WORK);
      } else if (body.length < quantity+(quantity/2) ) {
        body.push(CARRY);
      } else {
        body.push(MOVE);
      }
    }
    return body;
  },
  
  changeRole: (creep, newRole) => {
    console.log(`${creep.name} changing role to ${newRole}`);
    creep.memory.role = newRole;
  },
  
  harvest: (creep) => {
    // How can I improve this?
    var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  },
  
  upgrade: function (creep) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  },
  
  build: (creep) => {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  }
  
};