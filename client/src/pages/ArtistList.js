import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Artist from '../components/Artist';

import { QUERY_ARTISTS } from '../utils/queries';

const ArtistList = () => {
  const { data: artistData } = useQuery(QUERY_ARTISTS);

  const artists = artistData?.artists || [];

  if (!artists?.length) {
    return <h3>There are no artists in this app!</h3>;
  }

  return (
    <div>
      {artists.map(artist => (
        <Artist
          key={artist._id}
          artistId={artist._id}
          avatar={artist.avatar}
          artistName={artist.artistName}
          email={artist.email}
          songs={artist.songs}
          followers={artist.followers}
        />
      ))}
    </div>
  );
};

export default ArtistList;