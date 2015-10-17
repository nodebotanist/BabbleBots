module.exports = {
  name: "led-client",
  platform: "photon",
  dest: '',
  components: [
    {
      name: "leds",
      type: "led",
      leds: [
        {
          name: 'led1',
          pin: 'D0',
          analog: false
        },
        {
          name: 'led2',
          pin: 'D1',
          analog: true
        }
      ]
    }
  ]
}