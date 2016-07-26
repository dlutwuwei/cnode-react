import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import { Link } from 'react-router'
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
						<Link to="/me">
							<img src={localStorage.getItem('avatar_url')} alt=""/>
							<span>{localStorage.getItem('loginname')}</span>
						</Link>
					</div>
		}else{
			head = <div className="nav-login">
						<Link to="/login" className='fa-arrow-circle-right'>登陆</Link>
					</div>
		}
		return (
			<div className='sider'>
				{head}
				<ul>
					<li><Link to="/index" className='fa fa-align-justify'>全部</Link></li>
					<li><Link to="/share" className='fa-share-alt'>分享</Link></li>
					<li><Link to="/good" className='fa-thumbs-up'>精华</Link></li>
					<li><Link to="/ask" className='fa-question-circle'>问答</Link></li>
					<li><Link to="/job" className='fa-male'>招聘</Link></li>
					<li><Link to="/" className="">消息</Link></li>
					<li><Link to="/" className="">关于</Link></li>
				</ul>
			</div>
			)
	}, 
	render(){
		return <div className="header">
			<div className='navtop'>			
				<Link to="/index" className='brand'>CNODEJS</Link>
				<button onClick={this.unfold} className="fa fa-align-justify"></button>
			</div>
			<div className="container" onClick={this.fold}>
				{this.renderNavLst()}
			</div>
		</div>
	}
})