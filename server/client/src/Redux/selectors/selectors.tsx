import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { config } from '../../config';

function Selectors() {
    const { currentUser }: any = useSelector<RootState, object>(
        (state) => state.currentUser
    );
    const data: any = localStorage.getItem(config.STORAGENAME);
    let token;
    if (data) {
        token = JSON.parse(data).token;
    }
    let id;
    if (data) {
        id = JSON.parse(data).userId;
    }
    const isAuthenticated: boolean = !!token;

    const { posts }: any = useSelector<RootState, object>(
        (state) => state.posts
    );
    const { currentPosts }: any = useSelector<RootState, object>(
        (state) => state.currentPosts
    );
    const { users }: any = useSelector<RootState, object>(
        (state) => state.users
    );
    const { comments }: any = useSelector<RootState, object>(
        (state) => state.comments
    );
    const { userForPost }: any = useSelector<RootState, object>(
        (state) => state.userForPost
    );

    return {
        currentUser,
        token,
        posts,
        users,
        comments,
        isAuthenticated,
        id,
        currentPosts,
        userForPost,
    };
}
export default Selectors;
