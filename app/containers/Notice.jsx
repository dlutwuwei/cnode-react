import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Notice.less';
import * as actions from '../actions/notice';
import { Link } from 'react-router';
class Notice extends Component {
    componentDidMount() {
        this.props.fetchNotices(localStorage.getItem('accesstoken'));
    }
    render() {
        return (
            <div className="notice-container">
                <div className="am-list-news am-list-news-default">
                    <div className="am-list-news-bd">
                        <div className="am-list-news-hd am-cf">
                            <Link to="###" className=""><h2>未读消息</h2></Link>
                        </div>
                        <ul className="am-list">
                        {this.props.notice.data && this.props.notice.data.hasnot_read_messages.map((item, index) => {
                            return (
                                <li key={index} className="am-g">
                                <Link className="am-list-item-hd" to={`/me#${item.author.loginname}`}>{item.author.loginname}</Link>在话题
                                <Link to={`/article/${item.topic.id}`}>{item.topic.title}</Link>中@了你</li>
                            );
                        })}
                        {!!this.props.notice.data && '无消息' }
                        </ul>
                    </div>
                    <div className="am-list-news-bd">
                        <div className="am-list-news-hd am-cf">
                            <Link to="###" className="">
                                <h2>已读消息</h2>
                            </Link>
                        </div>
                        <ul className="am-list">
                        {this.props.notice.data && this.props.notice.data.has_read_messages.map((item, index) => {
                            return (
                                <li key={index} className="am-g">
                                <Link className="am-list-item-hd" to={`/me#${item.author.loginname}`}>{item.author.loginname}</Link>在话题
                                <Link to={`/article/${item.topic.id}`}>{item.topic.title}</Link>中@了你</li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
                <div></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notice: state.noticePage
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch
//     };
// };

export default connect(
    mapStateToProps,
    actions // mapDispatchToProps
)(Notice);
