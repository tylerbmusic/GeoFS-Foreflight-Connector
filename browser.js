let failedPackets = 0;
setInterval(async () => {
    let vel = window.geofs.aircraft.instance.rigidBody.v_linearVelocity;
    try {
    await fetch(`http://localhost/udp?str=XGPSGeoFS,${geofs.aircraft.instance.llaLocation[1].toFixed(3)},${geofs.aircraft.instance.llaLocation[0].toFixed(3)},${geofs.animation.values.altitudeMeters.toFixed(1)},${((Math.atan2(vel[0], vel[1]) * 180) / Math.PI).toFixed(3)},${geofs.animation.values.groundSpeed.toFixed(1)}`);
    } catch (e) {
        failedPackets++; //just in case :)
    }
}, 1000); //GPS Data, 1HZ

setInterval(async () => {
    try {
    await fetch(`http://localhost/udp?str=XATTGeoFS,${geofs.animation.values.heading360.toFixed(3)},${geofs.animation.values.atilt},${-geofs.animation.values.aroll}`);
    } catch (e) {
        failedPackets++;
    }
}, 250); //Attitude Data, 4HZ
