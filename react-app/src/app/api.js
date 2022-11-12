import axios from 'axios';

export const fetchRepoData = async (repoURL) => {
    try {
        const response = await axios.get(repoURL+'index.json');
        if('icon' in response.data && 'name' in response.data && 'path' in response.data && response.data.emotes[0].type.charAt(0) !== '.')
            return response.data;
        else
            return undefined;
    } catch (err) {
        console.error('DEBUG - ', err);
        return err.response.data;
    }
}