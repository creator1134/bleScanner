function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

var delegate = {};
// device APIs are available
//
function onDeviceReady() {
	// Now safe to use device APIs


	var logToDom = function (message) {
		var e = document.createElement('label');
		e.innerText = message;

		var br = document.createElement('br');
		var br2 = document.createElement('br');
		document.body.appendChild(e);
		document.body.appendChild(br);
		document.body.appendChild(br2);

		window.scrollTo(0, window.document.height);
	};

	var delegate = new cordova.plugins.locationManager.Delegate();

	delegate.didDetermineStateForRegion = function (pluginResult) {

		logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

		cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' +
			JSON.stringify(pluginResult));
	};

	delegate.didStartMonitoringForRegion = function (pluginResult) {
		console.log('didStartMonitoringForRegion:', pluginResult);

		logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
	};

	delegate.didRangeBeaconsInRegion = function (pluginResult) {
		logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
		console.log(pluginResult);
		console.log(pluginResult.beacons[0].proximity);
	};

	var uuid = '4B54504C-5546-4F00-0000-000000000001';
	var identifier = 'UFO';
	var major = 2299;
	var minor = 6997;
	var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

	cordova.plugins.locationManager.setDelegate(delegate);

	// required in iOS 8+
	cordova.plugins.locationManager.requestWhenInUseAuthorization();
	// or cordova.plugins.locationManager.requestAlwaysAuthorization()

	cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
		.fail(function (e) {
			console.error(e);
		})
		.done();




	function stop() {
		var uuid = '4B54504C-5546-4F00-0000-000000000001';
		var identifier = 'UFO';
		var major = 2299;
		var minor = 6997;
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
		cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
			.fail(function (e) {
				console.error(e);
			})
			.done();

	}

}