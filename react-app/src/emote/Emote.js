import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector, useDispatch } from 'react-redux';

import './Emote.css'
import { addEmoteToFrequentlyUsed, setCopiedFalse, setCopiedTrue, setSelectedEmote } from '../app/viewModel';

const Emote = ({ emoteData }) => {
    const url = useSelector((state) => state.viewModel.selectedRepo.url);
    const path = useSelector((state) => state.viewModel.selectedRepo.data.path);
    const { name, type } = emoteData;

    const [emoteLoaded, setEmoteLoaded] = useState(false);
    const [emoteURL, setEmoteURL] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setEmoteURL("" + url + "/" + path + "/" + name + "." + type);

        return () => setEmoteURL("");
    }, [url, path, name, type]);

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
                dispatch(setSelectedEmote({ url: url, path: path, emote: emoteData }))
            }}
        >
            <ClipLoader
                color="#5865F2"
                loading={!emoteLoaded}
                speedMultiplier={0.4}
            />
            <img src={ emoteURL } alt={ name } className="emote" style={ emoteLoaded ? {} : { display: 'none' } } onLoad={ () => setEmoteLoaded(true) } />
        </div>
    )
}

export default Emote