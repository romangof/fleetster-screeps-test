const Worker = require('./worker');

module.exports = {
    /** @param {Creep} creep * */
    run(creep) {
        if (creep.memory.building && creep.carry.energy === 0) {
            _.set(creep, 'memory.building', false);
            creep.say('🔄 harvest');
        }

        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            _.set(creep, 'memory.building', true);
            creep.say('🚧 build');
        }

        // TODO: make this nicer

        if (creep.memory.building) {
            const toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (toBuild.length) {
                if (creep.build(toBuild[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(toBuild[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const toRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax,
                });

                // should I sort?
                toRepair.sort((a, b) => a.hits - b.hits);

                if (toRepair.length > 0) {
                    if (creep.repair(toRepair[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(toRepair[0]);
                    }
                } else {
                    Worker.upgrade(creep);
                }
            }
        } else {
            Worker.harvest(creep);
        }
    },
};
