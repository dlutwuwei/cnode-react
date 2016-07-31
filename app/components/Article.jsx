import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import {
	fromNow
} from '../utils/format.js';

require('./Article.less');

import Reply from './Reply.jsx';
import Xinput from './Xinput.jsx';
import { fetchArticle, canInput, closeInput, upReply, postReply } from '../actions';

var Article = React.createClass({
	componentDidUpdate(prevProps) {
		let oldId = prevProps.params.id;
		let newId = this.props.params.id;
		if (newId !== oldId)
			this.getData(newId);

	},
	componentDidMount() {
		this.getData(this.props.params.id);
	},
	getData(id) {
		const { dispatch } = this.props;
		dispatch(fetchArticle(id));
	},
	renderLoading() {
		return (
			<div className="loading">
				<i className="fa fa-spinner fa-spin"></i>
			</div>
		)
	},
	onCancel() {
		this.props.dispatch(closeInput());
	},
	onReplyClick(author, reply_id) {
		return (evt) => {
			var accesstoken = this.getAccessToken();
			if (!accesstoken) {
				this.props.history.push('/login');
				return;
			}
			this.props.dispatch(canInput(author, reply_id));
		}
	},
	getAccessToken() {
		return localStorage.getItem('accesstoken');
	},
	onPostComment(reply_id) {
		return (evt) => {
			this.props.dispatch(postReply(this.props.fetchArticle.data.id, reply_id, this.getAccessToken()));
		};
	},
	onUpClick(id, index) {
		var _this = this;
		return (e) => {
			e.stopPropagation();
			let accesstoken = localStorage.getItem('accesstoken');
			_this.props.dispatch(upReply(id, index, accesstoken));
		}
	},
	render() {

		const { fetchArticle, input } = this.props;
		if (fetchArticle.loading) {
			return (
				<div className="container">
					{this.renderLoading() }
				</div>
			);
		}
		if (!fetchArticle || !fetchArticle.data) return null;

		const replies = fetchArticle.data.replies.map((item, index) => {
			return (
				<Reply data={item} key={index} onReplyClick={this.onReplyClick(item.author.loginname, item.id)} onUpClick={this.onUpClick(item.id, index) }></Reply>
			)
		});

		let textarea = null;
		if (input.canInput) {
			textarea = <Xinput onCancel={this.onCancel} onPost={this.onPostComment(input.reply_id)} placeholder={'@' + input.author} id={this.props.params.id} />
		}


		return (
			<div>
				<div className='article'>
					<h2 className='title'>{fetchArticle.data.title}</h2>
					<div className="author">
						<img src={fetchArticle.data.author.avatar_url} alt="" className="avatar"/>
						<div className="info">
							<div className="col">
								<span className="name">{fetchArticle.data.author.loginname}</span>
								<span className={"right tag " + fetchArticle.data.tab}></span>
							</div>
							<div className="col">
								<span className="ptime">发布于{fromNow(fetchArticle.data.create_at) }前</span>
								<span className="right">{fetchArticle.data.visit_count}浏览</span>
							</div>
						</div>
					</div>
					<article dangerouslySetInnerHTML={{ __html: fetchArticle.data.content }}></article>
					<section className="reply">
						<ul className="replies">
							{replies}
						</ul>
					</section>
					<div className="answer fa fa-reply-all" onClick={this.onReplyClick('')}></div>
				</div>
				{textarea}
			</div>
		);


	}
});

Article.propTypes = {
	fetchArticle: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	console.log('article', state)

	return {
		input: state.input,
		fetchArticle: state.fetchArticle
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);