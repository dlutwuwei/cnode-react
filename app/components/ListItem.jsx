import React from 'react';


require('./ListItem.less');

var ListItem = React.createClass({
    displayName: 'ListItem',
    render() {
    	let info = this.props;
        return (
            <li className='article'>
             <a href={"#/article/"+info.id}>
				<div className="title">
					{info.title}
				</div>
				<div className="content" >
					<img src={info.author.avatar_url} alt="" className="avatar"/>
					<div className="info">
						<p>
							<span className="name">{info.author.loginname}</span>
							<span className="reply">{info.reply_count}/{info.visit_count}</span></p>
						<p>
							<span className="post_time">{((new Date().getTime() - new Date(info.create_at).getTime())/3600/1000).toFixed(0)}小时</span>
							<span className="reply_time">{((new Date().getTime() - new Date(info.last_reply_at).getTime())/3600/1000).toFixed(0)}小时</span>
						</p>
					</div>
				</div>    
				</a>          
            </li>);
    }
});

module.exports = ListItem;