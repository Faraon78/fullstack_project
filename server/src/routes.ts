import { UsersController } from './controller/UsersController'
import { PostsController } from './controller/PostsController'

export const Routes = [
    {
        method: 'get',
        route: '/getposts',
        controller: PostsController,
        action: 'all',
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
    {
        method: 'get',
        route: '/users/:id',
        controller: UsersController,
        action: 'findOneUser',
    },
    {
        method: 'post',
        route: '/users',
        controller: UsersController,
        action: 'save',
    },
    {
        method: 'delete',
        route: '/users/:id',
        controller: UsersController,
        action: 'remove',
    },
]
