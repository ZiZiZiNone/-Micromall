window.onload = function(){

    //声明一个记录点击缩略图的下标
    var bigimgIndex = 0;

    //路径导航数据渲染
    navPathDataBind();
    function navPathDataBind(){
        /* 获取路径导航的页面元素 */
       var navPath = document.querySelector('#wrapper #content .contentMain #navPath');
       /* var navPath =document.getElementById('#navPath') */
       /* console.log(navPath); */
   
       /* 获取所需要的数据 */
       var path = goodData.path;
   /*     console.log(path);  */
   
       /* 由于数据是动态产生，
       那么DOM元素也是动态产生，
       所以DOM元素需要根据数据的数量进行创建 */
       for (var i = 0; i < path.length; i++) {
           if(i == path.length - 1){
               var aNode = document.createElement("a");
               aNode.innerText = path[i].title;
               navPath.appendChild(aNode);
           }else{
               var aNode = document.createElement('a');
               aNode.href = path[i].url;
               aNode.innerHTML = path[i].title;
             
               var iNode = document.createElement('a');
               iNode.innerText = '/' ;
       
               navPath.appendChild(aNode);
               navPath.appendChild(iNode);
           }
       
       }

    }   

    //放大镜效果
    bigClassBind();
    function bigClassBind(){
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');
        
        var imagessrc = goodData.imagessrc;
        
        //移入事件
        smallPic.onmouseenter = function(){
            // console.log("我在这里");
            var maskDiv = document.createElement("div");
            maskDiv.className = "mask";

            var bigPic = document.createElement("div");
            bigPic.id = "bigPic";

            var bigImg = document.createElement("img");
            bigImg.src = imagessrc[bigimgIndex].b;

            bigPic.appendChild(bigImg);

            smallPic.appendChild(maskDiv);

            leftTop.appendChild(bigPic);

            //移动事件
            smallPic.onmousemove = function(enevt){
                var left = enevt.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = enevt.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;
                
                if(left <0){
                    left = 0;
                }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }
                if(top <0){
                    top = 0;
                }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth);
                // console.log(scale);
                bigImg.style.left = - left / scale + "px";
                bigImg.style.top = - top / scale + "px";

            }

            //移出事件
            smallPic.onmouseleave = function(){
                smallPic.removeChild(maskDiv);
                leftTop.removeChild(bigPic);
            }
        }

    }

    //缩略图数据渲染
    thumbnailData();
    function thumbnailData(){
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
        // console.log(ul);
        var imagessrc = goodData.imagessrc;
        // console.log(imagessrc);
        for (var i = 0; i < imagessrc.length; i++) {
            var newLi = document.createElement("li");
            var newImg = document.createElement("img");
            newImg.src = imagessrc[i].s;

            newLi.appendChild(newImg);
            ul.appendChild(newLi);
        
        }
    }

    //点击缩略图效果
    thumbnailClick();
    function thumbnailClick(){
        var liNode = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li");
        // console.log(liNode);
        var smallPic_img = document.querySelector("#wrapper #content .contentMain #center #left #leftTop #smallPic img");
        
        var imagessrc = goodData.imagessrc;
        smallPic_img.src = imagessrc[0].s;
        for (var i = 0; i < liNode.length; i++) {
            //或者setAttribute('index',i)
            liNode[i].index = i;
            liNode[i].onclick = function(){
                var idx = this.index;
                // console.log(idx);
                bigimgIndex = idx;
                smallPic_img.src = imagessrc[idx].s;
            }
        }
    }
    
    //点击按钮移动效果
    thumbnailLeftRightClick();
    function thumbnailLeftRightClick(){
        var prev = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom a.prev");
        var next = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom a.next");

        // console.log(prev,next);
        // var piclist = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist");
        var ul = document.querySelector("#wrapper #content .contentMain #center #left #leftBottom #piclist ul");
        var liNodes = document.querySelectorAll("#wrapper #content .contentMain #center #left #leftBottom #piclist ul li");
        // console.log(piclist,ul,liNode);

        //起始
        var start = 0;
        //步长
        var step = (liNodes[0].offsetWidth + 20) * 2;
        //总体运动距离 = ul -div = (图片数量 -div显示数量) * （li +20）
        var endPostion = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

        prev.onclick = function(){
            start -=step;
            if(start < 0){
                start = 0;
            }
            ul.style.left = -start + "px";
        }
        next.onclick = function(){
            start +=step;
            if(start > endPostion){
                start = endPostion;
            }
            ul.style.left = -start + "px";
        }
    }

    //商品详情数据渲染
    rightTopData();
    function rightTopData(){
        var rightTop =document.querySelector("#wrapper #content .contentMain #center #right .rightTop");
        var goodsDetail = goodData.goodsDetail;
        //模板字符串，数据替换 ${变量}
        var s = `<h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                        <div class="price">
                            <span>￥</span>
                            <p>${goodsDetail.price}</p>
                            <i>降价通知</i>
                        </div>
                        <p>
                            <span>累计评价</span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                </div>`;

        rightTop.innerHTML = s;
    }

    //参数数据渲染
    rightBottomData();
    function rightBottomData(){
        //拿元素
        var chooseWrap = document.querySelector("#wrapper #content .contentMain #center #right .rightBottom .chooseWrap");
        // console.log(chooseWrap);

        //拿数据
        var crumbData = goodData.goodsDetail.crumbData;
        // console.log(crumbData);

        //循环遍历
        for(var i = 0; i < crumbData.length; i++){
            //创建dom对象
            var dlNode = document.createElement("dl");
            var dtNode = document.createElement("dt");
            
            //放数据到dt
            dtNode.innerText = crumbData[i].title;

            dlNode.appendChild(dtNode);

            //数据里面还有数据，有多个数据就遍历
            for(var j = 0; j < crumbData[i].data.length; j++){
                //创建dom对象
                var ddNode = document.createElement("dd");
                //放数据到dt
                ddNode.innerText = crumbData[i].data[j].type;
                ddNode.setAttribute("price",crumbData[i].data[j].changePrice);

                dlNode.appendChild(ddNode);
            }
            chooseWrap.appendChild(dlNode);

        } 
    }

    //点击参数后的显示
    clickddBind();
    function clickddBind(){
        var dlNodes = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl");
        // console.log(dlNode);
        
        var arr = new Array(dlNodes.length);

        var choose = document.querySelector("#wrapper #content .contentMain #center #right .rightBottom .choose");
        arr.fill(0);
        //  console.log(arr);
        
        for(var i = 0; i < dlNodes.length; i++){
            //三层循环闭包函数，否则外层循环会被一直覆盖
            (function(i){

                var ddNodes = dlNodes[i].querySelectorAll("dd");
              
                for(var j = 0; j < ddNodes.length; j++){
                   

                    ddNodes[j].onclick = function(){
                      
                        choose.innerHTML = "";
                        for(var k = 0; k < ddNodes.length; k++){
                     
                            ddNodes[k].style.color = "#666";
                        }
                      
                        this.style.color = "red";
                        
                        arr[i] = this;
                        changePriceBind(arr);

                        //遍历
                        arr.forEach(function(value,index){
                            if(value){
                                var markDiv = document.createElement("div");
                                markDiv.className = "mark";
                                markDiv.innerText = value.innerText;

                                var aNode = document.createElement("a");
                                aNode.innerText = "X";
                                aNode.setAttribute("index",index);

                                markDiv.appendChild(aNode);

                                choose.appendChild(markDiv);
                            }
                        })

                        //获取所有a元素，遍历发生点击事件
                        var aNodes = document.querySelectorAll("#wrapper #content .contentMain #center #right .rightBottom .choose .mark a");
                        // console.log(aNodes);
                        for(var n = 0; n < aNodes.length; n++){
                            aNodes[n].onclick = function(){
                                var idx1 = this.getAttribute("index");
                                // console.log(idx1);
                                arr[idx1] = 0;

                                var ddlist = dlNodes[idx1].querySelectorAll("dd");

                                for(var m = 0; m < ddlist.length; m++){
                                    ddlist[m].style.color = "#666"
                                }

                                ddlist[0].style.color = "red";
                                //删除mark标记
                                choose.removeChild(this.parentNode);

                                //调用价格变动函数
                                changePriceBind(arr);
                            }
                        }
                    }
                }        
            })(i);


        }
        // console.log(ddNodes);



    }

    //价格变动函数
    function changePriceBind(arr){
        //拿标签
        var oldPrice = document.querySelector("#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p");
        
        var price = goodData.goodsDetail.price;

        for(var i=0; i < arr.length;i++){
            if(arr[i]){
                var changeprice = Number(arr[i].getAttribute("price"));
                console.log(typeof changeprice);
                price += changeprice;
            }

        }
        oldPrice.innerText = price;

        //变化后价格写入这里的标签
        var leftPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p");
        // console.log(leftPrice);
        leftPrice.innerText = "￥" + price;

        var ipts = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input");
        var newPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i");

        for(var j = 0 ; j<ipts . length ; j++){
            if( ipts[j].checked){
                price += Number(ipts[j].value);
            }
        }

        newPrice.innerText = "￥" + price;

    }

    //选择搭配中间区域复选框套餐变动价格
    choosePrice();
    function choosePrice(){
        var ipts = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input");
        // console.log(ipts);
        var leftPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p");
        // console.log(leftPrice);
        var newPrice = document.querySelector("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i");
        for(var i = 0 ; i<ipts.length;i++){
            ipts[i].onclick = function(){
                var oldPrice = leftPrice.innerText.slice(1);
                // console.log(typeof oldPrice);
                for(var j = 0 ; j<ipts.length;j++){
                    if( ipts[j].checked){

                        oldPrice = Number(oldPrice) + Number(ipts[j].value);

                    }
                    newPrice.innerText = "￥" + oldPrice;
                }
            }
        }
    }

    //公共选项卡函数
    function Tab(tabBtns,tabConts){
        for(var i=0; i<tabBtns.length;i++){
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for(var j=0;j<tabBtns.length;j++){
                    tabBtns[j].className = "";
                    tabConts[j].className = "";
                }
                this.className = "active";
                tabConts[this.index].className = "active";
            }
        }
    }
    //点击左侧选项卡
    leftTab();
    function leftTab(){
        var h4s = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4");
        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent >div");
        Tab(h4s,divs);
    }

    //点击右侧选项卡
    rightTab();
    function rightTab(){
        var lis =document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li");
        var divs = document.querySelectorAll("#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContent div");
        Tab(lis,divs);
    
    }

    //右边侧边栏点击效果
    rightAsideBind();
    function rightAsideBind(){
        var btns = document.querySelector("#wrapper .rightAside .btns");

        var flag = true;
        var rightAside = document.querySelector("#wrapper .rightAside");

        btns.onclick = function(){
            if(flag){
                //打开
                btns.className = "btns btnsOpen";

                rightAside.className = "rightAside asideOpen";
            }else{
                //关闭
                btns.className = "btns btnsClose";

                rightAside.className = "rightAside asideClose";
            }
            flag = !flag
        }
    }



}