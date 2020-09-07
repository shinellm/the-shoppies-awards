import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  TumblrShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  TumblrIcon,
  PinterestIcon,
  WhatsappIcon,
} from "react-share";
       
export default function SocialMediaButtons() {
    return (
        <div id="social-media-btns-container">
            <LinkedinShareButton 
                url={"https://the-shoppies-awards.herokuapp.com/"}
                title={"The Shoppies Awards  - Nominate your favorite movies"}
                summary="">
                <LinkedinIcon size={36} />
            </LinkedinShareButton>
            <FacebookShareButton 
                url={"https://the-shoppies-awards.herokuapp.com/"}
                quote={"The Shoppies Awards  - Nominate your favorite movies"}
                hashtag="#theshoppiesawards">
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton 
                url={"https://the-shoppies-awards.herokuapp.com/"}
                title={"The Shoppies - Nominate your favorite movies"}
                hashtag="#theshoppiesawards">
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <RedditShareButton
                url={"https://the-shoppies-awards.herokuapp.com/"}
                title={"The Shoppies - Nominate your favorite movies"}>
                <RedditIcon size={36} />
            </RedditShareButton>
            <TumblrShareButton
                url={"https://the-shoppies-awards.herokuapp.com/"}
                title={"The Shoppies - Nominate your favorite movies"}
                caption="">
                <TumblrIcon size={36} />
            </TumblrShareButton>
            <PinterestShareButton
                url={"https://the-shoppies-awards.herokuapp.com/"}
                description={"The Shoppies - Nominate your favorite movies"}>
                <PinterestIcon size={36} />
            </PinterestShareButton>
            <WhatsappShareButton 
                url={"https://the-shoppies-awards.herokuapp.com/"}
                title={"The Shoppies - Nominate your favorite movies"}
                separator=":: ">
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
        </div>
    )
}