import React from 'react';

interface Props {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<Props> = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop show" style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            <div className="modal show d-block" style={{ backgroundColor: '#f9f9f9' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="close" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
