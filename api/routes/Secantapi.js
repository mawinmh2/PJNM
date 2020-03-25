const express = require('express');
const router = express.Router();
const math = require('mathjs');


router.get('/seapi', (req, res) => {
    res.send('testget');
});

router.post('/seapi', (req, res) => {
    var i=0;
        var xi = parseFloat(req.body.xi);
        var xiold = parseFloat(req.body.xiold);
        var xinew;
        var error;
        var eq = req.body.equation;
        var fx = math.compile(eq);
        var fxi;
        var fxiold;
        var diffxi;
        var result=[];
        console.log("xiold",xiold);
        console.log("xi",xi);
        do{
            result.push({
                'Iteration' : i,
                'Xi-1' : xiold,
                'Xi' : xi,
                'Xi+1' : xinew,
                'Error' : error
            });
            i++;
            let scopexi = {x:xi};
            let scopexiold = {x:xiold};
            fxi = fx.eval(scopexi);
            fxiold = fx.eval(scopexiold);
            diffxi = (fxiold-fxi)/(xiold-xi);
            xinew = xi-(fxi/diffxi);
            error = math.abs((xinew-xi)/xinew)*100;
            xiold = xi;
            xi = xinew;
            console.log("xiold",xiold);
            console.log("xi",xi);
            console.log("error",error);
        }while(error>0.0001);  
        this.setState({output:result});
    
    res.json({
        result:output
        })

});



module.exports = router;