const Worker = require('./worker');

module.exports = {
    /** @param {Creep} creep * */
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading) {
            // TODO: Creeps should harvest if there's nothing else to do, even if max 
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
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }

                _.set(creep, 'memory.upgrading', creep.carry.energy > 0);
            } else {
                // TODO: this seems it never sets to false, beware
                _.set(creep, 'memory.upgrading', true);
                Worker.upgrade(creep);
            }
        }
    },
};
