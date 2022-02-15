import React, { Component } from 'react';


export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, date, author, source } = this.props;
        return (
            <div className="card" style={{}}>
                <img src={!imgUrl ? "https://www.albertadoctors.org/images/ama-master/feature/Stock%20photos/News.jpg" : imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted"> By {author ? author : "Unknow"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more...</a>
                </div>
            </div>
        )
    }
}

export default NewsItem;
