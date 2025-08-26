const postmodel = require('../models/post.model')
const { generateCaption } = require('../service/ai.service');




async function createPostController(req, res) {
    const file = req.file
    console.log('file reveived' ,file);
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')
    // call gemini api to generate caption
    const caption = await generateCaption(base64ImageFile)
    console.log('caption generated' , caption);
    res.json({
        caption
    })
}
module.exports = {
    createPostController
}