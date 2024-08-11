import axios from 'axios';

class YoutubeService {

    constructor(apiKey) {
        this.apiKey = import.meta.env.VITE_YOUTUBE_KEY_REDIRECT_URI;
        this.baseUrl = 'https://yt-api.p.rapidapi.com/channel/videos';
        this.baseKey = 'UCI3KVa41EWNEdzYdWtchdjA'
    }


    async fetchVideosFromChannel() {

      const options = {
        method: 'GET',
        url: this.baseUrl,
        params: {
          id: this.baseKey
        },
        headers: {
          'x-rapidapi-key': 'a2d2daa9d3mshd38c749250dcd6cp185052jsnaef6471e472c',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        return response.data;
        
      } catch (error) {
        console.error(error);
      }
    }


}

export default YoutubeService;