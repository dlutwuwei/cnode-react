import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {
	fromNow
} from '../utils/format.js';

require('./ListItem.less');

var ListItem = React.createClass({
    displayName: 'ListItem',
    render() {
    	const info = this.props;
        return (
            <li className="list-item">
             <Link to={'/article/' + info.id}>
				<div className={classnames('title', info.top ? 'top' : info.tab)}>
					{info.title}
				</div>
				<div className="content" >
					<Link to={`/me#${info.author.loginname}`}><img src={info.author.avatar_url} alt="" className="avatar"/></Link>
					<div className="info">
						<p>
							<span className="name">{info.author.loginname}</span>
							<span className="reply">{info.reply_count}/{info.visit_count}</span>
						</p>
						<p>
							<span className="post_time">{fromNow(info.create_at)}前</span>
							<span className="reply_time">{fromNow(info.last_reply_at)}前</span>
						</p>
					</div>
				</div>    
			</Link>          
            </li>);
    }
});

module.exports = ListItem;