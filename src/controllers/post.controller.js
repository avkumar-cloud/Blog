import Post from "./../models/Post.js"

export const createPost = async (req,res) =>{
    try {
        const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        image: req.file?.path ? `/uploads/${req.file.filename}` : null,
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

export const getAllPosts = async(req,res) =>{
    try {
        const posts = await Post.find()
            .populate("author", "name email")
            .sort({createdAt: -1});
        const formattedPosts = posts.map(post=>({
            ...post.toObject(),
            likesCount: post.likes.length,
            isLiked: post.likes.includes(req.user.id)
        }))
        res.status(200).json(formattedPosts)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}

export const likePost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found"})
        }
        const userId = req.user.id;
        const alreadyLiked = post.likes.includes(userId);
        if(alreadyLiked){
            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );
        }
        else post.likes.push(userId)
        await post.save();

        res.status(200).json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likesCount: post.likes.length,
            isLiked: !alreadyLiked
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
}