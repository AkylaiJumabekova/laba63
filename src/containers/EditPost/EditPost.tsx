import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';

interface Post {
    title: string;
    content: string;
    createdAt: string;
}

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosApi.get(`/posts/${id}.json`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    };

    const onSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (post) {
            axiosApi.put(`/posts/${id}.json`, post)
                .then(() => {
                    setLoading(false);
                    navigate(`/posts/${id}`);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [post, id, navigate]);

    const renderForm = () => {
        if (loading) return <Spinner />;
        if (!post) return <p>Loading post data...</p>;

        return (
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
        );
    };

    return (
        <div>
            <h1>Edit Post</h1>
            {renderForm()}
        </div>
    );
};

export default EditPost;
