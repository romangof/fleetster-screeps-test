const builder = require('./role.builder');
const harvester = require('./role.harvester');
const upgrader = require('./role.upgrader');
const Tower = require('./tower');
const Worker = require('./worker');

const role = { builder, harvester, upgrader };

function cleanMemory() {
    Object.keys(Memory.creeps).forEach(name => {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];

            console.log('Clearing non-existing creep memory:', name);
        }
    });
}

function createWorkers(workerLists) {
    _.forEach(Object.keys(workerLists), worker => {
        if (workerLists[worker].length < 3) {
            Worker.create('Spawn1', Worker.buildBody(Game.spawns.Spawn1.room.energyAvailable), worker.slice(0, -1));
        }
    });

    // Text when spawning
    if (Game.spawns.Spawn1.spawning) {
        const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name];
        Game.spawns.Spawn1.room.visual.text(
            `🛠️${spawningCreep.memory.role}`,
            Game.spawns.Spawn1.pos.x + 1,
            Game.spawns.Spawn1.pos.y,
            { align: 'left', opacity: 0.8 },
        );
    }
}

function createRoad(room, path) {
    room.visual.poly(path, { stroke: '#00ff00', lineStyle: 'dashed', strokeWidth: 0.15 });

    _.forEach(path, pathCoordinates => room.createConstructionSite(pathCoordinates.x, pathCoordinates.y, STRUCTURE_ROAD));
}

function createCommonRoads(room) {
    const sources = room.find(FIND_SOURCES_ACTIVE, source => ({ pos: source.pos, range: 1 }));
    const controllerPath = room.findPath(Game.spawns.Spawn1.pos, room.controller.pos, { range: 1, ignoreCreeps: true });

    const paths = [controllerPath, ..._.map(sources, source => room.findPath(Game.spawns.Spawn1.pos, source.pos, { range: 1, ignoreCreeps: true }))];

    _.forEach(paths, path => createRoad(room, path));
}

module.exports.loop = function() {
    cleanMemory();

    // List workers
    const workerLists = {
        builders:   _.filter(Game.creeps, creep => creep.memory.role === 'builder'),
        upgraders:  _.filter(Game.creeps, creep => creep.memory.role === 'upgrader'),
        harvesters: _.filter(Game.creeps, creep => creep.memory.role === 'harvester'),
    };

    // Create workers (To be wraped in another loop when there are more spawns)
    createWorkers(workerLists);

    // TODO: store path in memory
    createCommonRoads(_.first(Object.values(Game.rooms)));

    // TODO: createExtensions()

    // Run creeps per role
    _.forEach(Object.keys(Game.creeps), name => {
        const creep = Game.creeps[name];
        role[creep.memory.role].run(creep);
    });

    // Run towers
    Tower.getTowers().forEach(tower => Tower.run(tower));
};
