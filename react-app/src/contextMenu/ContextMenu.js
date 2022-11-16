import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addEmoteToFavourite, addEmoteToFrequentlyUsed, deselectEmote, removeEmoteFromFavourites, setCopiedFalse, setCopiedTrue } from '../app/viewModel';

import Emote from '../emote/Emote';

import './ContextMenu.css'

const ContextMenu = () => {
    const contextMenuActive = useSelector((state) => state.viewModel.selectedEmote.active);
    const url = useSelector((state) => state.viewModel.selectedEmote.repoURL);
    const path = useSelector((state) => state.viewModel.selectedEmote.repoPath);
    const favouriteEmotes = useSelector((state) => state.viewModel.favouriteEmotes);
    const emote = useSelector((state) => state.viewModel.selectedEmote.emote);
    const [emoteURL, setEmoteURL] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if(typeof emote === 'string' || emote instanceof String) {
            console.log(emote);
            setEmoteURL(emote);
        } else {
            setEmoteURL("" + url + "/" + path + "/" + emote.name + "." + emote.type);
        }

        return () => setEmoteURL("");
    }, [url, path, emote]);

  return (
    <div className={`contextMenu${contextMenuActive ? " active" : ""}`}>
        <Emote emoteData={ typeof emote === 'string' || emote instanceof String ? undefined : { name: emote.name, type: emote.type } } emote={typeof emote === 'string' || emote instanceof String ? emote : undefined } />
        <div className="contextMenuButtons">
            <button className="contextMenuButton" onClick={(e) => {
                e.preventDefault();
                dispatch(setCopiedTrue());
                setTimeout(async () => {
                    await window.navigator.clipboard.writeText(emoteURL);
                    dispatch(addEmoteToFrequentlyUsed({ emote: emoteURL }));
                    dispatch(deselectEmote());
                });
                setTimeout(() => {
                    dispatch(setCopiedFalse());
                }, 1200);
            }}>
                <i className="fa-solid fa-copy"></i>
                <span>Copy</span>
            </button>
            {
                favouriteEmotes && favouriteEmotes.length > 0 && favouriteEmotes.includes(emoteURL)
                ?
                (
                    <button className="contextMenuButton" onClick={(e) => {
                        e.preventDefault();
                        dispatch(removeEmoteFromFavourites({ url: url, emote: emoteURL }));
                        dispatch(deselectEmote());
                    }}>
                        <i className="fa-solid fa-star"></i>
                        <span>Unfavourite</span>
                    </button>
                )
                :
                (
                    <button className="contextMenuButton" onClick={(e) => {
                        e.preventDefault();
                        dispatch(addEmoteToFavourite({ url: url, emote: emoteURL }));
                        dispatch(deselectEmote());
                    }}>
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