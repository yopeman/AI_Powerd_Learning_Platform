const request_parser = async (req, res, next)=>{
    console.log('\n\n\n---------------------------------------------\n');
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
    console.log('body', req.body);
    console.log('params', req.params);
    // console.log('heders', req.headers);
    console.log('query', req.query);
    console.log(`\n\n`);
    
    next();
}

export default request_parser;