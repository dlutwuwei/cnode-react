import React from 'react';

import classnames from 'classnames';
import {
	fromNow
} from '../utils/format.js';

require('./ListItem.less');

var ListItem = React.createClass({
    displayName: 'ListItem',
    render() {
    	let info = this.props;
        return (
            <li className='list-item'>
             <a href={"#/article/"+info.id}>
				<div className={classnames("title",info.top?'top':info.tab)}>
					{info.title}
				</div>
				<div className="content" >
					<img src={info.author.avatar_url} alt="" className="avatar"/>
					<div className="info">
						<p>
							<span className="name">{info.author.loginname}</span>
							<span className="reply">{info.reply_count}/{info.visit_count}</span></p>
						<p>
							<span className="post_time">{fromNow(info.create_at)}前</span>
							<span className="reply_time">{fromNow(info.last_reply_at)}前</span>
						</p>
					</div>
				</div>    
				</a>          
            </li>);
    }
});

module.exports = ListItem;