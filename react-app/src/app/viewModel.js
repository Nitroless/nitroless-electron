import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./api";

import axios from "axios";

axios.get("https://nitroless.app/default.json").then((res) => {
    if (JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0) {
        return
    } else {
        let repos = res.data.map((repo) => repo);
        localStorage.setItem('repos', JSON.stringify(repos))
        window.location.reload();
    }
});

const initialState = {
    loading:            true,

    copied:             false,

    allRepos:           JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0 
                        ? JSON.parse(localStorage.getItem('repos')) 
                        : [],

    frequentlyUsed:     JSON.parse(localStorage.getItem('frequentlyUsed')) && JSON.parse(localStorage.getItem('frequentlyUsed')).length > 0
                        ? JSON.parse(localStorage.getItem('frequentlyUsed'))
                        : [],

    favouriteEmotes:    JSON.parse(localStorage.getItem('favouriteEmotes')) && JSON.parse(localStorage.getItem('favouriteEmotes')).length > 0
                        ? JSON.parse(localStorage.getItem('favouriteEmotes'))
                        : [],

    selectedRepo:       {
                            active: false,
                            url: "",
                            favouriteEmotes: [],
                            data: {}
                        },
    
    selectedEmote:      {
                            active: false,
                            repoURL: "",
                            repoPath: "",
                            emote: {}
                        }
}

export const fetchReposAsync = createAsyncThunk('repo/fetch', async (repoURL) => {
    const data = await fetchRepoData(repoURL);

    if(data && data !== undefined) {
        return {
            url: repoURL,
            data: data
        };
    } else {
        alert('Either your internet is not working, or the Repo, either doesn\'t exist or is invalid. If someone shared this Repo to you, please contact them to fix their repo.');
    }
});

const viewModelSlice = createSlice({
    name: 'viewModel',
    initialState,
    reducers: {
        setCopiedTrue: (state) => {
            state.copied = true
        },

        setCopiedFalse: (state) => {
            state.copied = false
        },

        setLoading: (state) => {
            state.loading = !state.loading
        },

        setActiveRepository: (state, action) => {
            const { url, data } = action.payload;
            state.selectedRepo = { active: true, url: url, data: data, favouriteEmotes: JSON.parse(localStorage.getItem(url)) }
        },

        setSelectedEmote: (state, action) => {
            const { url, path, emote } = action.payload;
            state.selectedEmote = { active: true, repoURL: url, repoPath: path, emote: emote };
        },

        deselectEmote: (state) => {
            state.selectedEmote = { active: false, repoURL: "", repoPath: "", emote: {} }
        },

        deselectRepository: (state) => {
            state.selectedRepo = { active: false, url: "", data: {} } 
        },

        removeRepository: (state, action) => {
            console.log(action, state.allRepos)
            const { url } = action.payload;
            let repos = state.allRepos.filter((repo) => repo.url !== url);
            state.repos = repos;
            repos = repos.map((repo) => {
                return repo.url
            });
            localStorage.setItem("repos", JSON.stringify(repos));
            window.location.reload();
        },

        addRepository: (state, action) => {
            const { url } = action.payload;
            let repos = state.allRepos;
            repos.push(url);
            state.repos = repos;
            localStorage.setItem("repos", repos);
        },

        addEmoteToFavourite: (state, action) => {
            const { url, emote } = action.payload;
            let favouriteEmotes = state.favouriteEmotes;
            let repoFavouriteEmotes = state.selectedRepo.active && state.selectedRepo.favouriteEmotes.length > 0 ? state.selectedRepo.favouriteEmotes : [];

            if (favouriteEmotes.length > 0) {
                favouriteEmotes.unshift(emote);
            } else {
                favouriteEmotes = [emote];
            }

            if (repoFavouriteEmotes.length > 0) {
                repoFavouriteEmotes.unshift(emote);
            } else {
                repoFavouriteEmotes = [emote];
            }

            state.selectedRepo.favouriteEmotes = repoFavouriteEmotes;
            state.favouriteEmotes = favouriteEmotes;

            localStorage.setItem("favouriteEmotes", JSON.stringify(favouriteEmotes));
            localStorage.setItem(url, JSON.stringify(repoFavouriteEmotes));
        },

        removeEmoteFromFavourites: (state, action) => {
            const { url, emote } = action.payload;

            let favouriteEmotes = state.favouriteEmotes.filter((favEmote) => favEmote !== emote);
            let repoFavouriteEmotes = state.selectedRepo.favouriteEmotes.filter((favEmote) => favEmote !== emote);

            state.favouriteEmotes = favouriteEmotes;
            state.selectedRepo.favouriteEmotes = repoFavouriteEmotes;

            localStorage.setItem("favouriteEmotes", JSON.stringify(favouriteEmotes));
            localStorage.setItem(url, JSON.stringify(repoFavouriteEmotes));
        },

        addEmoteToFrequentlyUsed: (state, action) => {
            const { emote } = action.payload;

            let frequentlyUsed = state.frequentlyUsed;

            if (frequentlyUsed.length > 0) {
                if (frequentlyUsed.length > 50) {
                    frequentlyUsed = frequentlyUsed.pop();
                }

                if (frequentlyUsed.filter((frEmote) => frEmote === emote).length > 0) {
                    let index = frequentlyUsed.indexOf(emote);
                    frequentlyUsed = frequentlyUsed.splice(index, 1);
                }

                frequentlyUsed.unshift(emote);
            } else {
                frequentlyUsed = [emote];
            }

            state.frequentlyUsed = frequentlyUsed;

            localStorage.setItem("frequentlyUsed", JSON.stringify(frequentlyUsed));
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(fetchReposAsync.fulfilled, (state, action) => {
            const { url, data } = action.payload;

            let allRepos = state.allRepos.map((repo) => {
                if (repo === url) {
                    return {
                        url: url,
                        data: data
                    }
                } else {
                    return repo;
                }
            });

            state.allRepos = allRepos;
        });
    }
});

export const { setLoading, setActiveRepository, deselectRepository, removeRepository, addRepository, addEmoteToFavourite, removeEmoteFromFavourites, addEmoteToFrequentlyUsed, setCopiedTrue, setCopiedFalse, setSelectedEmote, deselectEmote } = viewModelSlice.actions;

export default viewModelSlice.reducer;