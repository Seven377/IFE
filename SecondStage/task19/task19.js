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

	// function createNode(){
	// 	var newData = document.createElement("div");
	// 	newData.innerHTML = data.value;
	// 	newData.onclick = function(){
	// 		this.parentNode.removeChild(this);
	// 	}
	// 	return newData;
	// }
    
    //输入数据是否为有效的数字
    function dataValid (){
    	var dataisValid = true;
    	if(data.value == ""){
    		alert("未输入，不能插入");
    		return false;
    	}else if(isNaN(data.value)){
    		alert("请输入有效数字");
    		return false;
    	}else if(data.value<10 || data.value>100){
    		alert("输入的数字必须在10-100之间");
    		return false;
    	}else{
    		return true;
    	}
    }

    function sort(){
    	//过程没有可视化，直接执行结束
    	// for(var i  =0; i < quene.childNodes.length - 1; i++){
    	// 	for(var j = 0; j < quene.childNodes.length - i - 1; j ++){
    	// 		if(quene.childNodes[j].offsetHeight > quene.childNodes[j + 1].offsetHeight){
    	// 			var temp = quene.childNodes[j].offsetHeight;
	    // 			quene.childNodes[j].style.height = quene.childNodes[j + 1].offsetHeight + 'px';
	    // 			quene.childNodes[j + 1].style.height = temp + 'px';		    			
    	// 		}
    	// 	}	
    	// }

    	//对冒泡排序的每步都进行可视化显示
    	var i = 0, j = 0, timer, l = quene.childNodes.length;
    	timer = setInterval(function(){
    		// var ;
    		if(quene.childNodes[j].offsetHeight > quene.childNodes[j + 1].offsetHeight){
				var temp = quene.childNodes[j].offsetHeight;
    			quene.childNodes[j].style.height = quene.childNodes[j + 1].offsetHeight + 'px';
    			quene.childNodes[j + 1].style.height = temp + 'px';		    			
    		}
    		j++;
    		if(j >= l - i - 1){
    			if(i >= l-1){
    				clearInterval(timer);
    			}else{
    				i++;
    				j = 0;
    			}
    		}
    	},30);
    }

    var oSort = document.getElementById("sort");
    oSort.onclick = sort;

	//左侧入
	lInput.onclick = function (){
		if(quene.childNodes.length < 60){
			if(dataValid()){
				var addHtml = "<div style='height: " + data.value + "px'></div>";
				quene.innerHTML = addHtml + quene.innerHTML;
				// sort();
			}
		}else{
			alert("队列长度不能超过60");
		}			
	}

	//右侧入
	rInput.onclick = function (){
		if(quene.childNodes.length < 60){
			if(dataValid()){
				var addHtml = "<div style='height: " + data.value + "px'></div>";
				quene.innerHTML = quene.innerHTML + addHtml;
				// sort();
			}
		}else{
			alert("队列长度不能超过60");
		}		
	}

	//左侧出
	lOutput.onclick = function(){
		if(quene.childNodes.length < 1){
			alert("队列为空，不能删除");
		}else{
			alert(quene.firstChild.style.height);
			quene.removeChild(quene.firstChild);
		}	
	}

	//右侧出
	rOutput.onclick = function(){
		if(quene.childNodes.length < 1){
			alert("队列为空，不能删除");
		}else{
			alert(quene.lastChild.style.height);
			quene.removeChild(quene.lastChild);
		}	
	}
}