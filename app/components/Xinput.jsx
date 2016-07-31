import React from 'react';
import $ from 'jquery';

import ReactMarkdown from 'react-markdown';


require('./Xinput.less');

var xinput = React.createClass({
	getInitialState() {
		return {
			data: "",
			write:true,
			preview: false
		};
	},
	componentDidMount() {
	    $('textarea').on('input',()=>{
	    	this.setState({
	    		data: $('.text').val()
	    	});
	    });
	},
	previewClick(){
		this.setState({
			write: false,
			preview: true,
			data: $('.text').val()
		});
	},
	writeClick(evt){
		this.setState({
			write: true,
			preview: false
		});
	},
	onShortcut(evt){
		var name = $(evt.target).attr('data-ref');
		var txt = $('.text');
		var val = txt.val();
		switch(name){
			case 'title':{
				val += '#';
				txt.val(val);
				break;
			}
			case 'center':{
				val += '[]';
				txt.val(val);
				txt[0].selectionStart = --txt[0].selectionEnd;
				//console.log(txt[0].selectionStart,txt[0].selectionEnd)
				break;
			}
			case 'list':{
				val += '\n- ';
				txt.val(val);
				break;
			}
			case 'bold':{
				val += "****";
				txt.val(val);
				txt[0].selectionStart = txt[0].selectionEnd-=2;
				break;
			}
			case 'refer':{
				val += "\n> ";
				txt.val(val);
				break;
			}
			case 'code':{
				val +="``";
				txt.val(val);
				txt[0].selectionStart = --txt[0].selectionEnd;
				break;
			}
			case 'code_block':{
				val += "\n```\n```\n";
				txt.val(val);
				txt[0].selectionStart = txt[0].selectionEnd-=4;
				break;
			}
		}
		txt.focus();

		//txt.val(val).focus();
	},
	onScroll: function(evt){
		evt.preventDefault();
		evt.stopPropagation();
	},
	render() {
		if(this.state.write){
			var text_classname = "tab area";
			var preview_classname ="tab area hidden";
		}else if(this.state.preview){
			var text_classname = "tab area hidden";
			var preview_classname ="tab area"
		}

		let title_inputbox = null;
		if(this.props.title === 'true'){
			title_inputbox = (<div className="title"><label htmlFor="">标题：</label><input type="text" id="title" />
				<select name="" id="tab">
					<option value="share">share</option>
					<option value="ask" selected>ask</option>
					<option value="job">job</option>
				</select>
				</div>);
		}
		return (
			<div className="markdown-textarea">
				<ul className="nav-list">
					<li className={this.state.write?"nav select":"nav"} onClick={this.writeClick}>输入(markdown)</li>
					<li className={this.state.preview?"nav select":"nav"} onClick={this.previewClick}>预览</li>
				</ul>
				<div className={text_classname} onScroll={this.onScroll}>
					{ title_inputbox }
					<textarea className='text' rows="20" placeholder={this.props.placeholder}></textarea>
					<div className="short_container"><ul className='shortcut' onClick={this.onShortcut}>
						<li data-ref="title"># 标题</li>
						<li data-ref="center">[居中]</li>
						<li data-ref="list">- 列表</li>
						<li data-ref="bold">**粗体</li>
						<li data-ref="refer">&gt;引用</li>
						<li data-ref="code">`代码`</li>
						<li data-ref="code_block">代码块</li>
					</ul></div>
				</div>
 				<div className={preview_classname}>
					<div className="html" id='html'><ReactMarkdown source={this.state.data}/></div>
				</div>
				<div className='action'>
					<button className='cancle' onClick={this.props.onCancel}>取消</button>
					<button className='ok' onClick={this.props.onPost}>提交</button>
				</div>
			</div>
		);
	}
});

export default xinput;