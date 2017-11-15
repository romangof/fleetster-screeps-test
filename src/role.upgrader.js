var Worker = require('worker');

var roleUpgrader = {
  
  /** @param {Creep} creep **/
  run: function(creep) {
    
    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }
    
    if(creep.memory.upgrading) {
      Worker.upgrade(creep);
      // if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        // }
    } else {
      Worker.harvest(creep);
      // var sources = creep.room.find(FIND_SOURCES);
      // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      // }
    }
	}
};

module.exports = roleUpgrader;