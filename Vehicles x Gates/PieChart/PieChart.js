class PieChart {
  constructor (group, height, width) {
    this.group = group
    this.height = height
    this.width = width

    this.radius = Math.min(this.width, this.height) / 2

    this.colorScale = d3.scaleOrdinal(['#3FB5D5', '#B22492', '#DD4848', '#EDA52A',
      '#86A96C', '#AE3C16', '#1A7289'])
  }

  setData (data) {
    this.data = data

    var that = this

    var arc = d3.arc()
        .outerRadius(that.radius - 10)
        .innerRadius(0)

    var labelArc = d3.arc()
            .outerRadius(that.radius - 40)
            .innerRadius(that.radius - 40)

    var pie = d3.pie()
            .sort(null)
            .value(function (d) { return d.length }) // number of vehicles

    that.group = d3.select('.' + that.group.className.baseVal)

    var translate = that.group.attr('transform')
    translate = translate.substring(translate.indexOf('(') + 1, translate.indexOf(')')).split(',')

    that.group.attr('transform', `translate(${parseInt(translate[0]) - that.radius}, ${parseInt(translate[1]) - that.radius})`)
    var svg = that.group.append('svg')
                .attr('width', that.width)
                .attr('height', that.height)
                  .append('g')
                  .attr('transform', 'translate(' + that.radius + ',' + that.radius + ')')

    var g = svg.selectAll('.arc')
          .data(pie(that.data))
        .enter().append('g')
          .attr('class', 'arc')

    g.append('path')
          .attr('d', arc)
          .attr('fill', function (d, i) { return that.colorScale(i) })
          .attr('opacity', '0.5')
  }
}
