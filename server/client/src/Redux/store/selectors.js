//import {createSelector} from 'reselect'

export const selectAllPosts = (state) => state.posts.posts

//const countItemOnPage = 6
export const selectPageCountPosts = (state) => {
    return Math.ceil(state.posts.posts.length / 8)
}
export const selectAllUsers = (state) => state.users.users
export const selectAllComments = (state) => state.comments.comments
