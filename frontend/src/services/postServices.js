


export const addPost = async (axios, data) => {
    const res = await axios.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return res.data
}


export const getPosts = async (axios) => {
    const res = await axios.get("/posts")
    return res.data
}

export const likePost = async (axios, id) => {
    const res = await axios.post(`/posts/like/${id}`)
    return res.data
}

export const unLikePost = async (axios, id) => {
    const res = await axios.post(`/posts/unlike/${id}`)
    return res.data
}


export const getPost = async (axios, id) => {
    const res = await axios.get(`/posts/${id}`)
    return res.data
}

export const commentPost = async (axios, id, data) => {
    const res = await axios.post(`/posts/comment/${id}`, data)
    return res.data
}

export const deletePost = async (axios, id) => {
    const res = await axios.delete(`/posts/${id}`)
    return res.data
}