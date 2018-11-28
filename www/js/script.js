function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// var uuid = '4B54504C-5546-4F00-0000-000000000001';
// var identifier = 'UFO';
// var major = 2299;
// var minor = 6997;
var uuid = 'undefined';
var identifier = 'UFO';
var minor = 'undefined';
var major = 'undefined';

var delegate = {};
// device APIs are available
//
function onDeviceReady() {
	// Now safe to use device APIs

	var delegate = new cordova.plugins.locationManager.Delegate();

	cordova.plugins.locationManager.isBluetoothEnabled().then(function (isEnabled) {
			console.log("isEnabled: " + isEnabled);
			if (isEnabled) {
				//cordova.plugins.locationManager.disableBluetooth();

				delegate.didRangeBeaconsInRegion = function (pluginResult) {

					if (pluginResult.beacons[0].proximity != 'undefined') {
						var proximity = pluginResult.beacons[0].proximity;
						console.log(pluginResult.beacons[0].proximity);
						if (proximity == 'ProximityImmediate' || proximity == 'ProximityNear' || proximity == 'ProximityFar') {
							alert('CALL STOP TRIP MAIN');

							var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

							cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
								.fail(function (e) {
									console.error(e);
								})
								.done();
						}
					}
				};

				var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

				cordova.plugins.locationManager.setDelegate(delegate);

				cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
					.fail(function (e) {
						console.error(e);
					})
					.done();

			} else {
				cordova.plugins.locationManager.enableBluetooth();

			}
		})
		.fail(function (e) {
			console.error(e);
		})
		.done();

}

onLoad();