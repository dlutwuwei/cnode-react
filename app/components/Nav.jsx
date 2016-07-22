import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

require('./Nav.less');

export default React.createClass({
	getInitialState() {
		return {
			maxWidth: 320 
		};
	},
	fold(){
		$('.header .container').removeClass('moveright').addClass('moveleft');
		setTimeout(function(){
			$('.header .container').hide();
		},500)
	},
	unfold(){
		$('.header .container').show().removeClass('moveleft').addClass('moveright');
	},
	renderNavLst(){
		const accesstoken = localStorage.getItem('accesstoken');
		var head;
		if(accesstoken){
			head = <div className="nav-login">
						<a href="#/me">
							<img src={localStorage.getItem('avatar_url')} alt=""/>
							<span>{localStorage.getItem('loginname')}</span>
						</a>
					</div>
		}else{
			head = <div className="nav-login">
						<a href="#/login" className='fa-arrow-circle-right'>登陆</a>
					</div>
		}
		return (
			<div className='sider'>
				{head}
				<ul>
					<li><a href="#/index" className='fa fa-align-justify'>全部</a></li>
					<li><a href="#/share" className='fa-share-alt'>分享</a></li>
					<li><a href="#/good" className='fa-thumbs-up'>精华</a></li>
					<li><a href="#/ask" className='fa-question-circle'>问答</a></li>
					<li><a href="#/job" className='fa-male'>招聘</a></li>
					<li><a href="/" className="">消息</a></li>
					<li><a href="/" className="">关于</a></li>
				</ul>
			</div>
			)
	}, 
	render(){
		return <div className="header">
			<div className='navtop'>			
				<a href="#/index" className='brand'>CNODEJS</a>
				<button onClick={this.unfold} className="fa fa-align-justify"></button>
			</div>
			<div className="container" onClick={this.fold}>
				{this.renderNavLst()}
			</div>
		</div>
	}
})