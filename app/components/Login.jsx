import React from 'react';
import $ from 'jquery';
import qrcode from '../utils/llqrcode';

require('./Login.less');

var login = React.createClass({
	signin() {
		$.post('//cnodejs.org/api/v1/accesstoken', {
			accesstoken: $('#code').val()
		}, function (ret) {

			if (ret.success == true) {
				localStorage.setItem('loginname', ret.loginname);
				localStorage.setItem('loginid', ret.id);
				localStorage.setItem('accesstoken', $('#code').val());
				localStorage.setItem('loginname', ret.loginname);
				this.props.history.push(location, '/me')
			}
		}.bind(this));
	},
	photoin() {
		var self = this;
		var options = true;
		if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
			try {
				navigator.mediaDevices.enumerateDevices()
					.then(function (devices) {
						devices.forEach(function (device,index) {
							if (device.kind === 'videoinput') {
								if(device.label.toLowerCase().indexOf("back") > 0){
									options = { 'deviceId': { 'exact': device.deviceId }, 'facingMode': 'environment',label: device.label};
								}
								console.log(device.deviceId,device.label)
							}
						});
						webcam(options)
					});



			}
			catch (e) {
				alert(e);
			}
		}
		else {
			webcam(options);
			console.log("no navigator.mediaDevices.enumerateDevices");
		}

		function webcam(options) {
			navigator.getum = navigator.webkitGetUserMedia || navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			console.log(options)
			navigator.getum({
				video: options,
				audio: false
			}, gotStream.bind(self), noStream);
		}

		function gotStream(stream) {
			if(window.URL.createObjectURL) this.video.src = window.URL.createObjectURL(stream);
			else this.video.src = stream;
			this.video.onerror = function () {
				stream.stop();
			};
			stream.onended = noStream;
			this.video.onloadedmetadata = function () {
				alert('ok')
			};
		}

		function noStream(e) {
			alert('no camera'+e);
		}
	},
	snapshot() {
		this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
		qrcode.decode();
	},
	componentDidMount() {
		this.canvas = document.getElementById('qr-canvas');
		this.video = document.getElementById('monitor');
	},
	render() {
		return (
			<div className="login">
				<h1>登陆</h1>
				<section id="app">
					<p>
						<video id="monitor" className='monitor' autoPlay></video>
						<canvas id="qr-canvas" className='photo'></canvas>
					</p>
				</section>
				<span>输入用户code：</span>
				<div className='content'>
					<input id='code' type='text'/>
					<button onClick={this.signin}>登陆</button>
					<button onClick={this.photoin}>二维码</button>
					<button onClick={this.snapshot}>识别</button>
				</div>
			</div>
		);
	}
});
export default login;