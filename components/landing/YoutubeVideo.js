const YoutubeVideo = ({ youtubeId }) => {
  return (
    <div className="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <style jsx>{`
        .video-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .video-container::after {
          padding-top: 56.25%;
          display: block;
          content: "";
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default YoutubeVideo;
