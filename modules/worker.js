import '../lib/Constants'

export default {
    roles: ['harvester', 'builder', 'upgrader', 'defender', 'attacker'],

    create: (spawn, body, role) => {
        const newName = role + Game.time

        if (Game.spawns[spawn].canCreateCreep(body) === OK) {
            console.log('Spawning new worker: ' + newName)

            return Game.spawns[spawn].spawnCreep(body, newName, { memory: { role: role } })
        }
    },

    buildBody: (resources) => {
        if (resources < 400) {
            return [WORK, CARRY, MOVE]
        } else if (resources < 600) {
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
        } else {
            return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
        }
    },

    changeRole: (creep, newRole) => {
        console.log(`${creep.name} changing role to ${newRole}`)
        creep.memory.role = newRole
    },

    harvest: (creep) => {
    // How can I improve this?
        var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } })
        }
    },

    upgrade: function (creep) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } })
        }
    },

    build: (creep) => {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }

}
