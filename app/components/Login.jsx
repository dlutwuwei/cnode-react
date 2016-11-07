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
				this.props.history.push('/me')
			}
		}.bind(this));
	},
	photoin() {
		let self = this;
		let options = true;
		if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
			try {
				navigator.mediaDevices.enumerateDevices()
					.then((devices) => {
						devices.forEach((device, index) => {
							if (device.kind === 'videoinput') {
								if (device.label.toLowerCase().indexOf('back') > 0) {
									options = { 'deviceId': { 'exact': device.deviceId }, 'facingMode': 'environment', label: device.label };
								}
								console.log(device.deviceId, device.label);
							}
						});
						webcam(options);
					});
			} catch (e) {
				alert(e);
			}
		} else {
			webcam(options);
			console.log("no navigator.mediaDevices.enumerateDevices");
		}

		function noStream(e) {
			alert('no camera' + e);
		}

		function webcam(options) {
			navigator.getum = navigator.webkitGetUserMedia || navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			console.log(options);
			navigator.getum({
				video: options,
				audio: false
			}, gotStream.bind(self), noStream);
		}

		function gotStream(stream) {
			if (window.URL.createObjectURL) this.video.src = window.URL.createObjectURL(stream);
			else this.video.src = stream;
			this.video.onerror = () => {
				stream.stop();
			};
			stream.onended = noStream;
			this.video.onloadedmetadata = () => {
				console.log('ok');
			};
		}
	},
	snapshot() {
		this.canvas.getContext('2d').drawImage(this.video, 0, 0, 320, 240);
		qrcode.decode();
	},
	componentDidMount() {
		this.canvas = document.getElementById('qr-canvas');
		this.video = document.getElementById('monitor');
		this.file = document.getElementById('image');
		const self = this;
		self.canvas.getContext('2d').clearRect(0, 0, 320, 240);
		qrcode.callback = function(a) {
			console.log(a);
			document.getElementById('code').value = a;
		};
		qrcode.width = 320;
		qrcode.height = 240;

		this.file.addEventListener('change', function(e) {
			const resultFile = this.files[0];
			if (resultFile) {
				const fr = new FileReader();
				// onload fires after reading is complete
				fr.onload = function(e) {
					qrcode.decode(e.target.result);

					const img = new Image();
					img.src = e.target.result;
					img.crossOrigin = "Anonymous";
					img.onload = function() {
						self.canvas.getContext('2d').clearRect(0, 0, 320, 240);
						self.canvas.getContext('2d').drawImage(img, 0, 0, 320, 240);
					};
				};
				fr.readAsDataURL(resultFile);
			}

		});
	},
	fileshot() {
		this.file.click();
	},
	render() {
		return (
			<div className="login">
				<h1>登陆</h1>
				<section id="app">
					<p>
						<video id="monitor" className="monitor" autoPlay></video>
					</p>
				</section>
				<span>输入用户access-code：</span>
				<div className="content">
					<input id="code" type="text" />
					<button onClick={this.signin} className="am-btn-primary">登陆</button>
				</div>
				<div className="content">
					<button onClick={this.photoin} className="am-btn-primary">开启摄像头</button>
					<button onClick={this.snapshot} className="am-btn-primary">拍照识别</button>
					<button onClick={this.fileshot} className="am-btn-primary">文件识别</button>
					<input id="image" className="hide" type="file" />
				</div>
				<div className="monitor">
					<canvas id="qr-canvas" width="320" height="240"></canvas>
				</div>
			</div>
		);
	}
});
export default login;