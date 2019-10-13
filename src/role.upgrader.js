const Worker = require('./worker');

module.exports = {
    /** @param {Creep} creep * */
    run(creep) {
        if (creep.memory.upgrading && creep.carry.energy === 0) {
            _.set(creep, 'memory.upgrading', false);
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            _.set(creep, 'memory.upgrading', true);
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            Worker.upgrade(creep);
        } else {
            Worker.harvest(creep);
        }
    },
};
