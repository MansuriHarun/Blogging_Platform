import React from "react";

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-heading">404 - Page Not Found</h1>
                <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
                <button className="back-button" onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    );
}

export default NotFoundPage;
