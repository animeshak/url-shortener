const Url = require('../models/urlmodel')
const UrlShortener = require('../utils/urlShortener')

class UrlController{
    static async shortenUrl(req,res){
        try{
            const {originalUrl} = req.body;
            if(!originalUrl)
                res.status(400).json({message:"URL is Required"})
            //check if the short url exist or not for original one if found return it
            let url = await Url.findOne({originalUrl});
            if(url){
                return res.json(url);
            }
            const shortUrl = UrlShortener.generateShortUrl();
            
            url = new Url({
                originalUrl , shortUrl
            });
            await url.save();
            res.json(url);
            
        }catch(err){
            res.status(500).json({message:'server Error : '+err.message})
        }
    }
    static async redirectToOriginalUrl(req,res){
        try{
            const {shortUrl} = req.params
            const url = await Url.findOne({shortUrl: shortUrl});
            if(!url){
                return res.status(400).send("URL NOT FOUND")
            }
            url.clicks += 1;
            await url.save()
            res.redirect(url.originalUrl)
        }
        catch(err){
            console.log(err)
            res.status(500).send('server error')
        }
    }
}

module.exports = UrlController;