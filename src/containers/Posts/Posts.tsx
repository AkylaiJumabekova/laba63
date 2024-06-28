import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';

interface Post {
    id: string;
    title: string;
    createdAt: string;
}

interface PostsList {
    [id: string]: Post;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosApi.get<PostsList>('/posts.json')
            .then(response => {
                const fetchedPosts = Object.keys(response.data || {}).map(key => ({
                    ...response.data[key],
                    id: key,
                }));
                setPosts(fetchedPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderContent = () => {
        if (loading) return <Spinner />;
        if (posts.length === 0) return <p>No posts found.</p>;

        return (
            <div>
                {posts.map(post => (
                    <div key={post.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.createdAt}</p>
                            <Link to={`/posts/${post.id}`} className="btn btn-primary">Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>Posts</h1>
            {renderContent()}
        </div>
    );
};

export default Posts;
