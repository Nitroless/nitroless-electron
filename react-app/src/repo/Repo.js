import React from 'react'
import { useSelector } from 'react-redux'
import Emote from '../emote/Emote';

import './Repo.css';

const Repo = () => {
    const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);

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
            <div className="container emotes">
                {
                    selectedRepo.data.emotes.map((emote) => {
                        return <Emote emoteData={ { name: emote.name, type: emote.type } } />
                    })
                }
            </div>
        </div>
    )
}

export default Repo