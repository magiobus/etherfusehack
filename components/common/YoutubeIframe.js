/* eslint-disable react-hooks/exhaustive-deps */
import YouTube from "react-youtube";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";

const YoutubeIframe = ({ youtubeId, height = "100%", autoplay = false }) => {
  //player should be responsive, 100% width
  //height should be different for tablet and desktop
  const { width } = useWindowSize();
  const [opts, setOpts] = useState({
    height: height,
    width: "100%",
    playerVars: {
      autoplay: autoplay ? 1 : 0,
    },
  });

  //resize player on window resize
  useEffect(() => {
    let height = "200px";
    if (width >= 768) {
      height = "420px";
    }

    const newOpts = { ...opts };
    newOpts.height = height;
    setOpts(newOpts);
  }, [width]);

  //seek to segment start time and play when player is ready
  const onPlayerReady = (event) => {
    console.info("video ready");
  };

  return <YouTube videoId={youtubeId} opts={opts} onReady={onPlayerReady} />;
};

export default YoutubeIframe;
