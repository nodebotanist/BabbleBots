// needs: writePinSetup
module.exports = {
  supported: ['photon'],
  pinType: {
    INPUT: 0,
    OUTPUT: 1,
    ANALOG: 2,
    PWM: 3,
    SERVO: 4,
    I2C: 6
  }
};