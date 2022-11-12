import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import './Home.css'

const Home = ({homeActive}) => {
    const dispatch = useDispatch();
    const frequentlyUsed = useSelector((state) => state.viewModel.frequentlyUsed);
    
    return (
        <div className='home'>
            {
                homeActive 
                ?
                (<div className="container">
                    <div className="title">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>Frequently Used Emotes</span>
                    </div>
                    <div className="content">
                        {
                            frequentlyUsed.length === 0
                            ?
                            (<span><br />Start using nitroless to show your frequently used emotes here.</span>)
                            :
                            ""
                        }
                    </div>
                </div>)
                :
                (<>
                    <div className='container'>
                        <div className="title">
                            <i className="fa-solid fa-circle-info"></i>
                            <span>About</span>
                        </div>
                        <div className="content">
                            <p>
                                Nitroless is a small open source project made by students to help people without Nitro be able to use the community's Emotes to be used in discord. Nitroless is entirely community based requiring the community to make repositories where they can insert their own emotes and share them back to the community. The community uses this service by clicking/tapping on the image and it gets copied in their system's clipboard, allowing them to paste the Emote URL in Discord for the people to see.
                            </p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="content socials">
                            <div className="socialBrand github">
                                <i className="fa-brands fa-github"></i>
                                GitHub
                            </div>
                            <div className="socialBrand source">
                                <i className="fa-solid fa-link"></i>
                                Source Code
                            </div>
                            <div className="socialBrand source">
                                <i className="fa-brands fa-twitter"></i>
                                Twitter
                            </div>
                        </div>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default Home