const Worker = require('./worker');

module.exports = {
    /** @param {Creep} creep * */
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading) {
            Worker.harvest(creep);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => (
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER
                ) && structure.energy < structure.energyCapacity,
            });

            if (targets.length > 0) {
                // map resources available space and harvest energy by usage
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                _.set(creep, 'memory.upgrading', creep.carry.energy > 0);
                Worker.upgrade(creep);
            }
        }
    },
};
