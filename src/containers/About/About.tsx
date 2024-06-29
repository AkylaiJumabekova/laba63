import React, { useState, useEffect, useCallback } from 'react';
import axiosApi from '../../axios-api';
import Spinner from '../../components/Spinner/Spinner';

interface AboutData {
    content: string;
}

const About: React.FC = () => {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState('');

    useEffect(() => {
        setLoading(true);
        axiosApi.get<AboutData>('/about.json')
            .then(response => {
                setData(response.data);
                setContent(response.data.content);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const toggleEdit = () => setEditing(!editing);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const onSave = useCallback(() => {
        setLoading(true);
        axiosApi.put('/about.json', { content })
            .then(response => {
                setData(response.data);
                setEditing(false);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [content]);

    if (loading) return <Spinner />;

    return (
        <div>
            <h1>About Us</h1>
            {editing ? (
                <>
                    <textarea value={content} onChange={onChange} className="form-control mb-3" />
                    <button className="btn btn-primary" onClick={onSave}>Save</button>
                    <button className="btn btn-secondary" onClick={toggleEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <p>{data?.content}</p>
                    <button className="btn btn-secondary" onClick={toggleEdit}>Edit</button>
                </>
            )}
        </div>
    );
};

export default About;
