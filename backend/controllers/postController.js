import Post from '../models/Post.js'
import User from '../models/User.js'
import Like from '../models/Like.js'
import Comment from '../models/Comment.js'

export const addPost = async (req, res, next) => {
    const { title, content } = req.body
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        return next(new Error("Invalid user id"))
    }

    const imageUrl = req.file ? req.file.path : null
    let newPost = new Post({
        title,
        content,
        imageUrl,
        userId: req.user.id
    })

    newPost = await newPost.save()

    res.status(200).json({ message: "Post added successfully", newPost })
}

export const getPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const total = await Post.countDocuments()
    const posts = await Post.find().skip(skip).limit(limit).populate("userId", "username").sort({ createdAt: -1 }).lean()

    const postsWithCommentAndLikeCount = await Promise.all(posts.map(async (p) => {
        const [likeCount, commentCount] = await Promise.all([
            Like.countDocuments({ postId: p._id }),
            Comment.countDocuments({ postId: p._id })
        ])
        return {
            ...p,
            likeCount,
            commentCount
        }
    }))

    res.status(200).json({
        posts: postsWithCommentAndLikeCount,
        total,
        totalPages: Math.ceil(total / limit)
    })

}

export const getPost = async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id).populate("userId", "username")
    if (!post) {
        res.status(404)
        return next(new Error("Post Not Found"))
    }
    const comments = await Comment.find({ postId: post._id })
    const likes = await Like.countDocuments({ postId: post._id })
    res.status(200).json({
        post,
        comments,
        likes
    })

}

export const deletePost = async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        return next(new Error("Post not found"))
    }
    if (post.userId.equals(req.user?.id) || req.user?.role === "admin" || req.user?.role === "mod") {
        await Post.findByIdAndDelete(id)
        res.status(200).json({ message: "Post Deleted Successfully" })
    } else {
        res.status(403)
        next(new Error("Unauthorized to delete this post"))
    }
}


export const likePost = async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        return (next(new Error("Post not found")))
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        return (next(new Error("User not found")))
    }

    const existingLike = await Like.findOne({ postId: post._id, userId: user._id })
    if (existingLike) {
        res.status(400)
        return next(new Error("Already liked this post"))
    }

    const like = new Like({
        postId: post._id,
        userId: user._id
    })

    await like.save()

    const totalLikes = await Like.countDocuments({ postId: post._id })

    res.status(200).json({ message: "Post liked", totalLikes })
}

export const unlikePost = async (req, res, next) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        return (next(new Error("Post not found")))
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        return (next(new Error("User not found")))
    }

    const existingLike = await Like.findOne({ postId: post._id, userId: user._id })
    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        const totalLikes = await Like.countDocuments({ postId: post._id })
        res.status(200).json({ message: "Post disliked", totalLikes })
    } else {
        res.status(400)
        return next(new Error("No like found"))
    }
}


export const commentPost = async (req, res, next) => {
    const { id } = req.params
    const { content } = req.body
    if (!content) {
        res.status(400)
        return next(new Error("Blank content"))
    }
    const post = await Post.findById(id)
    if (!post) {
        res.status(404)
        return (next(new Error("Post not found")))
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(404)
        return (next(new Error("User not found")))
    }

    let comment = new Comment({
        postId: post._id,
        userId: user._id,
        content
    })

    comment = await comment.save()
    res.status(200).json({ message: "Commented", comment })
}

