export default [
	{
		title: 'Hello world!',
		source: `<h1>Hello {{name}}!</h1>

<p>This is a Svelte component. Switch to the <strong>output</strong> view to see the generated code.</p>
<p>You can interact with this component via your browser's console – try running the following:</p>

<pre><code>
component.set({ name: 'everybody' });
</code></pre>`,
		data: {
			name: "world"
		},
	},

	{
		title: 'If blocks',
		source: `{{#if foo}}
	<p>foo!</p>
{{else}}
	<p>not foo!</p>
{{/if}}`,
		data: {
			foo: true
		},
	},

	{
		title: 'Each blocks',
		source: `<h1>Cats of YouTube</h1>

<ul>
	{{#each cats as cat}}
		<li><a target='_blank' href='{{cat.video}}'>{{cat.name}}</a></li>
	{{/each}}
</ul>`,
		data: {
			cats: [
				{
					name: "Keyboard Cat",
					video: "https://www.youtube.com/watch?v=J---aiyznGQ"
				},
				{
					name: "Maru",
					video: "https://www.youtube.com/watch?v=z_AbfPXTKms"
				},
				{
					name: "Henri The Existential Cat",
					video: "https://www.youtube.com/watch?v=OUtn3pvWmpg"
				}
			]
		},
	},

	{
		title: 'Scoped styles',
		source: `<div class='foo'>
	Big red Comic Sans
</div>

<style>
	.foo {
		color: red;
		font-size: 2em;
		font-family: 'Comic Sans MS';
	}
</style>`,
		data: {},
	},

	{
		title: 'SVG Clock',
		source: `<svg viewBox='0 0 100 100'>

	<!-- first create a group and move it to 50,50 so
all co-ords are relative to the center -->
	<g transform='translate(50,50)'>
		<circle class='clock-face' r='48'/>

		<!-- markers every minute (major markers every 5 minutes) -->
		{{#each minor as tick, i}}
		<line class='minor' y1='42' y2='45' transform='rotate( {{ 360 * i / minor.length }} )'/>
		{{/each}}

		{{#each major as tick, i}}
		<line class='major' y1='35' y2='45' transform='rotate( {{ 360 * i / major.length }} )'/>
		{{/each}}

		<!-- hour hand -->
		<line class='hour' y1='2' y2='-20' transform='rotate( {{ 30 * hours + minutes / 2 }} )'/>

		<!-- minute hand -->
		<line class='minute' y1='4' y2='-30' transform='rotate( {{ 6 * minutes + seconds / 10 }} )'/>

		<!-- second hand -->
		<g transform='rotate( {{ 6 * seconds }} )'>
			<line class='second' y1='10' y2='-38'/>
			<line class='second-counterweight' y1='10' y2='2'/>
		</g>

	</g>

</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	.clock-face {
		stroke: #333;
		fill: white;
	}
	.minor {
		stroke: #999;
		stroke-width: 0.5;
	}
	.major {
		stroke: #333;
		stroke-width: 1;
	}
	.hour {
		stroke: #333;
	}
	.minute {
		stroke: #666;
	}
	.second, .second-counterweight {
		stroke: rgb(180,0,0);
	}
	.second-counterweight {
		stroke-width: 3;
	}
</style>

<script>
	export default {
		data () {
			return {
				// clock face markers - major (every 5 minutes) and minor (every minute)
				major: new Array( 12 ),
				minor: new Array( 60 ),
				time: new Date()
			};
		},

		computed: {
			hours: time => time.getHours(),
			minutes: time => time.getMinutes(),
			seconds: time => time.getSeconds()
		},

		oncreate () {
			this.interval = setInterval( () => {
				this.set({ time: new Date() });
			}, 1000 );
		},

		ondestroy () {
			clearInterval( this.interval );
		}
	};
</script>`,
		data: {},
	},

	{
		title: 'Line chart',
		source: `<!-- basic line chart -->

<div class='chart'>
	<h2>US birthrate by year</h2>

	<svg ref:svg>

		<g transform='translate(0,0)'>

			<g class='axes'>
				<!-- y axis -->
				<g class='axis y-axis' transform='translate(0, {{ padding.top }} )'>
					{{#each yTicks as tick}}

						<g class='tick tick-{{ tick }}' transform='translate( 0, {{ yScale(tick) - padding.bottom }} )'>

							<line stroke='#000' x2='100%' y1='0' y2='0'></line>

							<text fill='#000' x='0' y='0' dy='-2'>{{ tick !== 0 ? tick : ''}} {{tick === 20 ? ' per 1,000 population' : ''}}</text>
						</g>

					{{/each}}
				</g>
				<!-- x axis -->
				<g class='axis x-axis'>

					{{#each xTicks as tick}}

						<g class='tick tick-{{ tick }}' transform='translate( {{ xScale(tick) }}, {{ height }} )'>

							<line stroke='#000' y1='-{{height}}' y2='-{{padding.bottom}}' x1='0' x2='0'></line>

							{{#if width > 380}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ tick }}</text>
							{{else}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ formatMobile(tick) }}</text>
							{{/if}}
						</g>

					{{/each}}
				</g>
			</g>

			<!-- line -->
			<path class='path-line' d='{{ path }}'></path>
		</g>
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.tick,
	p.source {
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: #a11;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>

<script>
	import { scaleLinear } from 'd3-scale';

	export default {
		data () {
			return {
				padding: {
					top: 20,
					right: 15,
					bottom: 20,
					left: 25
				},
				height: 150,
				width: 500,
				yTicks: [0, 5, 10, 15, 20 ],
				xTicks: [1990, 1995, 2000, 2005, 2010, 2015],
				formatMobile ( tick ) {
					return "'" + tick.toString().slice(-2);
				}
			};
		},
		computed: {
			yScale: function ( padding, height, yTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
					.range([height - padding.bottom, padding.top]);
			},
			xScale: function ( padding, width, xTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, xTicks), Math.max.apply(null, xTicks)])
					.range([padding.left, width - padding.right]);
			},
			path ( myData, xScale, yScale ) {

				var path = '';

				// make path
				myData.forEach(function (datapoint, i) {
					var year = datapoint.year;

					if (i === 0) {
						path = 'M' + xScale(year) + ' ' + yScale(datapoint.birthrate) + ' ';
					} else {
						path += 'L ' + xScale(year) + ' ' + yScale(datapoint.birthrate) + ' ';
					}
				})

				return path;
			}
		},
		oncreate () {
			this.container = this.refs.svg;

			var self = this;
			window.addEventListener( 'resize', function () {
				self.resize();
			});
			this.resize();
		},
		methods: {
			resize () {
				this.set({
					width: this.container.getBoundingClientRect().width,
					height: this.container.getBoundingClientRect().height
				});
			}
		}
	};
</script>`,
		data: {
			myData: [
				{
					year: 1990,
					birthrate: 16.7
				},
				{
					year: 1995,
					birthrate: 14.6
				},
				{
					year: 2000,
					birthrate: 14.4
				},
				{
					year: 2005,
					birthrate: 14
				},
				{
					year: 2010,
					birthrate: 13
				},
				{
					year: 2015,
					birthrate: 12.4
				}
			]
		},
	},

	{
		title: 'Area chart',
		source: `<!-- responsive area chart -->

<div class='chart'>
	<h2>US birthrate by year</h2>

	<svg ref:svg>
		<g transform='translate(0,0)'>
			<g class='axes'>
				<!-- y axis -->
				<g class='axis y-axis' transform='translate(0, {{ padding.top }} )'>
					{{#each yTicks as tick}}

						<g class='tick tick-{{ tick }}' transform='translate( 0, {{ yScale(tick) - padding.bottom }} )'>

							<line stroke='#000' x2='100%' y1='0' y2='0'></line>

							<text fill='#000' x='0' y='0' dy='-2'>{{ tick !== 0 ? tick : ''}} {{tick === 20 ? ' per 1,000 population' : ''}}</text>
						</g>

					{{/each}}
				</g>
				<!-- x axis -->
				<g class='axis x-axis'>
					{{#each xTicks as tick}}

						<g class='tick tick-{{ tick }}' transform='translate( {{ xScale(tick) }}, {{ height }} )'>

							<line stroke='#000' y1='-{{height}}' y2='-{{padding.bottom}}' x1='0' x2='0'></line>

							{{#if width > 380}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ tick }}</text>
							{{else}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ formatMobile(tick) }}</text>
							{{/if}}
						</g>

					{{/each}}
				</g>
			</g>

			<!-- area shape -->
				<path class='path-area' d="{{ areaPath }}"></path>
		</g>
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.tick,
	p.source {
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-area {
		fill: #a11;
		stroke: transparent;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
		opacity: 0.65;
	}
</style>

<script>
	import { scaleLinear } from 'd3-scale';
	export default {
		data () {
			return {
				padding: {
					top: 20,
					right: 15,
					bottom: 20,
					left: 25
				},
				height: 200,
				width: 300,
				yTicks: [0, 5, 10, 15, 20 ],
				xTicks: [1990, 1995, 2000, 2005, 2010, 2015],
				formatMobile ( tick ) {
					return "'" + tick.toString().slice(-2);
				}
			};
		},
		computed: {
			yScale: function ( padding, height, yTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
					.range([height - padding.bottom, padding.top]);
			},
			xScale: function ( padding, width, xTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, xTicks), Math.max.apply(null, xTicks)])
					.range([padding.left, width - padding.right]);
			},
			areaPath ( myData, xScale, yScale ) {

				var path = '';
				var years = [];
				var initialpoint;

				// make path
				myData.forEach(function (datapoint, i) {
					var year = datapoint.year;
					years.push(year);

					if (i === 0) {
						path = 'M' + xScale(year) + ' ' + yScale(datapoint.birthrate) + ' ';
						initialpoint = 'L ' + xScale(year) + ' ' + yScale(datapoint.birthrate_all) + ' ';

					} else {
						path += 'L ' + xScale(year) + ' ' + yScale(datapoint.birthrate) + ' ';
					}
				})

				path += 'L ' + xScale(years[years.length-1]) + ' ' + yScale(0) + ' ' + 'L ' + xScale(years[0]) + ' ' + yScale(0) + ' ';

				return path;
			}
		},
		oncreate () {
			this.container = this.refs.svg;

			var self = this;
			window.addEventListener( 'resize', function () {
				self.resize();
			});
			this.resize();
		},
		methods: {
			resize () {
				this.set({
					width: this.container.getBoundingClientRect().width,
					height: this.container.getBoundingClientRect().height
				});
			}
		}
	};
</script>`,
		data: {
			myData: [
				{
					year: 1990,
					birthrate: 16.7
				},
				{
					year: 1995,
					birthrate: 14.6
				},
				{
					year: 2000,
					birthrate: 14.4
				},
				{
					year: 2005,
					birthrate: 14
				},
				{
					year: 2010,
					birthrate: 13
				},
				{
					year: 2015,
					birthrate: 12.4
				}
			]
		},
	},

	{
		title: 'Bar chart',
		source: `<!-- responsive bar chart -->

<div class='chart'>

	<h2>US birthrate by year</h2>

	<svg ref:svg>
		<g transform='translate(0,0)'>
			<g class='axes'>

				<!-- y axis -->
				<g class='axis y-axis' transform='translate(0, {{ padding.top }} )'>

					{{#each yTicks as tick}}
						<g class='tick tick-{{ tick }}' transform='translate( 0, {{ yScale(tick) - padding.bottom }} )'>

							<line stroke='#000' x2='100%' y1='0' y2='0'></line>

							<text fill='#000' x='0' y='0' dy='-2'>{{ tick !== 0 ? tick : ''}} {{tick === 20 ? ' per 1,000 population' : ''}}</text>

						</g>
					{{/each}}
				</g>

				<!-- x axis -->
				<g class='axis x-axis'>

					{{#each myData as datum, t}}

						<g class='tick tick-{{ tick }}' transform='translate( {{ (t * barWidth) + padding.left + barWidth/2 }}, {{ height }} )'>

							{{#if width > 380}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ datum.year }}</text>
							{{else}}
								<text fill='#000' x='0' y='0' dy='-2'>{{ formatMobile(datum.year) }}</text>
							{{/if}}
						</g>

					{{/each}}

				</g>
			</g>

			<g class='bars'>

				{{#each myData as datum, i}}
					<rect
							x='{{ (i * barWidth) + padding.left }}'
							y='{{ yScale(datum.birthrate) }}'
							width='{{ barWidth }}'
							height='{{ height - padding.bottom - yScale(datum.birthrate) }}'
					></rect>
				{{/each}}

			</g>
		</g>
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.tick,
	p.source {
		font-family: Helvetica, Arial;
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: white;
		stroke-width: 2;
		opacity: 0.65;
	}

</style>

<script>
	import { scaleLinear } from 'd3-scale';

	export default {
		data () {
			return {
				padding: {
					top: 20,
					right: 15,
					bottom: 20,
					left: 25
				},
				height: 200,
				width: 500,
				yTicks: [0, 5, 10, 15, 20 ],
				xTicks: [1990, 1995, 2000, 2005, 2010, 2015],
				formatMobile ( tick ) {
					return "'" + tick.toString().slice(-2);
				}
			};
		},
		computed: {
			barWidth: function (xScale, myData, width, padding) {
				var baseBarWidth = (xScale(myData[1].year) - xScale(myData[0].year));
				return baseBarWidth - (baseBarWidth/myData.length);
			},
			yScale: function ( padding, height, yTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
					.range([height - padding.bottom, padding.top]);
			},
			xScale: function ( padding, width, xTicks ) {
				return scaleLinear()
					.domain([Math.min.apply(null, xTicks), Math.max.apply(null, xTicks)])
					.range([padding.left, width - padding.right]);
			}
		},
		oncreate () {

			this.container = this.refs.svg;

			var self = this;

			window.addEventListener( 'resize', function () {
				self.resize();
			});

			this.resize();
		},
		methods: {
			resize () {
				this.set({
					width: this.container.getBoundingClientRect().width,
					height: this.container.getBoundingClientRect().height
				});
			}
		}
	};
</script>`,
		data: {
			myData: [
				{
					year: 1990,
					birthrate: 16.7
				},
				{
					year: 1995,
					birthrate: 14.6
				},
				{
					year: 2000,
					birthrate: 14.4
				},
				{
					year: 2005,
					birthrate: 14
				},
				{
					year: 2010,
					birthrate: 13
				},
				{
					year: 2015,
					birthrate: 12.4
				}
			]
		},
	},

	{
		title: 'Self-references',
		source: `<ul>
	<li>{{node.name}}
		{{#if node.children}}
			{{#each node.children as child}}
				<:Self node='{{child}}'/>
			{{/each}}
		{{/if}}
	</li>
</ul>`,
		data: {
			node: {
				name: "Fruit",
				children: [
					{
						name: "Red",
						children: [
							{ name: "Cherry" },
							{ name: "Strawberry" }
						]
					},
					{
						name: "Green",
						children: [
							{ name: "Apple" },
							{ name: "Pear" },
							{ name: "Lime" }
						]
					}
				]
			}
		},
	},

];
