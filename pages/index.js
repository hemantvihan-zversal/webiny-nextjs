import Head from "next/head";
import { GraphQLClient } from "graphql-request";
import fetch from "node-fetch";
global.fetch = fetch;

export async function getStaticProps(context) {
    const webinyHeadlessCms = new GraphQLClient("https://djs8sj61chcxs.cloudfront.net/cms/read/en-US", {
        headers: {
            authorization: "a16e08a71c35a56d0f54629e1937b22c5188ff1015479ac8"
        }
    });

    const blogPostsData = await webinyHeadlessCms.request(`
    {
        listBlogPosts{
          data{
            id
            content 
            title
            image
          }
        }
      }
    `);

    return {
        props: {
            blogPostsData
        }
    };
}

export default function Home({ blogPostsData }) {
    const blogPosts = blogPostsData.listBlogPosts.data;
    
    const BlogPosts = blogPosts.map(post => (
        <div key={`post-${post.id}`}>
            <h1>{post.title}</h1> 
            <img className="img-fluid" src={`${post.image}`} alt='Girl in a jacket' width='200' height='600'></img>
            <div  className="text-uppercase" dangerouslySetInnerHTML={{ __html: post.content[0].data.text }}></div>
        </div>
    ));
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div id="top-content">
                <h1 className="title">SSG TEST</h1>

                <p className="description">
                    Created using <a href="https://nextjs.org">Next.js</a> and{" "}
                    <a href="https://www.webiny.com/">Webiny Headless CMS</a>
                </p>
                </div>
                <div className="grid">{BlogPosts}</div>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
                </a>
            </footer>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                #top-content{
                    background-color:#000000;
                    color: #FFFFFF;
                    padding: 10px 10px 10px 10px;
                    border-radius: 20px;
                }
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                        Bitstream Vera Sans Mono, Courier New, monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    background-color:#cfcfcf;
                    padding:10px 10px 10px 10px;
                    border-radius:20px;
                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
                        Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
