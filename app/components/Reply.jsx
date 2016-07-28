import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import { upReply } from '../actions';
import {
	fromNow
} from '../utils/format.js';


export default React.createClass({
	componentUpdate() {
	},
	componentDidMount() {
	},
	componentWillUnmount() {
	},
	render() {
		let data = this.props.data;
		return (
			<li>
				<div className="author">
					<img src={data.author.avatar_url} alt="" className="avatar"/>
					<div className="info">
						<div className="right reply_right">
							<span className={classnames("up fa fa-thumbs-up", data.author.loginname == localStorage.getItem('loginname') ? 'hide' : '') } onClick={this.props.onUpClick}>{data.ups.length}</span>
							<span className="replyto fa fa-reply" data-ref='replyto' data-replyid={data.id} data-author-name={data.author.loginname} onClick={this.props.onReply}></span>
						</div>
						<div className="left">
							<p className="name">{data.author.loginname}</p>
							<span className="ptime">发布于{fromNow(data.create_at) }前</span>
						</div>
					</div>
				</div>
				<div className="reply_content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
			</li>
		);
	}

})