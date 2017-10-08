//画板
var ctx = document.getElementById('canvas').getContext('2d');
var canvas_brushs = document.getElementById("canvas_fillRect");//粗细
var canvas_fillRect = document.getElementById("canvas_fillRect");//实心矩形
var canvas_strokeRect = document.getElementById("canvas_strokeRect");//空心矩形
var canvas_fillArc = document.getElementById("canvas_fillArc");//实心圆
var canvas_strokeArc = document.getElementById("canvas_strokeArc");//空心圆
var canvas_lines = document.getElementById("canvas_lines");//画线
var canvas_clears = document.getElementById("canvas_clears");//清空
var canvas_clear = document.getElementById("canvas_clear");//橡皮擦

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var	fontWeight=[8];
 
// 选择颜色
var color;
var selector = document.getElementById("colorSelect");
selector.onchange = function(){
     color = this.value;
}

//变粗细
var fontWeight = [2,5,8];
var index = 0;
var fontIptNum = document.getElementsByTagName("input");
var xi = document.getElementById("xi");
var cu = document.getElementById("cu");
var zhong = document.getElementById("zhong");
cu.onclick = function() {
	font = this.value;
	ctx.lineWidth = 6;
}

xi.onclick = function() {
	font = this.value;
	ctx.lineWidth = 3;
}

zhong.onclick = function() {
	font = this.value;
	ctx.lineWidth = 4;
}

//点击实心矩形画矩形
canvas_fillRect.onclick=function() {
	var flag = false;//鼠标按下标志(true)  false未按下
	canvas.onmousedown = function() {
		//获取鼠标当前的位置 cursur pointer
		flag = true;
		var X_1 = event.clientX - canvas.offsetLeft;
		var Y_1 = event.clientY - canvas.offsetTop;
		imageData = ctx.getImageData(0,0,500,500);

		canvas.onmousemove = function(e) {
			if(flag == true) {
				var X_2 = e.clientX - X_1 - canvas.offsetLeft;;
				var Y_2 = e.clientY - Y_1 - canvas.offsetTop;

				drawArc(X_1,Y_1,X_2,Y_2);
			}
		}	
		window.onmouseup= function() {
			flag = false;
		}	
	}

	function drawArc(X_1,Y_1,X_2,Y_2) {
		ctx.clearRect(0,0,500,500);
		ctx.putImageData(imageData,0,0);
		ctx.lineWidth = font;
		ctx.beginPath();
		ctx.fillRect(X_1,Y_1,X_2,Y_2);
		ctx.fillStyle = color;
		ctx.strokeStyle = color;	
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
};

//点击空心矩形画矩形
canvas_strokeRect.onclick=function() {
	var flag = false;//鼠标按下标志(true)  false未按下
	canvas.onmousedown = function() {
		//获取鼠标当前的位置 cursur pointer
		flag = true;
		var X_1 = event.clientX - canvas.offsetLeft;
		var Y_1 = event.clientY - canvas.offsetTop;
		imageData = ctx.getImageData(0,0,500,500);

		canvas.onmousemove = function(e) {
			if(flag == true) {
				var X_2 = e.clientX - X_1 - canvas.offsetLeft;;
				var Y_2 = e.clientY - Y_1 - canvas.offsetTop;

				drawRect(X_1,Y_1,X_2,Y_2);
			}
		}	
		window.onmouseup= function() {
			flag = false;
		}	
	}

	function drawRect(X_1,Y_1,X_2,Y_2) {
		ctx.clearRect(0,0,500,500);
		ctx.putImageData(imageData,0,0);
		ctx.lineWidth = font;
		ctx.beginPath();
		ctx.strokeRect(X_1,Y_1,X_2,Y_2);
		ctx.stroke();
		ctx.closePath();
	}
};

//实心圆
canvas_fillArc.onclick=function() {
	var flag = false;//鼠标按下标志  false未按下
	canvas.onmousedown = function() {
		//获取鼠标当前的位置 cursur pointer
		flag = true;
		var radX = event.clientX - canvas.offsetLeft;
		var radY = event.clientY - canvas.offsetTop;
		imageData = ctx.getImageData(0,0,500,500);
		canvas.onmousemove = function() {
			if(flag == true) {
				var X = event.clientX - canvas.offsetLeft;
				var Y = event.clientY - canvas.offsetTop;
				var rad = Math.sqrt(Math.pow(X-radX,2) + Math.pow(Y-radY,2));
				drawArc(radX,radY,rad);
			}
		}	
		window.onmouseup= function() {
			flag = false;
		}	
	}

	function drawArc(radX,radY,rad) {
		ctx.clearRect(0,0,500,500);
		ctx.putImageData(imageData,0,0);
		ctx.lineWidth = font;
		ctx.beginPath();//开启绘图路径
		ctx.arc(radX,radY,rad,0,Math.PI*2);
		ctx.fillStyle = color;
		ctx.strokeStyle = color;	
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
};

// 点击空心圆 画圆
canvas_strokeArc.onclick=function() {
	var flag = false;//鼠标按下标志  false未按下
	canvas.onmousedown = function() {
		//获取鼠标当前的位置 cursur pointer
		flag = true;
		var radX = event.clientX - canvas.offsetLeft;
		var radY = event.clientY - canvas.offsetTop;
		imageData = ctx.getImageData(0,0,600,600);
		canvas.onmousemove = function() {
			if(flag == true) {
				var X = event.clientX - canvas.offsetLeft;
				var Y = event.clientY - canvas.offsetTop;
				var rad = Math.sqrt(Math.pow(X-radX,2) + Math.pow(Y-radY,2));
				drawArc(radX,radY,rad);
			}
		}	
		window.onmouseup= function() {
			flag = false;
		}	
	}

	function drawArc(radX,radY,rad) {
		ctx.clearRect(0,0,500,500);
		ctx.putImageData(imageData,0,0);
		ctx.beginPath();//开启绘图路径
		ctx.lineWidth = font;
		ctx.arc(radX,radY,rad,0,Math.PI*2);
		ctx.strokeStyle = color;	
		ctx.stroke();
		ctx.closePath();
	}
};

//橡皮擦
canvas_clear.onclick = function draw(){
    canvas.onmousedown = function(ev){
        imageData = ctx.getImageData(0,0,500,500);
        ctx.beginPath();
        document.onmousemove = function(ev){
        	var x = ev.clientX - canvas.offsetLeft;
        	var y = ev.clientY - canvas.offsetTop;
            ctx.strokeStyle="white";
            ctx.fillStyle="white";
            ctx.fillRect(x,y,12,12);
            ctx.fill();  
        }
        window.onmouseup = function(ev){
            document.onmousemove = document.onmouseup = null;
            ctx.closePath();
            ctx.stroke();
        } 
    }
}

//画直线
canvas_lines.onclick = function draw(){
    canvas.onmousedown = function(ev){
        var ev = ev || event;
        ctx.beginPath();
        ctx.lineWidth = font;
        ctx.moveTo(ev.clientX-canvas.offsetLeft,ev.clientY-canvas.offsetTop);
        document.onmousemove = function(ev){
            var ev = ev || event;
            ctx.lineTo(ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop);
            ctx.strokeStyle=color;
            ctx.stroke();    
        }
        document.onmouseup = function(ev){
            document.onmousemove = document.onmouseup = null;
            ctx.closePath();
        }
    }
}

//清空
canvas_clears.onclick = function() {
	ctx.beginPath();
	ctx.stroke();
	ctx.clearRect(0,0,500,500);
	ctx.closePath();
}

	

