module.exports = {
  /** @param {StructureTower} tower **/

  getTowers: () => {
    return Object.keys(Game.structures).map(id => Game.structures[id]).filter(structure => structure.structureType === STRUCTURE_TOWER);
  },

  run: (tower) => {
    if (!tower) { return; }
    
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
      });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }
    }
  }
  
};