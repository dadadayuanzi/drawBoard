var drawBoard = {
    canvas: document.getElementById('draw'),
    ctx: document.getElementById('draw').getContext('2d'),
    changeColor: document.getElementById('changeColor'),
    liner: document.getElementById('liner'),
    key: false,
    eraserkey: false,
    imgArr: [],
    storeColor: null,
    init: function () {
        // console.log(this.canvas)
        this.ctx.lineGap = "round";
        this.ctx.lineJoin = "round";
        this.drawing()
        this.btnsActive()
    },
    btnsActive: function() {
        var store = this;
        this.changeColor.onchange = function () {
            store.ctx.strokeStyle = this.value;
        }
        this.changeColor.onclick = function () {
            if (store.eraserkey) {
                store.ctx.strokeStyle = store.storeColor;
            }
        }
        this.liner.onchange = function () {
            store.ctx.lineWidth = this.value;
        }
        var btnsNode = document.getElementsByTagName('ul')[0];
        btnsNode.onclick = function (e) {
            console.log(e.target.id)
            switch (e.target.id) {
                case "clearAll":
                    store.eraserkey = false;
                    store.ctx.clearRect(0,0,store.canvas.offsetWidth,store.canvas.offsetHeight)
                    break;
                case "eraser":
                    store.eraserkey = true;
                    store.storeColor = store.ctx.strokeStyle;
                    store.ctx.strokeStyle = "#ffffff"
                    break;
                case "back":
                    store.eraserkey = false;
                    if(store.imgArr.length > 0){
                        store.ctx.putImageData(store.imgArr.pop(),0,0)
                    }
                    break;
            }
        }
    },
    drawing: function() {
        var self = this;
        var canvas_x = this.canvas.offsetLeft;
        var canvas_y = this.canvas.offsetTop;
        this.canvas.onmousedown = function (e) {
            self.key = true;
            var imgData = self.ctx.getImageData(0,0,self.canvas.offsetWidth,self.canvas.offsetHeight);
            self.imgArr.push(imgData);
            self.ctx.beginPath();
            if (self.ctx.strokeStyle !== "#ffffff") {
                self.ctx.strokeStyle = self.changeColor.value;
            }
            self.ctx.lineWidth = self.liner.value;
            self.ctx.moveTo(e.pageX - canvas_x, e.pageY - canvas_y)

            this.onmousemove = function (e) {
                if (self.key) {
                    self.ctx.lineTo(e.pageX - canvas_x, e.pageY - canvas_y)
                    self.ctx.stroke();
                }
            }
            this.onmouseup = function () {
                self.ctx.closePath();
                this.onmousemove = null;
                self.key = false;
            }
            this.onmouseleave = function () {
                self.ctx.closePath();
                this.onmousemove = null;
                self.key = false;
            }
        }
    }
}

drawBoard.init()