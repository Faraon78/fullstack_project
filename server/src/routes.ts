import { UsersController } from './controller/UsersController'
import { PostsController } from './controller/PostsController'

export const Routes = [
    {
        method: 'get',
        route: '/users',
        controller: UsersController,
        action: 'findAllUsers',
    },
    {
        method: 'get',
        route: '/users/:id',
        controller: UsersController,
        action: 'findOneUser',
    },
    {
        method: 'post',
        route: '/auth/register',
        controller: UsersController,
        action: 'saveUser',
    },
    {
        method: 'post',
        route: '/auth/login',
        controller: UsersController,
        action: 'login',
    },
    /*{
        method: 'delete',
        route: '/users/:id',
        controller: UsersController,
        action: 'remove',
    },*/
    {
        method: 'post',
        route: '/users/:id',
        controller: UsersController,
        action: 'updateUser',
    },
    {
        method: 'post',
        route: '/avatarUser',
        controller: UsersController,
        action: 'avatarUser',
    },

    {
        method: 'get',
        route: '/posts',
        controller: PostsController,
        action: 'all',
    },
]
