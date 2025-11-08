export const getUsers = async (axios) => {
    const res = await axios.get(`/users`)
    return res.data
}

export const makeMod = async (axios, id) => {
    const res = await axios.post(`/users/mod/${id}`, {})
    return res.data
}
export const unMod = async (axios, id) => {
    const res = await axios.post(`/users/remove-mod/${id}`, {})
    return res.data
}