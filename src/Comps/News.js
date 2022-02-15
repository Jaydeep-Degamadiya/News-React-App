import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'generel'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    articles = []
    constructor(props) {

        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalFirstletter(this.props.category)} - Newz`
    }



    async updateNews() {
        this.props.setProgress(0);

        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(60);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    // #we can make function for this three for comon code
    async componentDidMount() {
        // // console.log("cmd Function");
        // this.setState({ loading: true })
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f94c7282d67548d293f8c8e406e24de0&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.updateNews();

    }
    // handleNextclick = async () => {
    //     // console.log("nextClick Function");
    //     // console.log(this.state.page);
    //     this.setState({ loading: true })
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f94c7282d67548d293f8c8e406e24de0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // this.setState({ articles: parsedData.articles })
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })

    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     // })
    //     // console.log(this.state.page);
    //     // this.updateNews();



    // };
    // handlePreclick = async () => {
    //     // console.log("pre click Function");
    //     this.setState({ loading: true })
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f94c7282d67548d293f8c8e406e24de0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // this.setState({ articles: parsedData.articles })
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     // });
    //     // this.updateNews();

    // };
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f94c7282d67548d293f8c8e406e24de0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })

    };

    render() {
        return (
            <>

                <hr />
                <h2 className="text-center"> News of Indian {this.capitalFirstletter(this.props.category)} Industry</h2>
                <hr />
                {this.state.loading && <Spinner />}
                {/* it will render when loading is true */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length != this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title : "India Today"} description={element.description ? element.description : "news of the latest india"} author={element.author} date={element.publishedAt} source={element.source.name} imgUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                                // element.description.slice(0, 60) for slice the desc
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreclick} > &larr; Previous</button>

                    <button type="button" disabled={this.state.page + 1 > Math.ceil((this.state.totalResults / this.props.pageSize))} className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
                </div> */}





            </>
        )

    }
}

export default News;
