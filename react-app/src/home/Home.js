import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { addEmoteToFrequentlyUsed, setCopiedFalse, setCopiedTrue } from '../app/viewModel';

import './Home.css'

const Home = ({homeActive}) => {
    const dispatch = useDispatch();
    const frequentlyUsed = useSelector((state) => state.viewModel.frequentlyUsed);
    const favouriteEmotes = useSelector((state) => state.viewModel.favouriteEmotes);
    const [emoteLoaded, setEmoteLoaded] = useState(false);
    
    return (
        <div className='home'>
            {
                homeActive 
                ?
                (
                    <>
                        {
                            favouriteEmotes && favouriteEmotes.length > 0
                            ?
                            (
                                <div className="container">
                                    <div className="title">
                                        <i className="fa-solid fa-star"></i>
                                        <span>Favourite Emotes</span>
                                    </div>
                                    <div className="content emotes">
                                        {
                                            favouriteEmotes.map((emote) => {
                                                return (
                                                    <div 
                                                        key={emote} 
                                                        className='emoteContainer' 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(setCopiedTrue());
                                                            setTimeout(async () => {
                                                                await window.navigator.clipboard.writeText(emote);
                                                                dispatch(addEmoteToFrequentlyUsed({ emote: emote }));
                                                            });
                                                            setTimeout(() => {
                                                                dispatch(setCopiedFalse());
                                                            }, 1200);
                                                        }}
                                                    >
                                                        <ClipLoader
                                                            color="#5865F2"
                                                            loading={!emoteLoaded}
                                                            speedMultiplier={0.4}
                                                        />
                                                        <img src={ emote } alt={ emote } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                            :
                            ""
                        }
                        <div className="container">
                            <div className="title">
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <span>Frequently Used Emotes</span>
                            </div>
                            <div className="content emotes">
                                {
                                    frequentlyUsed.length === 0
                                    ?
                                    (<span><br />Start using nitroless to show your frequently used emotes here.</span>)
                                    :
                                    frequentlyUsed.map((emote) => {
                                        return (
                                            <div 
                                                key={emote} 
                                                className='emoteContainer' 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(setCopiedTrue());
                                                    setTimeout(async () => {
                                                        await window.navigator.clipboard.writeText(emote);
                                                        dispatch(addEmoteToFrequentlyUsed({ emote: emote }));
                                                    });
                                                    setTimeout(() => {
                                                        dispatch(setCopiedFalse());
                                                    }, 1200);
                                                }}
                                            >
                                                <ClipLoader
                                                    color="#5865F2"
                                                    loading={!emoteLoaded}
                                                    speedMultiplier={0.4}
                                                />
                                                <img src={ emote } alt={ emote } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <>
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
                                <div className="socialBrand github" onClick={(e) => window.api.post("openSite", "https://github.com/Nitroless") }>
                                    <i className="fa-brands fa-github"></i>
                                    GitHub
                                </div>
                                <div className="socialBrand source" onClick={(e) => window.api.post("openSite", "https://github.com/Nitroless/nitroless-electron")}>
                                    <i className="fa-solid fa-link"></i>
                                    Source Code
                                </div>
                                <div className="socialBrand source" onClick={(e) => window.api.post("openSite", "https://twitter.com/nitroless_") }>
                                    <i className="fa-brands fa-twitter"></i>
                                    Twitter
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="title">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>Credits</span>
                            </div>
                            <div className="content credits">
                                <br />
                                <div className="credit Alpha">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/TheAlphaStream.png" alt="Alpha_Stream" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>Alpha_Stream</span>
                                            <span className='creditByLine'>Founder and Designer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={ (e) => window.api.post("openSite", "https://alphastream.weebly.com/") }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://github.com/TheAlphaStream/") }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>TheAlphaStream</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://twitter.com/Kutarin_/") }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@Kutarin_</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit ParasKCD">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/paraskcd1315.png" alt="ParasKCD" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>ParasKCD</span>
                                            <span className='creditByLine'>Web, iOS and macOS Developer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://paraskcd.com/") }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://github.com/paraskcd1315/") }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>paraskcd1315</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://twitter.com/ParasKCD") }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@ParasKCD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit LLSC12">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/llsc12.png" alt="llsc12" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>LLSC12</span>
                                            <span className='creditByLine'>iOS and macOS Developer</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://llsc12.github.io/") }>
                                                    <i className='fa fa-link'></i>
                                                    <span>Portfolio</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://github.com/llsc12/") }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>llsc12</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://twitter.com/llsc121") }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@llsc121</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="credit Superbro">
                                    <div className='creditContainer'>
                                        <img src="https://github.com/Superbro9.png" alt="Superbro" />
                                        <div className='creditInformation'>
                                            <span className='creditUserName'>Superbro</span>
                                            <span className='creditByLine'>iOS and macOS Adviser, Quality Control</span>
                                            <div className='creditLinks'>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://github.com/Superbro9/") }>
                                                    <i className='fa-brands fa-github'></i>
                                                    <span>Superbro9</span>
                                                </div>
                                                <div className='creditLink' onClick={(e) => window.api.post("openSite", "https://twitter.com/suuperbro/") }>
                                                    <i className='fa-brands fa-twitter'></i>
                                                    <span>@suuperbro</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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