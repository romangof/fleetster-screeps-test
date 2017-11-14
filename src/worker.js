function buildBody (resources) {
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
}

module.exports = {
  create: (resources, role) => {
    var newName = role + Game.time;
    var body = buildBody(resources);

    if (Game.spawns['Spawn1'].canCreateCreep(body) === OK) {
      console.log('Spawning new worker: ' + newName);
      Game.spawns['Spawn1'].spawnCreep(body, newName, { memory: { role: role } });
    }
  },
  
  changeRole: (creep, newRole) => {
    creep.memory.role = newRole;
  },
  
  harvest: (creep) => {
    // How can I improve this?
    var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    // if (creep.pos.x === creep.memory.last_pos.x && creep.pos.y === creep.memory.last_pos['y']) {
    //     creep.memory.source = 1
    // }
    if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  },
  
  upgrade: function (creep) {
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
  
};