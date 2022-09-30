import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ shareUrl, sharedMessage }) => {
  return (
    <div className="sharebuttons font-bold">
      <p>Comparte este evento en redes sociales.</p>
      <div className="buttons flex space-x-4 mt-2">
        <WhatsappShareButton url={shareUrl} title={sharedMessage}>
          <WhatsappIcon size={35} round={true} />
        </WhatsappShareButton>

        <TwitterShareButton url={shareUrl} title={sharedMessage}>
          <TwitterIcon size={35} round={true} />
        </TwitterShareButton>

        <TelegramShareButton url={shareUrl} title={sharedMessage}>
          <TelegramIcon size={35} round={true} />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
