import React from 'react';
import $ from 'jquery';

require('./Login.less');



var login = React.createClass({
	signin(){
		$.post('http://cnodejs.org/api/v1/accesstoken',{
			accesstoken: $('#code').val()
		},function(ret) {

			if(ret.success==true){
				localStorage.setItem('loginname',ret.loginname);
				localStorage.setItem('loginid',ret.id);
				localStorage.setItem('accesstoken',$('#code').val());
				localStorage.setItem('loginname',ret.loginname);
				this.props.history.pushState(null, '/me')
			}
		}.bind(this));
	},
	photoin(){
		navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia ||navigator.msGetUserMedia;

		navigator.getUserMedia({
			video: true
		}, gotStream.bind(this), noStream);



		function gotStream(stream) {
			this.video.src = URL.createObjectURL(stream);
			this.video.onerror = function() {
				stream.stop();
			};
			stream.onended = noStream;
			this.video.onloadedmetadata = function() {
				console.log('ok')
			};
		}

		function noStream() {
			alert('No camera available.');
		}
	},
	snapshot(){
		this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.video.videoWidth,this.video.videoHeight,0,0,this.video.videoWidth/3,this.video.videoHeight/3);
	},
	componentDidMount() {
		this.canvas = document.getElementById('photo');
		this.video = document.getElementById('monitor');
	},
	render() {
		return (
			<div className="login">
				<section id="app">
				  <p>
				  <video id="monitor" className='monitor' autoPlay></video> 
				  <canvas id="photo" className='photo'></canvas>
				  </p>
				</section>
				<div className='content'><input id='code' type='text'/></div>
				<div className='bottom'>
					<button onClick={this.signin}>登陆</button>
					<button onClick={this.photoin}>二维码</button>
				</div>
			</div>
		);
	}
});

export default login;