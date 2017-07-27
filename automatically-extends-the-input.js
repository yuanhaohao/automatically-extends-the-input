//*****输入框自动扩展输入*****//
    var inputVlaue;
    var div,ul;
    var index = -1;

    function init(id) {
        var $ele = $("#" + id);
        inputVlaue = $ele.find("input")[0];
        div = $ele.find("div")[0];
        ul = $ele.find("ul")[0];
    }

    function updateBg() {
        for (var i = 0; i < ul.getElementsByTagName('li').length; i++) {
            ul.getElementsByTagName('li')[i].className = "clear";
        }
    }

    function startMatch (event, id, waitArray) {
        event = event || window.event;//兼容IE
        if (event.keyCode == 40) {//如果按了down键
            index = index + 1;
            //如果“提示”列表已经显示,则把焦点切换到列表中的第一个数据项上
            if (index == ul.getElementsByTagName('li').length) {
                index = 0;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else {
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            }
            return false;
        }
        //如果按了up键
        else if (event.keyCode == 38) {
            index = index - 1;
            //如果“提示”列表已经显示,则把焦点切换到列表中的最后一个数据项上
            if (index == -2) {
                index = 0;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else if (index == -1) {
                index = ul.getElementsByTagName('li').length - 1;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else {
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            }
            return false;
        } else if (event.keyCode == 13) {
            return false;
        } else {
            index = -1;
            init(id);
            if (inputVlaue.value.length > 0) {
                var currMatch = [];
                for (var i = 0; i < waitArray.length; i++) {
                    if (waitArray[i].indexOf(inputVlaue.value) >= 0) {
                        currMatch.push(waitArray[i]);
                    }
                }
                /*设置显示*/
                if (currMatch.length > 0) {
                    setField(currMatch);
                } else {
                    clearField();
                }
            } else {
                clearField();
            }
        }
    };

    function showAll (event,id, waitArray) {
        index = -1;
        init(id);
        var currMatch = waitArray;
        /*设置显示*/
        if (currMatch.length > 0) {
            setField(currMatch);
        } else {
            clearField();
        }
        (event || window.event).cancelBubble = true
    };
    document.onclick=function () {
        if(ul){
            clearField()
        }
    };
    /*清空*/
    function clearField() {
        for (var i = ul.childNodes.length - 1; i >= 0; i--) {
            ul.removeChild(ul.childNodes[i]);
        }
        div.className = "hide";
    }

    /*设置显示*/
    function setField(currMatch) {
        clearField();
        div.className = "show";
        var oLi;
        for (var i = 0; i < currMatch.length; i++) {
            oLi = document.createElement("li");
            ul.appendChild(oLi);
            oLi.appendChild(document.createTextNode(currMatch[i]));
            oLi.onmousemove = function () {
                updateBg();
                this.className = "mouseover";
            };
            oLi.onmouseout = function () {
                updateBg();
                this.className = "mouseout";
            };
            oLi.onclick = function () {
                inputVlaue.value = this.firstChild.nodeValue;
                clearField();
            }
        }
    }
    //*****/.输入框自动扩展输入end*****//