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

        // TODO: add repair

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (targets.length) {
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                Worker.upgrade(creep);
            }
        } else {
            Worker.harvest(creep);
        }
    },
};
