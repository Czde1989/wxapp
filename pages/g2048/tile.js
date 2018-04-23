function Tile(pos, val) {
  this.x = pos.x;
  this.y = pos.y;
  this.value = val || 2;
}

Tile.prototype = {

  // 记录格子上次的位置
  savePosition: function () {
    this.previousPosition = {
      x: this.x,
      y: this.y
    }
  },

  // 更新当前格子的位置 
  updatePosition: function (pos) {
    this.x = pos.x;
    this.y = pos.y;
  },

  serialize: function () {
    return {
      position: {
        x: this.x,
        y: this.y
      },
      value: this.val
    }
  }
}

module.exports = Tile;