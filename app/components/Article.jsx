import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import {
	fromNow
} from '../utils/format.js';

require('./Article.less');

import Reply from './Reply.jsx';
import Xinput from './Xinput.jsx';
import { fetchArticle, canInput, closeInput } from '../actions';

const accesstoken = localStorage.getItem('accesstoken');
var Article = React.createClass({
	componentDidUpdate(prevProps){
		let oldId = prevProps.params.id;
	    let newId = this.props.params.id;
	    if (newId !== oldId)
	    	this.getData(newId);

	},
	componentDidMount(){
		this.getData(this.props.params.id);
	},
	getData(id){
		const { dispatch } = this.props;
		dispatch(fetchArticle(id));
	},
	renderLoading(){
		return (
			<div className="loading">
				<i className="fa fa-spinner fa-spin"></i>
			</div>
			)
	},
	handleReplyClick(){
		var accesstoken = this.getAccessToken();
		if(!accesstoken){
			this.props.history.push(location,'/login');
			return;
		}
		this.props.dispatch(canInput());
	},
	onCancel(){
		this.props.dispatch(closeInput());
	},
	replytoClick(evt){
		// 获取要回复的replyid
		var target = evt.target;
		var ref = target.getAttribute('data-ref');
		if(this.getAccessToken()&&ref=="replyto"){
			this.setState({
				caninput: true,
				replyid: target.getAttribute('data-replyid'),
				author_name: target.getAttribute('data-author-name')
			});
		}
		// }else{
		// 	this.props.history.push(location,'/login');
		// }
	},
	getAccessToken(){
		return localStorage.getItem('accesstoken');
	},
	postComment(evt){

		$.post(`//cnodejs.org/api/v1/topic/${this.props.params.id}/replies`,{
			accesstoken: accesstoken,
			content:  $('.markdown-textarea #html').html(),
			reply_id: this.props.fetchArticle.data.replyid
		},function(result){
			if(result.success == true){
				this.onCancel();
				this.getData(this.props.params.id)
			}else{
				this.props.history.push(location,'/login');
			}
		}.bind(this))
	},
	render(){
		//console.log('article props', this.props)
		if(this.props.fetchArticle.loading){
			return (
				<div className="container">
					{this.renderLoading()}
				</div>
			);

		}
		if(!this.props.fetchArticle || !this.props.fetchArticle.data) return null;

		const replies = this.props.fetchArticle.data.replies.map((item, index)=>{
			return (
				<Reply data={item} key={index} author_id={this.props.fetchArticle.data.author_id} onReply={this.replytoClick}></Reply>
			)
		});

		let textarea = null;
		if(this.props.input.canInput){
			textarea =<Xinput onCancel={this.onCancel} onPost={this.postComment} replyid={this.props.fetchArticle.data.replyid} placeholder={'@'+this.props.fetchArticle.data.author_name} id={this.props.params.id} />
		}	

		return (
			<div>
			<div className='article'>
    			<h2 className='title'>{this.props.fetchArticle.data.title}</h2>
    			<div className="author">
    				<img src={this.props.fetchArticle.data.author.avatar_url} alt="" className="avatar"/>
    				<div className="info">
    					<div className="col">
    						<span className="name">{this.props.fetchArticle.data.author.loginname}</span>
    						<span className={"right tag "+this.props.fetchArticle.data.tab}></span>
    					</div>
    					<div className="col">
    						<span className="ptime">发布于{fromNow(this.props.fetchArticle.data.create_at)}前</span>
    						<span className="right">{this.props.fetchArticle.data.visit_count}浏览</span>
    					</div>
    				</div>
    			</div>
				<article dangerouslySetInnerHTML={{__html:this.props.fetchArticle.data.content}}></article>
				<section className="reply" onClick={this.replytoClick}>
					<ul className="replies">
						{replies}
					</ul>
				</section>
				<div className="answer fa fa-reply-all" onClick={this.handleReplyClick}></div>
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

function mapDispatchToProps(dispatch){
	return {
		dispatch
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);