import React from 'react'
import Blogcss from "./Blog.module.css"

const Blog = () => {
    return (
        <div className={Blogcss.card}>
            <div className={Blogcss.box}>
                <div className={Blogcss.img}>
                    <img src="https://www.planwallpaper.com/static/images/cool-wallpaper-5_G6Qe1wU.jpg" />
                </div>
                <h2>  Web Graphic Designer </h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et.</p>

            </div>
        </div>

    )
}

export default Blog
