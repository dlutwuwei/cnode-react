import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';

import {
	fromNow
} from '../utils/format.js';


export default React.createClass({
	getInitialState(){
		const data = this.props.data;
		return {
			id: data.id,
			author: data.author,
			content: data.content,
			ups: data.ups,
			create_at: data.create_at
		}
	},
	componentUpdate(){
	},
	componentDidMount(){
	},
	componentWillUnmount(){
	},
	clickup(id){
		return (e) =>{
			e.stopPropagation();
			$.post(`//cnodejs.org/api/v1/reply/${id}/ups`,{accesstoken:'e9204b2f-0558-4ca1-a6c6-c690bcc11a92'}).success((data)=>{
				if(data.success==true){
					var newups = this.state.ups.slice();
					if(data.action=='up'){
						newups.push(this.props.author_id);
						this.setState({ups:newups});
					}
					if(data.action=='down'){
						newups.pop(this.props.author_id);
						this.setState({ups:newups});
					}
				}
			});
		}
	},
	render() {
		return (
			<li>
			  	<div className="author">
					<img src={this.state.author.avatar_url} alt="" className="avatar"/>
					<div className="info">
						<div className="right reply_right">
							<span className={classnames("up fa fa-thumbs-up",this.state.author.loginname==localStorage.getItem('loginname')?'hide':'')} onClick={this.clickup(this.state.id)}>{this.state.ups.length}</span>
							<span className="replyto fa fa-reply" data-ref='replyto' data-replyid={this.state.id} data-author-name={this.state.author.loginname} onClick={this.props.onReply}></span>
						</div>
						<div className="left">
							<p className="name">{this.state.author.loginname}</p>
							<span className="ptime">发布于{fromNow(this.state.create_at)}前</span>
						</div>
		    		</div>
				</div>
				<div className="reply_content" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
			</li>
		);
	}

})