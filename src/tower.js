module.exports = {
    /** @param {StructureTower} tower * */

    getTowers: () => Object.keys(Game.structures).map(id => Game.structures[id]).filter(structure => structure.structureType === STRUCTURE_TOWER),

    run: tower => {
        if (!tower) { return; }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        } else {
            const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: structure => structure.hits < structure.hitsMax,
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }
    },

};
