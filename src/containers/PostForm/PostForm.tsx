import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';

interface PostData {
    title: string;
    content: string;
    createdAt?: string;
}

const PostForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostData>({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosApi.get<PostData>(`/posts/${id}.json`)
                .then(response => {
                    setPost(response.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            ...post,
            createdAt: post.createdAt || new Date().toISOString(),
        };

        try {
            if (id) {
                await axiosApi.put(`/posts/${id}.json`, postData);
            } else {
                await axiosApi.post('/posts.json', postData);
            }
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [post, id, navigate]);

    if (loading) return <Spinner />;

    return (
        <div>
            <h1>{id ? 'Edit Post' : 'Add New Post'}</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={post.title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        className="form-control"
                        value={post.content}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default PostForm;
