window.onload = function (){
	//获取四个按钮
	var lInput = document.getElementById("leftInput");
	var rInput = document.getElementById("rightInput");
	var lOutput = document.getElementById("leftOutput");
	var rOutput = document.getElementById("rightOutput");
	//获取输入框的值
	var data = document.getElementById("data");
	//获取队列
	var quene = document.querySelector(".quene");

	function createNode(){
		var newData = document.createElement("div");
		newData.innerHTML = data.value;
		newData.onclick = function(){
			this.parentNode.removeChild(this);
		}
		return newData;
	}
    
    //输入数据是否为有效的数字
    function dataValid (){
    	var dataisValid = true;
    	if(data.value == ""){
    		alert("未输入，不能插入");
    		return false;
    	}else if(isNaN(data.value)){
    		alert("请输入有效数字");
    		return false;
    	}else{
    		return true;
    	}
    }

	//左侧入
	lInput.onclick = function (){
		if(dataValid()){
			quene.insertBefore(createNode(),quene.firstChild);
		}	
	}

	//右侧入
	rInput.onclick = function (){
		if(dataValid()){
			quene.appendChild(createNode());
		}	
	}

	//左侧出
	lOutput.onclick = function(){
		if(quene.childNodes.length < 1){
			alert("队列为空，不能删除");
		}else{
			alert(quene.firstChild.innerHTML);
			quene.removeChild(quene.firstChild);
		}	
	}

	//右侧出
	rOutput.onclick = function(){
		if(quene.childNodes.length < 1){
			alert("队列为空，不能删除");
		}else{
			alert(quene.lastChild.innerHTML);
			quene.removeChild(quene.lastChild);
		}	
	}
}