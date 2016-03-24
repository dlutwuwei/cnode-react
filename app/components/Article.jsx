import React from 'react';
import $ from 'jquery';
import {
	Article
} from 'amazeui-react';
export default React.createClass({

	getInitialState() {
	    return {
	      title: '',
	      contnet:'',
	      replies:[],
	      loading: false
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
				loading: false
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
	render(){
		if(this.state.loading){
			return (
				<div className="container">
					{this.renderLoading()}
				</div>
			);

		}else{
			return (
				<Article
	    			meta="">
					<div dangerouslySetInnerHTML={{__html:this.state.content}}></div>

				</Article>
			);
		}
		
	}
});