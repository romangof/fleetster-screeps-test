var Worker = require('worker');

module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading) {
      Worker.harvest(creep);
    } else {
      let targets = creep.room.find(FIND_STRUCTURES, { 
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
        creep.memory.upgrading = creep.carry.energy > 0 ? true:false;
      } else {
        creep.memory.upgrading = true;
        Worker.upgrade(creep);
      }
    }
  }
};