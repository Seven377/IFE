window.onload = function (){
	//获取四个按钮
	var lInput = document.getElementById("leftInput");
	var rInput = document.getElementById("rightInput");
	var lOutput = document.getElementById("leftOutput");
	var rOutput = document.getElementById("rightOutput");
	var inputReg = /[a-zA-Z0-9\u4e00-\u9fa5]+/g;
	//获取输入框的值
	var inputData;
	function getInput(){
		inputData = (document.getElementById("input-area").value).match(inputReg);
	}
	//获取队列
	var quene = document.querySelector(".quene");
    
    //输入数据是否为有效的数字
    function dataValid (){
    	var dataisValid = true;
    	if(inputData.length == 0){
    		alert("输入不合法，不能插入");
    		return false;
    	}else{
    		return true;
    	}
    }

    //查询
    var oSearch = document.getElementById("search");
    oSearch.onclick = function(){
    	var oSearchTxt = document.getElementById("search-input").value;
    	var oRegExp = new RegExp (oSearchTxt);
    	for(var i = 0; i < quene.childNodes.length; i++){
    		if(oRegExp.test(quene.childNodes[i].innerText)){
    			quene.childNodes[i].style['background-color'] = 'blue';
    			quene.childNodes[i].style['color'] = 'black';
    		}else{
    			quene.childNodes[i].style['background-color'] = 'red';
    			quene.childNodes[i].style['color'] = 'white';
    		}
    	}
    };

	//左侧入
	lInput.onclick = function (){
		getInput();
		if(dataValid()){
			for(var i = 0; i < inputData.length; i++){
				var newData = document.createElement("div");
				newData.innerHTML = inputData[i];
				newData.onclick = function(){
					this.parentNode.removeChild(this);
				}
				quene.insertBefore(newData,quene.firstChild);
			}		
		}	
	}

	//右侧入
	rInput.onclick = function (){
		getInput();
		if(dataValid()){
			for(var i = 0; i < inputData.length; i++){
				var newData = document.createElement("div");
				newData.innerHTML = inputData[i];
				newData.onclick = function(){
					this.parentNode.removeChild(this);
				}
				quene.appendChild(newData);
			}	
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