var Fileloader={load:function(data,fun){fileloadprogess=0;i=0;var result=[];loader(data,fun,result);function loader(data,fun,result){if(data.length>0){Fileloader.loadPage(data[i].path,function(e){result[i]=data[i];if(i<(data.length-1)){++i,fileloadprogess=i,loader(data,fun,result)}else{fun(result)}})}}},getprogess:function(){return fileloadprogess},loadimg:function(data,fun){fileloadprogess=0;i=0;var result=[];loader(data,fun,result);function loader(data,fun,result){if(data.length>0){Fileloader.loadIMG(data[i].path,function(e){result[i]=data[i];if(i<(data.length-1)){++i,fileloadprogess=i,loader(data,fun,result)}else{fun(result)}})}}},loadIMG:function(path,fun){var _img=new Image();_img.src=path;_img.onload=fun},loadPage:function(path,fun){$.ajax({url:path,dataType:"script",cache:true,success:fun})}};