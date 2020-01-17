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
    
    function $(id) {
        return document.getElementById(id);
    }

    var api = {


        init: function () {

            insertCSS("body, html, #app {width: 100%; height: 100%;}body, html, form, h1,p { margin: 0; padding: 0; }a{    text-decoration: none;    color: #000;}#app {max-width:480px;margin:0 auto;}.navbar-title {padding-left: 2.08rem;padding-right: 2.08rem;height: 50px;line-height: 50px;font-size: 18px;text-align: center;} .ellipsis {white-space: nowrap; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden;}.file-icon {margin-right:5px;width:50px;height:50px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAC1QTFRF8PDwAAAA9vb28PDw7+/vurq60NDQ3d3d9PT0/v7+z8/PtbW17+/v2NjY/////vf+NQAAAAV0Uk5T7QAcpua2JwPpAAAAl0lEQVRIx2MQMjlDBHBWZFA4QxRgYrDpfEcEmHGYwWceMQpfHmE4844ocGZU4bBS2H4XAfLwKaxFUrgNn0IkdXd35xGrcBuxCtGMxKNwF7EKd68jVuEuYhWiGIlX4S5iFEajGYlT4VI0I3EqhIBRhaMKRxWOKhxVSBuFtejqrhNRDYNBxWgrZWQqJLrBTnQXgOhOBbHdFACKUCl9PiODgwAAAABJRU5ErkJggg==);background-size: 50px; background-position: 50%;}.file-icon.folder { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAC1QTFRFTZn/So/pSo/oTJDoUI/vZpn/SpDpSpXqY6P/S5DoZKL/AAAAXJz4So/oY6L/aJqpegAAAAx0Uk5TCsT0kRAF0Ri0tbUAr9lnJQAAAE5JREFUSMdj2E0kYBhVOKpwKCucexcGlKPxKryLABOIVXjRm0iFd9PxKTz3Dgd4habwHU4wqnBU4ajCUYWjCkeewnW41L0YbQGMKhwRCgFgP/SVT0VCkwAAAABJRU5ErkJggg==);background-size: 50px; background-position: 50%;}.file-icon.mp4 {     background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAIFQTFRFAAAA8PDw9vb28PDw7+/v9fn/u9X7Z6L2XZv2Poj0/P7/hbT4q8v6T5L1kbv57/X+R4702+n9b6b34u3+osb6xtz8frD4QIn06vL+VJb1xNr8+vz/+fv/RIz0V5j1mcD5z+L9baX39PT0x938/v7+UZT1bKT2zuH87+/vO4bz////7iVYMgAAAAV0Uk5TAO0cpuZCdpliAAAA6ElEQVRYw+3Z2QqDMBAF0Kjpvu/75jrO/39gpbVYRDSGC4Uy92XIy2EkQYZEKdfTBIr2XKVch4BxXOWRHzIooU+e0gTzMpG0ImJgiAQUUEABBRTwO0GUfvLIlklFzRIFxmDhpfdsGVfUl2gMFl6cN1Su71iASd5QudqC9Q1agPUNtgcbGmwPNjRosyn1EfCfwOMBDPL5tsOCzKslGGTuTsAgd6YDLMi86IHB2QgKDsdz6Ccnfeim7LfQY3NaX6AHe3OV39fPwcjMMx+WAiOxxTgnM7aAAgoooIA2IPxiHH51D39cQD9/PAGgwgiM5n8iSAAAAABJRU5ErkJggg==);background-size: 50px; background-position: 50%;}.file-icon.mp3 {         background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAALdQTFRF9fX18PDw////8PDw8PDw7+/vAAAA/H1d/aqV/GU//Fw1/sGy/ZJ4/GlF/+3p/Htb/q6b//b0/93V/G1K//j2/ZmA/si6/GhD/ayX//Ty/aqW/GVA/GM9/+Xe/tHG/Z+I/HhX/rOg/GpF//Ds/9jP/9/X/r6u//Lv/IFi/sO0//79/H9g/Zd9/q+c/Foy/sa4/ZR6/9rR/rCd8fHx+vr6/Fsz/v7+/9jO/GpG/Yxw+1kx7+/v////wVe6wwAAAAd0Uk5TGb0BZcjzAJDDaOkAAAEkSURBVFjD7dnZUsIwFAbgdIsi4ArKpuACyibQPTl9/+dSOk6HJQqcnhtnzn+Zi69/20zapkJK6bgeEMRzHVtKIYUFZLG+OduCIIwzgsRhAJYtHAhIuJwMwBEuhBlZQnCFBzEdGIMnADLCADDIIIMMMogFb4b3fpMEbN8urmfTB71OOfB9NW4tz7p6I0jw9a16Xrvq6f0gQf1rGMSDF3cfSxKwMlD958XqcvIzWgKcdUZPj43d0RLgsaMMMsjgfwITlaaUoP+JX2BNXZIIv2Ibuyj8I8DcJcWD5i4FWD8ZNHcpDqPw4IvpQkQJ/pS3u8xzMfIz9E3Z7bKeTCrBvHAe7IKa2H914a8ABhlkkMEDIPmmLvm2M/nGOPnWPfnPBSlt0t8fX+OywuzBN9+OAAAAAElFTkSuQmCC);background-size: 50px; background-position: 50%;}.file-icon.txt {     background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAACdQTFRFAAAA8PDw9vb27+/v8PDw9PT03ODl/v7+kJ6s2NjY7+/vgpKh////26OGLQAAAAV0Uk5TAO0c5qbE05f3AAAAjklEQVRIx2Ngcl5FBDBRYFBcRRQQYvAKP0MEKF3CYFVDjMLjixlWnSEKrBpVSITCjN1ooA2Hwm50hTtwKNyNAUYVkq0QJkYzhTPBgCKFYGkEi/oK8YbjsFU4gAGOV+FodiU6eLAqxFaQYlWIrWjGqnAkV3EzsYDBpnA0ZkZjZhgqJLrBTnQXgOhOBbHdFAAU+Wu+3wpT+QAAAABJRU5ErkJggg==);background-size: 50px; background-position: 50%;}.file-icon.doc {     background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAP9QTFRF8PDwAAAA9vb28PDw7+/v/f7+M676odr8asT7Mq76b8b7Na/6m9f82O/+ULr6O7H63fH+ccf7+fz+pdv8RLX6zuz9e8v78fn+csf72vD+bsb70+39+v3+ptz8yOn9qNz8WL37mdf8Wr77ntj8fcv7Urr6c8j7+f3+idD88/r+jdL8otr8wOb9v+b9vOT9cMb7bcX7aMP7+/3+pNv8zev94vP+k9T8PbL6p9z8ueP97/n+gc386fb+seD9iND8Ubr6ecr7QbT6RbX6qd39YsH73vL+LKv6Sbf6Kar64fP+K6v69PT09Pv+wuf+QLT7/v7+web92NjY7+/vKKr6////zZbKqgAAAAV0Uk5T7QAcpua2JwPpAAABfElEQVRYw+2ZR2/DMAyFndjde++9d5NmNHs600kc8/3/31LKp/QUGRIKFNG78JGHD6AtekhWLG47gSY5djxmxa1AoxhnB/0RNGnUD2zLCbTxmBg43DA0ips2QANUBA6GNEXDQSTgVB4TIwFJQgZogH8ErPu+/y3Ms+8/ivjChboCsOcBDy02XcDl0OHc66m07LO/I8qKWpaozeF1suXxhKSAZfa3RFuidkh0z6GsBKywvyD6EjW+mDccKkrATh44IVoTtU2icyDfUQJSDthurczBTQMbdADkFNdhgZP1BLDAXS/vclJQBIr7ur8KJBaBnWNO2qqTUgTO9pBcmk/i6AooKo9eCUifIkWUwsgFSsrAaphniDKhqSoDa2F+TXQZmtpvYPRlE44xPJ7n3hObLqkDG5y+CfPOpqEB2OQn1ocwn2yaGoDmnTLzQO3LRhoo+8EpDZT9JJYGmv+UWQOOJWWAZtmYSTGTYibFAP8PUPvGuPate+2HC7qPP34AmsQMZp1DnjcAAAAASUVORK5CYII=);background-size: 50px; background-position: 50%;}p.name {    font-size: 15px;} p.time {    font-size: 12px; color: #ccc;}");
            
           
            var name = "";
            for(var i = 0; i < path.length; i++){
                var d = path[i];
                name = d.fileName;
            }
            
            var html = "<h1 class='navbar-title ellipsis'>"+name+"</h1>";
            for(var i = 0; i < data.length; i++){
                var d = data[i];
                
                if(d.downloadUrl && /^\/\//.test(d.downloadUrl)){
                   d.downloadUrl = "https:" + d.downloadUrl;
                }
                
                html += "<div class='file-item'><a target='_blank' href='";
                html += d.downloadUrl ? d.downloadUrl : d.isFolder ? d.fileId + ".html" : "javascript:;";
                html += "'>";
                html += "<table><tr><td><div class='file-icon ";
                html += d.isFolder ? "folder" : d.fileType;
                html += "'></div></td><td>";
                html += "<p class='name ellipsis'>"
                html += d.fileName;
                html += "</p>";
                html += "<p class='time'>"
                html += d.createTime;
                html += "</p></td></tr></table>";
                html += "</a></div>";
            }
            
           $("app").innerHTML = html;
            
        }
    };


    api.init();



})();
