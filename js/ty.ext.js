(function () {

    function insertCSS(cssText) {


        var style = document.createElement("style");
        document.head.appendChild(style);

        /*IE8*/
        if (style.styleSheet)
            style.styleSheet.cssText += cssText;
        else
            style.appendChild(document.createTextNode(cssText));

    }

    var api = {

        url: {
            listShareDir: "https://cloud.189.cn/v2/listShareDir.action"
        },
        config: {
            homeFildId: "8139433749888353",
            pageSize: 60
        },
        loading: function () {
            $("#J_Notify").html('<div class="alert in fade alert-success" style="margin-top: 3px;">处理中...</div><div id="alert_ing" class="alert" style="background: #fff;height: 40px;line-height: 40px;width: 100%;"></div>').show();
        },

        unloading: function () {
            $("#J_Notify").empty();
        },

        start: function () {

            //            for(var key in  data){
            //            console.log(data["3139432628596428"])
            //                api.save(data["3139432628596428"]);
            //            }
            api.loading();
            api.list({
                fileId: api.config.homeFildId,
                pageNum: 0,
                fileName: "fabao.in"
            });

            //            api.list({
            //                fileId: "5138132662964074",
            //                pageNum: 0,
            //                fileName: "test"
            //            });
        },

        doEnd: function () {
            api.save(api.$data);
        },

        $data: {},
        $queue: [],

        list: function (opts) {

            $("#alert_ing").html(opts.fileName);

            $.ajax({
                data: {
                    fileId: opts.fileId,
                    shareId: window._shareId,
                    accessCode: window._accessCode,
                    verifyCode: window._verifyCode,
                    orderBy: 1,
                    order: "ASC",
                    pageNum: Number(opts.pageNum) + 1,
                    pageSize: api.config.pageSize,
                    noCache: Math.random()
                },
                url: api.url.listShareDir,
                success: function (d) {

                    //                    var path = d.path[d.path.length - 1];
                    var recordCount = d.recordCount;
                    var pageCount = parseInt(recordCount / api.config.pageSize);

                    if (recordCount % api.config.pageSize > 0)
                        pageCount++;


                    var path = d.path;
                    var data = [];
                    for (var i = 0; i < d.data.length; i++) {
                        var dd = d.data[i];
                        var p = {
                            createTime: dd.createTime,
                            fileId: dd.fileId,
                            fileName: dd.fileName,
                        };

                        if (dd.downloadUrl)
                            p.downloadUrl = dd.downloadUrl;

                        if (dd.isFolder) {
                            p.isFolder = dd.isFolder;
                        } else
                            p.fileType = dd.fileType;


                        for (var v of $tyReplaceUrls) {
                            if (dd.fileId === v.fileId) {
                                p.isloaded = true;
                                p.downloadUrl = v.url;
                            }
                        }

                        //不处理图片
                        //                        if(dd.fileId === "8139432704340782"){
                        //                           p.isloaded = true;
                        //                           p.downloadUrl = "https://www.baidu.com";
                        //                        }
                        data.push(p);
                    }

                    var exists = api.$data[opts.fileId];

                    if (exists) {

                        exists.isloaded = true;
                        exists.path = path;
                        if (!exists.data)
                            exists.data = data;
                        else
                            exists.data = exists.data.concat(data);

                    } else {
                        exists = {
                            path: path,
                            data: data,
                            isloaded: true
                        };

                        api.$data[opts.fileId] = exists;
                    }


                    for (var dd of data) {
                        if (dd.isFolder) {
                            api.$data[dd.fileId] = dd;
                        }
                    }

                    if (d.pageNum < pageCount) {
                        api.list({
                            fileId: opts.fileId,
                            pageNum: d.pageNum,
                            fileName: opts.fileName
                        });
                        return;
                    }

                    var end = true;
                    //检查下一个
                    for (var key in api.$data) {
                        var next = api.$data[key];

                        if (!next.isloaded) {
                            end = false;

                            setTimeout(function () {
                                api.list({
                                    fileId: next.fileId,
                                    pageNum: 0,
                                    fileName: next.fileName
                                });
                            }, 1000);

                            break;
                        }
                    }

                    if (end) {
                        api.unloading();
//                                                console.log(JSON.stringify(api.$data));

                        //检查下一个
                        for (var key in api.$data) {
                            var w = api.$data[key];
                            delete w.isloaded;

                            $("#alert_ing").html("生成 " + w.fileName || "...");
                            api.save(w);
                        }

                        alert("处理完成");
                    }


                },
                error: function (jqXHR) {

                }
            })
        },

        save: function (c) {
            if(!c.path){
                console.log("无效数据：");
                console.error(c);
                return;
            }
            window.saveFile(JSON.stringify(c.path), JSON.stringify(c.data));
        },

        init: function () {

            $(".header").html('<div class="app-sys-command-container"><div class="sys-commands"><a n-ui-command="minimize" href="javascript:minBox();" class="mbtn">－<i></i></a><a n-ui-command="maximize"   href="javascript:maxBox();" class="mbtn">☐</a><a n-ui-command="close"  href="javascript:closeBox();" class="close"><i>✕</i></a></div></div>');
            //topBar.prependTo(document.body);

            var btn = $('<a class="btn btn-save-as" href="javascript:;">开始获取直链</a>');

            btn.prependTo(".file-operate");

            $('.tips-save-box').hide();

            btn.click(api.start);


            insertCSS(".app-sys-command-container {-webkit-app-region: drag;height:50px;} .sys-commands {float:right;line-height:50px;-webkit-app-region: no-drag;} .sys-commands a {line-height:50px;display: inline-block;padding:0px 15px;    font-size: 18px;} .sys-commands a.mbtn:hover {background:#ddd;color:#000;} .sys-commands a.close:hover {background:#e81717;color:#fff;} ");


            window.onkeyup = function (e) {

                if (e.keyCode === 123) {
                    showDevTools();
                }
            }

        }
    };


    api.init();



})();
