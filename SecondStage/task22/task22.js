window.onload = init;
function init(){
	var btn = document.getElementById('btn');
	var oTree = document.getElementById('root');
	btn.onclick = function(e){
		e = e || window.event;
		//如果上一次遍历没有结束，需要将其颜色改为默认值，并清除计数器，否则随着点击次数增多，遍历速度会越来越快
		if(curNode != null){
			curNode.style.backgroundColor = 'white';
			clearInterval(timer);
			// 未正常结束的情况下，nodeQuene中内容不为空，要将其清空   如果不清空，会将前面的遍历进行完才进行现在选择的遍历
			nodeQuene = [];
		}
		switch(e.target.id){
			case 'preorder':
				preorder(oTree);
				break;
			case 'inorder':
				inorder(oTree);
				break;
			case 'postorder':
				postorder(oTree);
				break;
		}
		show();
	}
}
var nodeQuene = [];
var curNode = null;
var timer;
//先序遍历
function preorder(node){
	if(node != null){
		nodeQuene.push(node);
		arguments.callee(node.firstElementChild);
		arguments.callee(node.lastElementChild);
	}
}

//中序遍历
function inorder(node){
	if(node != null){
		arguments.callee(node.firstElementChild);
		nodeQuene.push(node);
		arguments.callee(node.lastElementChild);
	}
}

//后序遍历
function postorder(node){
	if(node != null){
		arguments.callee(node.firstElementChild);
		arguments.callee(node.lastElementChild);
		nodeQuene.push(node);
	}
}

function show(){
	var curRoot = nodeQuene.shift();
	curRoot.style.backgroundColor = 'blue';
	timer = setInterval(function(){
		curRoot.style.backgroundColor = 'white';
		curRoot = nodeQuene.shift();
		if(curRoot == null){
			curNode = null;
			clearInterval(timer);
		}else{
			curRoot.style.backgroundColor = 'blue';
			curNode = curRoot;
		}
	},500);
}