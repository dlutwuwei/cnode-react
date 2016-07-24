import React from 'react';
import ListItem from './ListItem.jsx';

import $ from 'jquery';

require('./App.less');

// var data = [
//   {
//     title: '呼叫',
//     link: 'tel:123456789',
//     icon: 'phone'
//   },
//   {
//     title: 'GitHub',
//     link: 'https://github.com/allmobilize/amazeui',
//     icon: 'github'
//   },
//   {
//     title: '下载使用',
//     link: '//amazeui.org/getting-started',
//     icon: 'download'
//   },
//   {
//     title: 'Bug 反馈',
//     link: 'https://github.com/allmobilize/amazeui/issues',
//     icon: 'location-arrow'
//   }
// ];

var handleSelect = function(link, e) {
  e.preventDefault();
  console.log('你点击了：', link);
};
var App = React.createClass({

	getInitialState() {
	    return {
	      header: {},
	      main: [],
	      navbar:[],
	      loading: true,
	      appending: false,
	      page:1,
	      mrt:0
	    };
	 },

	getData(type,page) {
		if(type=='index') type='';
		$.get(`//cnodejs.org/api/v1/topics?tab=${type||''}&limit=30&page=${page||1}`, function(result) {
			this.setState({
				main: result.data,
				loading: false
			});
		}.bind(this));
	},
	appendData(type, page){
		if(type=='index') type='';
		console.log('添加内容')
		$.get(`//cnodejs.org/api/v1/topics?tab=${type||''}&limit=30&page=${page||1}`, function(result) {
			this.setState({
				main: this.state.main.concat(result.data),
				loading: false,
				appending: false
			});
		}.bind(this));

	},
	componentDidUpdate(prevProps){
		let oldId = prevProps.params.type;
	    let newId = this.props.params.type;
	    if (newId !== oldId){
	    	this.getData(newId);
	    	this.setState({
	    		loading: true
	    	})
	    }

	},
	componentDidMount() {
    	window.addEventListener('scroll', this.handleScroll);
    	console.log('第一次载入')
		this.getData(this.props.params.type);
	},
	componentWillUnmount() {
    	window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll(event) { 
		//下拉加载
		if (!this.state.appending&&(document.body.scrollTop + window.innerHeight) >=document.body.scrollHeight) {
					//console.log(event.target.scrollTop,event.target.clientHeight,event.target.scrollHeight)
			this.setState({appending: true})
			this.appendData(this.props.params.type,++this.state.page)
		}
	},
	handleTouchStart(event){
		this.start = event.touches[0].pageY;		
	},
	handleTouchMove(event){

		this.interval = event.touches[0].pageY-this.start;
		this.setState({
			mrt: this.interval
		})
		
	},
	handleTouchEnd(event){
		if(document.body.scrollTop==0&&event.changedTouches[0].pageY-this.start>3){
			this.setState({
				mrt: 0
			});
			this.getData(this.props.params.type);
						console.log('向下拉');

		}
		if(this.interval>0){
			console.log('到顶向下拉');

		}
		
	},
	renderLoading(){
		return (
			<div className="loading">
				<i className="fa fa-spinner fa-spin"></i>
			</div>
			)
	},
	renderChildren(data) {
		return data.map((item, index)=>{
			return (
				<ListItem key={index} {...item}/>
				)
		}) 
	},
	render() {


		let append;
		append = <div className='tail'><div className='appending'>
		<i className="fa fa-circle-o-notch fa-spin"></i><span className='pulling'>加载更多...</span></div></div>
		

		if(this.state.loading){
			return (
				<div className="container">
				{this.renderLoading()}
				</div>
			);
		}else{
			return ( 
				<div id='content' className="container 3d" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
					<ul>
						{this.renderChildren(this.state.main)}
					</ul>
					<div className="answer fa fa-reply-all" onClick={this.handleClick}></div>

					{this.state.appending?append:''}
				</div>
			);
		}
	}
});


export default App;