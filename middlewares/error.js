module.exports =  (err, req, res, next) => {
    console.log(err);
    let errors = [];
    if(err.isJoi) {
        console.error('Es un error de JOI');
        errors = err.details.map( detail => detail.message);
    }
    errors.push(err.message);
    res.status(500).send({ errors });
};