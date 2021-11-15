import React from 'react'
import Blog from "../components/BlogProject/Blog"
import { callApi } from "../utils/call-api"
import { useQuery } from 'react-query'

const fetchBlogs = async () => {
    const res = await callApi("blogs", "get")
    return res
}

const BlogsPage = () => {
    const { status, data, } = useQuery("blogs", fetchBlogs)
    console.log(data);
    return (
        <div className="container">
            <p>{status}</p>
            <div className="row">
                {status === 'loading' && (
                    <div className="col-md-12"><h4>Loading Data ....</h4></div>
                )}
                {status === 'error' && (
                    <div className="col-md-12"><h4>Error fetching data</h4></div>
                )}
                {status === 'success' &&
                    data.map((blog, i) => {
                        return (
                            <div key={i} className="col-md-4"><Blog /></div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default BlogsPage
