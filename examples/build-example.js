module.exports = {
	name: "rose-thin-client",
	platform: "photon",
	components: [
		{
			name: "rgb_sensor",
			type: "[Model number here]"
			//pins not needed because I2C
		},
		{
			name: "neopixels",
			type: "neopixels",
			pins: ['D3'],
			options: {
				length: 7
			}
		}
	]
}