import './modules'
import _ from 'lodash'

const role = {
    builder: require('role.builder'),
    upgrader: require('role.upgrader'),
    harvester: require('role.harvester')
}

const Worker = require('worker')
const Tower = require('tower')

module.exports.loop = function () {
    // Clean memory
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }

    // List workers
    var worker_lists = {
        builders: _.filter(Game.creeps, (creep) => creep.memory.role === 'builder'),
        upgraders: _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader'),
        harvesters: _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester')
    }

    // Create workers (To be wraped in another loop when there are more spawns)
    for (const worker in worker_lists) {
        if (worker_lists[worker].length < 3) {
            Worker.create('Spawn1', Worker.buildBody(Game.spawns.Spawn1.room.energyAvailable), worker.slice(0, -1))
        }
    }

    // Text when spawning
    if (Game.spawns.Spawn1.spawning) {
        const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name]
        Game.spawns.Spawn1.room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns.Spawn1.pos.x + 1, Game.spawns.Spawn1.pos.y, { align: 'left', opacity: 0.8 })
    }

    // Run creeps per role
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]
        role[creep.memory.role].run(creep)
    }

    // Run towers
    Tower.getTowers().forEach(tower => Tower.run(tower))
}
