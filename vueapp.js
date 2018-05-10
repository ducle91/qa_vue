// first div
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
// second div
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})
// third div
var app3 = new Vue({
  el: '#app-3',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
// fourth div
var app4 = new Vue({
  el: '#app-4',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

// cool graphics
new Vue({
  el: '#app5',
  data: function () {
    var defaultSides = 10
    var stats = Array.apply(null, { length: defaultSides })
      .map(function () { return 100 })
    return {
      stats: stats,
      points: generatePoints(stats),
      sides: defaultSides,
      minRadius: 50,
      interval: null,
      updateInterval: 500
    }
  },
  watch: {
    sides: function (newSides, oldSides) {
      var sidesDifference = newSides - oldSides
      if (sidesDifference > 0) {
        for (var i = 1; i <= sidesDifference; i++) {
          this.stats.push(this.newRandomValue())
        }
      } else {
        var absoluteSidesDifference = Math.abs(sidesDifference)
        for (var i = 1; i <= absoluteSidesDifference; i++) {
          this.stats.shift()
        }
      }
    },
    stats: function (newStats) {
      TweenLite.to(
        this.$data,
        this.updateInterval / 1000,
        { points: generatePoints(newStats) }
      )
    },
    updateInterval: function () {
      this.resetInterval()
    }
  },
  mounted: function () {
    this.resetInterval()
  },
  methods: {
    randomizeStats: function () {
      var vm = this
      this.stats = this.stats.map(function () {
        return vm.newRandomValue()
      })
    },
    newRandomValue: function () {
      return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
    },
    resetInterval: function () {
      var vm = this
      clearInterval(this.interval)
      this.randomizeStats()
      this.interval = setInterval(function () {
        vm.randomizeStats()
      }, this.updateInterval)
    }
  }
})

function valueToPoint(value, index, total) {
  var x = 0
  var y = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos = Math.cos(angle)
  var sin = Math.sin(angle)
  var tx = x * cos - y * sin + 100
  var ty = x * sin + y * cos + 100
  return { x: tx, y: ty }
}

function generatePoints(stats) {
  var total = stats.length
  return stats.map(function (stat, index) {
    var point = valueToPoint(stat, index, total)
    return point.x + ',' + point.y
  }).join(' ')
}