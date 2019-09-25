const http=require("http");
const fs=require('fs');
const path=require('path');
const port=3000;
const hostname="localhost";

const server=http.createServer((req,res)=>{
    if (req.method=='GET'){
        var fileUrl;
        if (req.url=='/') fileUrl='/index.html';
        else fileUrl=req.url;
        var filepath=path.resolve('./public'+fileUrl);
        var fileExtension=path.extname(filepath);
        if (fileExtension=='.html'){  
            fs.exists(filepath,(exists)=>{
                console.log(exists);
               if (!exists){
                   res.statusCode=404;
                   res.setHeader("Content-Type","text/html");
                   res.end("<html><body>Error file not exist:"+res.statusCode+" "+filepath+"</body></html>");
                   return;
               }
               res.statusCode=200;
               res.setHeader("Content-Type","text/html");
               fs.createReadStream(filepath).pipe(res);

            })
        }else{
            res.statusCode=404;
        res.setHeader("content-type","text/html");
        res.end("<html><body>Error not html:"+res.statusCode+" "+res.method+"</body></html>");
        }
    }else{
        res.statusCode=404;
        res.setHeader("content-type","text/html");
        res.end("<html><body>Error not get:"+res.statusCode+" "+res.method+"</body></html>");
    }
})
server.listen(port,hostname,()=>{
    console.log(`Server Running on https://${hostname}:${port}`);
});