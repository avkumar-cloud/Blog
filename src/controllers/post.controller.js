import Post from "./../models/Post.js"

export const createPost = async (req,res) =>{
    try {
        const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        image: req.file?.path,
        author: req.user.id
    });
    res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    } 
}

export const updatePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: "Post not found"});
        if(post.author.toString()!==req.user.id)
            return res.status(403).json({message: "Not allowed"});
        post.title = req.body.title || post.title;
        post.body = req.body.body || post.body;
        if(req.file) post.image = req.file.path;
        await post.save();

        return res.status(200).json({
            message: "Post updated successfully",post
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}