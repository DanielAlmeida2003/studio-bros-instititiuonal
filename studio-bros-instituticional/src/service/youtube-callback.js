class YoutubeService {

    constructor(apiKey) {
        this.apiKey = import.meta.env.VITE_YOUTUBE_KEY_REDIRECT_URI;
        this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    }


    async fetchVideosFromChannel() {
        const response = await fetch(`${this.baseUrl}/search?key=${this.apiKey}&channelId=UCI3KVa41EWNEdzYdWtchdjA&part=snippet,id&order=date&maxResults=20`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        return data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`
        }));
      }


}

export default YoutubeService;