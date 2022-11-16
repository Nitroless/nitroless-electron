import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deselectEmote } from '../app/viewModel';

import Emote from '../emote/Emote';

import './ContextMenu.css'

const ContextMenu = () => {
    const contextMenuActive = useSelector((state) => state.viewModel.selectedEmote.active);
    const url = useSelector((state) => state.viewModel.selectedEmote.repoURL);
    const path = useSelector((state) => state.viewModel.selectedEmote.repoPath);
    const favouriteEmotes = useSelector((state) => state.viewModel.favouriteEmotes);
    const { name, type } = useSelector((state) => state.viewModel.selectedEmote.emote);
    const [emoteURL, setEmoteURL] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setEmoteURL("" + url + "/" + path + "/" + name + "." + type);

        return () => setEmoteURL("");
    }, [url, path, name, type]);

  return (
    <div className={`contextMenu${contextMenuActive ? " active" : ""}`}>
        <Emote emoteData={{ name: name, type: type }} />
        <div className="contextMenuButtons">
            <button className="contextMenuButton">
                <i className="fa-solid fa-copy"></i>
                <span>Copy</span>
            </button>
            {
                favouriteEmotes && favouriteEmotes.length > 0 && favouriteEmotes.includes(emoteURL)
                ?
                (
                    <button className="contextMenuButton">
                        <i className="fa-solid fa-star"></i>
                        <span>Unfavourite</span>
                    </button>
                )
                :
                (
                    <button className="contextMenuButton">
                        <i className="fa-regular fa-star"></i>
                        <span>Favourite</span>
                    </button>
                )
            }
            <button className="contextMenuButton" onClick={(e) => {
                e.preventDefault();
                dispatch(deselectEmote());
            }}>
                <i className="fa-solid fa-ban"></i>
                <span>Cancel</span>
            </button>
        </div>
    </div>
  )
}

export default ContextMenu