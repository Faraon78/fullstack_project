import { UserController } from './controller/UserController';
import { PostController } from './controller/PostController';
import { CommentController } from './controller/CommentController';

export const Routes = [
    {
        method: 'get',
        route: '/users',
        controller: UserController,
        action: 'findAllUsers',
    },
    {
        method: 'get',
        route: '/users/:id',
        controller: UserController,
        action: 'findOneUser',
    },
    {
        method: 'post',
        route: '/auth/register',
        controller: UserController,
        action: 'saveUser',
    },
    {
        method: 'post',
        route: '/auth/login',
        controller: UserController,
        action: 'login',
    },
    {
        method: 'patch',
        route: '/users/:id',
        controller: UserController,
        action: 'updateUser',
    },
    {
        method: 'get',
        route: '/userforpost/:id',
        controller: UserController,
        action: 'findUserForPost',
    },
    {
        method: 'get',
        route: '/posts',
        controller: PostController,
        action: 'findAllPosts',
    },
    {
        method: 'post',
        route: '/savePost',
        controller: PostController,
        action: 'savePost',
    },
    {
        method: 'get',
        route: '/curPosts/:id',
        controller: PostController,
        action: 'findPostsForUser',
    },
    {
        method: 'delete',
        route: '/post/:id',
        controller: PostController,
        action: 'removePost',
    },
    {
        method: 'post',
        route: '/saveComment',
        controller: CommentController,
        action: 'saveComment',
    },
    {
        method: 'get',
        route: '/comments/:id',
        controller: CommentController,
        action: 'commentForPost',
    },
];
