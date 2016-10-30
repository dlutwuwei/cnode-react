import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import {
	fromNow
} from '../utils/format.js';

require('./Me.less');

const Me = React.createClass({
	getInitialState() {
		return {
			recent_topics: [],
			recent_replies: [],
			githubUsername: '',
			avatar_url: '',
			loginname: '',
			create_at: '',
			score: ''
		};
	},
	componentDidMount() {
		const hash = window.location.hash.slice(1);
		const name = hash || localStorage.getItem('loginname');
		$.get('https://cnodejs.org/api/v1/user/' + name, function (res) {
			this.setState(res.data);
			if (!hash) {
				localStorage.setItem('avatar_url', res.data.avatar_url);
			}
		}.bind(this));
	},
	onClickHandle(evt) {
		$('.tab').removeClass('active');
		$('.nav').removeClass('active');
		const target = evt.target.getAttribute('data-ref');
		$('.tab[data-ref=' + target).addClass('active');
		$(evt.target).addClass('active');
	},
	quit() {
		localStorage.removeItem('loginname');
		localStorage.removeItem('accesstoken');
		localStorage.removeItem('loginid');
		this.props.history.pushState(null, '/')
	},
	render() {
		var replies = this.state.recent_replies.map((item, index) => {
			return (<li key={index}>
				<Link to={"/article/" + item.id}>
					<img src={item.author.avatar_url} alt="" />
					<div className='item'>
						<div className='title'>{item.title}</div>
						<p>
							<span>{item.author.loginname}</span>
							<span>{fromNow(item.last_reply_at)}前</span>
						</p>
					</div>
				</Link>
			</li>);
		});
		var topics = this.state.recent_topics.map((item, index) => {
			return (<li key={index}>
				<Link to={"/article/" + item.id}>
					<img src={item.author.avatar_url} alt="" />
					<div className='item'>
						<div className='title'><a href={'#article/' + item.id}>{item.title}</a></div>
						<p>
							<span>{item.author.loginname}</span>
							<span>{fromNow(item.last_reply_at)}前</span>
						</p>
					</div>
				</Link>
			</li>);
		})
		return (
			<div className="me">
				<div className="me-header">
					<img src={this.state.avatar_url} alt="" />
					<h3>{this.state.loginname}</h3>
					<h3><a href={'https://' + this.state.githubUsername + '.github.com/'}>{this.state.githubUsername}.github.com</a></h3>
				</div>
				<div className="me-main">
					<ul className="nav-list" onClick={this.onClickHandle}>
						<li className="nav active" data-ref='reply'>最近回复</li>
						<li className="nav" data-ref='post'>最新发布</li>
					</ul>
					<div className="tabs">
						<div className="tab active" data-ref='reply'>
							<ul className="list">
								{replies}
							</ul>
						</div>
						<div className="tab" data-ref='post'>
							<ul className="list">
								{topics}
							</ul>
						</div>
					</div>
				</div>
				<div className="btn-container"><button onClick={this.quit}>退出</button></div>
			</div>
		);
	}
});

export default Me;