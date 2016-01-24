module.exports = {
  name: "internet-button-client",
  platform: "photon",
  dest: './',
  components: [
    // {
    //  name: "rgb_sensor",
    //  type: "[Model number here]"
    //  //pins not needed because I2C
    // },
    {
      name: "internet-button",
      type: "internetbutton",
      options: {
        legacy: true,
        buttonDelay: 400,
        customFunctions: ['pixels']
      }
    }
  ]
}