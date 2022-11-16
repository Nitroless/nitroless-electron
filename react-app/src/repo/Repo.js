import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader';
import { addEmoteToFrequentlyUsed, setCopiedFalse, setCopiedTrue, setSelectedEmote } from '../app/viewModel';
import Emote from '../emote/Emote';

import './Repo.css';

const Repo = () => {
    const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);
    const [emoteLoaded, setEmoteLoaded] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="repo">
            <div className="container dark" onClick={(e) => {
                e.preventDefault();
                window.api.post("openSite", selectedRepo.url);
            }}>
                <div className="repoDetails">
                    <div className="leftDetails">
                        <img src={selectedRepo.url + '/' + selectedRepo.data.icon} alt={selectedRepo.data.name} className="repoIcon" />
                        <span style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                            <h5 style={{padding: '0', margin: '0', marginBottom: '0.2rem'}}>{ selectedRepo.data.name }</h5>
                            <span style={{fontSize: '0.7rem', opacity: '0.8'}}>{ selectedRepo.data.author ? "By " + selectedRepo.data.author : "" }</span>
                        </span>
                    </div>
                    <div className="rightDetails" style={{fontSize: '0.7rem', opacity: '0.8'}}>
                        {selectedRepo.data.emotes.length} emotes
                    </div>
                </div>
            </div>
            {
                selectedRepo.favouriteEmotes.length > 0
                ?
                (
                    <div className="container">
                        <div className="title">
                            <i className="fa-solid fa-star"></i>
                            <span>Favourites</span>
                        </div>
                        <div className="content emotes">
                            {
                                selectedRepo.favouriteEmotes.map((emote) => {
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
                                            onContextMenu={(e) => {
                                                dispatch(setSelectedEmote({ url: selectedRepo.url, emote: emote }));
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
            
            <div className="container emotes">
                {
                    selectedRepo.data.emotes.map((emote) => {
                        return <Emote emoteData={ { name: emote.name, type: emote.type } } contextMenu={true} />
                    })
                }
            </div>
        </div>
    )
}

export default Repo