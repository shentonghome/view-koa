
var fun_index = async (ctx,next)=>{
    ctx.render('index.html',{
        title:'Welcome'
    });
}

module.exports = {
    'GET /':fun_index
}