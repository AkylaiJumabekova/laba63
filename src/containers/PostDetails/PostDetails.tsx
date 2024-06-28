import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';

interface Post {
    title: string;
    content: string;
    createdAt: string;
}

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const deletePost = () => {
        setLoading(true);
        axiosApi.delete(`/posts/${id}.json`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const renderContent = () => {
        if (loading) return <Spinner />;
        if (!post) return <p>Post not found.</p>;

        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.createdAt}</p>
                <p>{post.content}</p>
                <button onClick={() => setShowModal(true)} className="btn btn-danger">Delete</button>
                <button onClick={() => navigate(`/posts/${id}/edit`)} className="btn btn-secondary">Edit</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Post Details</h1>
            {renderContent()}
            <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={deletePost} />
        </div>
    );
};

export default PostDetails;
