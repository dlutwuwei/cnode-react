import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	fromNow
} from '../utils/format.js';

import './Article.less';

import Reply from '../components/Reply.jsx';
import Xinput from '../components/Xinput.jsx';
import { fetchArticle, canInput, closeInput, upReply, postReply } from '../actions/article';

const Article = React.createClass({
	componentDidMount() {
		this.getData(this.props.params.id);
	},
	componentDidUpdate(prevProps) {
		const oldId = prevProps.params.id;
		const newId = this.props.params.id;
		if (newId !== oldId) {
			this.getData(newId);
		}
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
		);
	},
	onCancel() {
		this.props.dispatch(closeInput());
	},
	onReplyClick(author, replyId) {
		return () => {
			const accesstoken = this.getAccessToken();
			if (!accesstoken) {
				this.props.history.push('/login');
				return;
			}
			this.props.dispatch(canInput(author, replyId));
		};
	},
	getAccessToken() {
		return localStorage.getItem('accesstoken');
	},
	onPostComment(replyId) {
		return () => {
			this.props.dispatch(postReply(this.props.fetchArticle.data.id, replyId, this.getAccessToken()));
		};
	},
	onUpClick(id, index) {
		const _this = this;
		return (e) => {
			e.stopPropagation();
			const accesstoken = localStorage.getItem('accesstoken');
			_this.props.dispatch(upReply(id, index, accesstoken));
		};
	},
	render() {
		const { fetchedArticles, input } = this.props;
		if (fetchedArticles.loading) {
			return (
				<div className="container">
					{this.renderLoading() }
				</div>
			);
		}
		if (!fetchedArticles || !fetchedArticles.data) return null;

		const replies = fetchedArticles.data.replies.map((item, index) => {
			return (
				<Reply data={item} key={index} onReplyClick={this.onReplyClick(item.author.loginname, item.id)} onUpClick={this.onUpClick(item.id, index) }/>
			);
		});

		let textarea = null;
		if (input.canInput) {
			textarea = <Xinput onCancel={this.onCancel} onPost={this.onPostComment(input.reply_id)} placeholder={'@' + input.author} id={this.props.params.id} />;
		}


		return (
			<div>
				<div className="article">
					<h2 className="title">{fetchedArticles.data.title}</h2>
					<div className="author">
						<img src={fetchedArticles.data.author.avatar_url} alt="" className="avatar"/>
						<div className="info">
							<div className="col">
								<span className="name">{fetchedArticles.data.author.loginname}</span>
								<span className={'right tag ' + fetchedArticles.data.tab}></span>
							</div>
							<div className="col">
								<span className="ptime">发布于{fromNow(fetchedArticles.data.create_at) }前</span>
								<span className="right">{fetchedArticles.data.visit_count}浏览</span>
							</div>
						</div>
					</div>
					<article dangerouslySetInnerHTML={{ __html: fetchedArticles.data.content }}></article>
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
	fetchedArticles: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	console.log('article', state);
	return {
		input: state.inputBox,
		fetchedArticles: state.articlePage
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);
