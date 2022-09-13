import React from 'react';
import styles from './VideoCompound.module.scss';

const VideoCompound = ({ compound }: any): React.ReactElement | null => {
  if (!compound) {
    return null;
  }

  const {
    videoId,
    autoplay,
    loop,
    muted,
  } = compound;

  const src = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay}&muted=${muted}&loop=${loop}`;

  return (
    <div className={styles.videocompound}>
      <iframe src={src} />
    </div>
  );
};

export { VideoCompound };
