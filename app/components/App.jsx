import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem.jsx';
import Xinput from './Xinput.jsx';

import { fetchList, isAppending, fetchArticle, canInput, closeInput, postArticle} from '../actions';
import $ from 'jquery';

require('./App.less');

var App = React.createClass({

	componentDidUpdate(prevProps) {

		//发现同一个页面的路由变化
		const { dispatch } = this.props;
		let oldId = prevProps.params.type;
		let newId = this.props.params.type;
		if (newId !== oldId) {
			dispatch(fetchList(newId || '', this.props.page));
		}

	},
	componentDidMount() {

		const { dispatch, params } = this.props;
		window.addEventListener('scroll', this.handleScroll);
		dispatch(fetchList(params.type || '', this.props.page));

	},
	componentWillUnmount() {

		window.removeEventListener('scroll', this.handleScroll);

	},
	handleScroll(event) {

		const { dispatch, params } = this.props;
		//下拉加载
		if (!this.props.articleList.appending && (document.body.scrollTop + window.innerHeight) >= document.body.scrollHeight) {
			//console.log(event.target.scrollTop,event.target.clientHeight,event.target.scrollHeight)
			dispatch(fetchList(params.type||'', this.props.articleList.page + 1));
		}
	},
	handleClick(){
		var accesstoken = localStorage.getItem('accesstoken');
		if(!accesstoken){
			this.props.history.push('/login');
			return;
		}
		this.props.dispatch(canInput());
	},
	onCancel(){
		this.props.dispatch(closeInput());
	},
	handleTouchStart(event) {

		this.start = event.touches[0].pageY;

	},
	handleTouchMove(event) {

		this.interval = event.touches[0].pageY - this.start;
		this.setState({
			mrt: this.interval
		})

	},
	handleTouchEnd(event) {

		if (document.body.scrollTop == 0 && event.changedTouches[0].pageY - this.start > 3) {
			this.setState({
				mrt: 0
			});
			this.getData(this.props.params.type);
			console.log('向下拉');

		}
		if (this.interval > 0) {
			console.log('到顶向下拉');
		}

	},
	postComment(event){

		this.props.dispatch(postArticle(localStorage.getItem('accesstoken')))
	},
	renderLoading() {
		return (
			<div className="loading">
				<i className="fa fa-spinner fa-spin"></i>
			</div>
		)
	},
	renderChildren(data) {
		return data.map((item, index) => {
			return (
				<ListItem key={index} {...item}/>
			)
		})
	},
	render() {
		let append = <div className='tail'><div className='appending'>
			<i className="fa fa-circle-o-notch fa-spin"></i><span className='pulling'>加载更多...</span></div></div>
		
		let textarea = null;
		if(this.props.input.canInput){
			textarea = (<Xinput onCancel={this.onCancel} onPost={this.postComment} replyid="" placeholder="" title="true" />);
		}
		if (this.props.articleList.loading) {
			return (
				<div className="container">
					{this.renderLoading() }
				</div>
			);
		} else if (this.props.articleList.data) {
			return (
				<div>
				<div id='content' className="container 3d" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
					<ul>
						{this.renderChildren(this.props.articleList.data) }
					</ul>
					<div className="answer fa fa-reply-all" onClick={this.handleClick}></div>
					{this.props.articleList.appending ? append : ''}
				</div>
				{ textarea }
				</div>
			);
		}
		return null;
	}
});

App.propTypes = {
  articleList: PropTypes.object.isRequired,
  mrt: PropTypes.number
}

function select(state) {
	console.log('app', state)
	return {
		mrt: 0,
		input: state.input,
		articleList: state.articleList
	}
}
export default connect(select)(App);
