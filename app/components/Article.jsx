import React from 'react';
import $ from 'jquery';

import {
	fromNow
} from '../utils/format.js';

require('./Article.less');

import Reply from './Reply.jsx';
import Xinput from './Xinput.jsx';

var accesstoken = localStorage.getItem('accesstoken');
export default React.createClass({

	getInitialState() {
	    return {
	      title: '',
	      contnet:'',
	      replies:[],
	      author:{},
	      loading: false,
	      visit_count: 0,
	      author_id:'',
	      caninput:false,
	      replyid:'',
	      author_name:'',
	      accesstoken: accesstoken
	    };
	 },
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
		$.get('http://cnodejs.org/api/v1/topic/'+id, function(result) {
			this.setState({
				title: result.data.title,
				content: result.data.content,
				replies: result.data.replies,
				author: result.data.author,
				visit_count: result.data.visit_count,
				create_at: result.data.create_at,
				last_reply_at: result.data.last_reply_at,
				reply_count: result.data.reply_count,
				tab: result.data.tab,
				loading: false,
				author_id: result.data.author_id
			});
		}.bind(this));
		this.setState({loading:true})
	},
	renderLoading(){
		return (
			<div className="loading">
				<i className="fa fa-spinner fa-spin"></i>
			</div>
			)
	},
	handleClick(){
		var accesstoken = this.getAccessToken();
		if(!accesstoken){
			this.props.history.pushState(null,'/login');
			return;
		}
		this.setState({
			caninput:true
		});
	},
	onCancel(){
		this.setState({
			caninput:false
		})
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
		}else{
			this.props.history.pushState(null,'/login');
		}
	},
	getAccessToken(){
		return localStorage.getItem('accesstoken')
	},
	postComment(evt){

		$.post(`https://cnodejs.org/api/v1/topic/${this.props.params.id}/replies`,{
			accesstoken: accesstoken,
			content:  $('.markdown-textarea #html').html(),
			reply_id: this.state.replyid
		},function(result){
			if(result.success == true){
				this.onCancel();
				this.getData(this.props.params.id)

			}else{
				this.props.history.pushState(null,'/login');
			}
		}.bind(this))
	},
	render(){

		var replies = this.state.replies.map((item, index)=>{
			return (
				<Reply data={item} key={index} author_id={this.state.author_id} onReply={this.replytoClick}></Reply>
			)
		});

		var textarea;
		if(this.state.caninput){
			textarea =<Xinput onCancel={this.onCancel} onPost={this.postComment} replyid={this.state.replyid} placeholder={'@'+this.state.author_name} id={this.props.params.id} />
		}	
		
		if(this.state.loading){
			return (
				<div className="container">
					{this.renderLoading()}
				</div>
			);

		}else{
			return (
				<div className='article' meta="">
	    			<h2 className='title'>{this.state.title}</h2>
	    			<div className="author">
	    				<img src={this.state.author.avatar_url} alt="" className="avatar"/>
	    				<div className="info">
	    					<div className="col">
	    						<span className="name">{this.state.author.loginname}</span>
	    						<span className={"right tag "+this.state.tab}></span>
	    					</div>
	    					<div className="col">
	    						<span className="ptime">发布于{fromNow(this.state.create_at)}前</span>
	    						<span className="right">{this.state.visit_count}浏览</span>
	    					</div>
	    				</div>
	    			</div>
					<article dangerouslySetInnerHTML={{__html:this.state.content}}></article>
					<section className="reply" onClick={this.replytoClick}>
						<ul className="replies">
							{replies}
						</ul>
					</section>
					<div className="answer fa fa-reply-all" onClick={this.handleClick}></div>
					{textarea}	
				</div>
			);
		}
		
	}
});