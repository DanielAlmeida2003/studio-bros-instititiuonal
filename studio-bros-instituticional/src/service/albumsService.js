class AlbumService {

    constructor(httpClient) {
      this.httpClient = httpClient;
    }
  
    async fetchAlbums(artistId, token) {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.items;
    };
  
    async fetchAlbumsWithCoverImages(artistId, token) {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data.items.filter(album => album.images && album.images.length > 0);
    };
  
    async fetchTracksFromAlbums(albums, token) {
      const allTracks = [];
      for (const album of albums) {
        const response = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?limit=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        allTracks.push(...data.items.map(track => ({ ...track, albumCover: album.images[0].url })));
      }
      return allTracks
    }
  }
  
  export default AlbumService;