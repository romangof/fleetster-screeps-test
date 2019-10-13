module.exports = {
    roles: ['harvester', 'builder', 'upgrader', 'defender', 'attacker'],

    create: (spawn, body, role) => {
        if (Game.spawns[spawn].canCreateCreep(body) === OK) {
            const newName = role + Game.time;
            console.log(`Spawning new worker: ${newName}`);

            Game.spawns[spawn].spawnCreep(body, newName, { memory: { role } });
        }
    },

    buildBody: resources => {
        if (resources < 400) {
            return [WORK, CARRY, MOVE];
        }

        if (resources < 600) {
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        }

        return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    },

    // changeRole: (creep, newRole) => {
    //     console.log(`${creep.name} changing role to ${newRole}`);
    //     creep.memory.role = newRole;
    // },

    harvest: creep => {
    // How can I improve this?
        const sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },

    upgrade(creep) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },

    build: creep => {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    },

};
