import {UsersController} from "./controller/UsersController";
import {PostsController} from "./controller/PostsController";

export const Routes = [{
    method: "get",
    route: "/getposts",
    controller: PostsController,
    action: "all"
}, {
    method: "post",
    route: "/auth/register",
    controller: UsersController,
    action: "save"
}, {
    method: "post",
    route: "/auth/login",
    controller: UsersController,
    action: "login"
}, {
    method: "get",
    route: "/getuser",
    controller: UsersController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UsersController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UsersController,
    action: "remove"
}];