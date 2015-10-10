module.exports = {
	name: "rose-thin-client",
	platform: "photon",
	dest: './',
	components: [
		// {
		// 	name: "rgb_sensor",
		// 	type: "[Model number here]"
		// 	//pins not needed because I2C
		// },
		{
			name: "neopixels",
			type: "neopixels",
			pins: {
				data: 'D3'
			},
			options: {
				length: 7,
				type: 'WS2812',
				sparkFunctions: ['pixels']
			}
		}
	]
}