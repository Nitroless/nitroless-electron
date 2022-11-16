import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector, useDispatch } from 'react-redux';

import './Emote.css'
import { addEmoteToFrequentlyUsed, setCopiedFalse, setCopiedTrue, setSelectedEmote } from '../app/viewModel';

const Emote = ({ emoteData, emote, contextMenu }) => {
    const url = useSelector((state) => state.viewModel.selectedRepo.url);
    const path = useSelector((state) => state.viewModel.selectedRepo.data.path);

    const [emoteLoaded, setEmoteLoaded] = useState(false);
    const [emoteURL, setEmoteURL] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (emoteData) {
            const { name, type } = emoteData;
            setEmoteURL("" + url + "/" + path + "/" + name + "." + type);
        } else {
            setEmoteURL(emote);
        }
    }, [url, path, emoteData, emote]);

    return (
        <div 
            key={emoteURL} 
            className='emoteContainer' 
            onClick={(e) => {
                e.preventDefault();
                dispatch(setCopiedTrue());
                setTimeout(async () => {
                    await window.navigator.clipboard.writeText(emoteURL);
                    dispatch(addEmoteToFrequentlyUsed({ emote: emoteURL }));
                });
                setTimeout(() => {
                    dispatch(setCopiedFalse());
                }, 1200);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (contextMenu) {
                    dispatch(setSelectedEmote({ url: url, path: path, emote: emoteData ? emoteData : emoteURL }));
                }
            }}
        >
            <ClipLoader
                color="#5865F2"
                loading={!emoteLoaded}
                speedMultiplier={0.4}
            />
            <img src={ emoteURL } alt={ emoteData ? emoteData.name : emoteURL } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
        </div>
    )
}

export default Emote