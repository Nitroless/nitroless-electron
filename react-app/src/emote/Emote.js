import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector } from 'react-redux';

import './Emote.css'

const Emote = ({ emoteData }) => {
    const url = useSelector((state) => state.viewModel.selectedRepo.url);
    const path = useSelector((state) => state.viewModel.selectedRepo.data.path);
    const { name, type } = emoteData;

    const [emoteLoaded, setEmoteLoaded] = useState(false);
    const [emoteURL, setEmoteURL] = useState("");

    useEffect(() => {
        setEmoteURL("" + url + "/" + path + "/" + name + "." + type);

        return () => setEmoteURL("");
    }, [url, path, emoteData]);

    return (
        <div key={emoteURL} className='emoteContainer'>
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