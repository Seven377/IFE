window.onload = init;
var tags = [];
var hobbies = [];
function init(){
	document.getElementById("input-tag").onkeypress = function (){
		if(event.keyCode == 188 || event.keyCode == 13 || event.keyCode == 32){
			insertTag();
		}
	}
	document.getElementById("hobby-confirm").onclick = insertHobby;
}

function insertTag(){
	var currentTag = (document.getElementById("input-tag").value).replace(/\s+/g,"");
	var queneTag = document.querySelector(".quene-tag");
	if(currentTag == ''){
		alert("输入不能为空！");
	}else{
		if(!contains(tags,currentTag)){
			if(tags.length == 10){
				tags.shift();
				queneTag.removeChild(queneTag.firstChild);	
			}
			tags.push(currentTag);
			queneTag.appendChild(createNode(currentTag));
		}
		document.getElementById("input-tag").value = "";
	}	
}
function createNode(currentTag){
	var newTag = document.createElement("div");
	newTag.innerText = currentTag;
	newTag.onmouseover = function(){
		this.innerHTML = '点击删除' + this.innerHTML;
		this.style['background-color'] = 'red';
	}
	newTag.onmouseout = function(){
		this.innerHTML = this.innerHTML.replace('点击删除','');
		this.style['background-color'] = '#84caff';
	}
	newTag.onclick = function(){
		this.parentNode.removeChild(this);
		var index=tags.indexOf(this.innerText);
		tags.splice(index,1);
	}
	return newTag;
}
//判断当前值是否已存在
function contains(arr, obj){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] === obj)
		{
			return true;
		}
	}
	return false;
}

function insertHobby(){
	var inputHobbies = document.getElementById("input-hobby").value.match(/[0-9a-zA-Z\u4e00-\u9fa5]+/g);
	var queneHobby = document.querySelector('.quene-hobby');
	if(inputHobbies == null){
		alert("输入不能为空");
	}else{
		for(var i = 0; i < inputHobbies.length; i++){
			if(!contains(hobbies, inputHobbies[i])){
				if(hobbies.length == 10){
					hobbies.shift();
					queneHobby.removeChild(queneHobby.firstChild);
				}
				var newHobby = document.createElement("div");
				newHobby.innerText = inputHobbies[i];
				hobbies.push(inputHobbies[i]);
				queneHobby.appendChild(newHobby);
			}
		}
	}
}