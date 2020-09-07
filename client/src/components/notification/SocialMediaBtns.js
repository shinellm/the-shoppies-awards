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
                url={"http://localhost:3000/"}
                title={"The Shoppies Awards  - Nominate your favorite movies"}
                summary="">
                <LinkedinIcon size={36} />
            </LinkedinShareButton>
            <FacebookShareButton 
                url={"http://localhost:3000/"}
                quote={"The Shoppies Awards  - Nominate your favorite movies"}
                hashtag="#theshoppiesawards">
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton 
                url={"http://localhost:3000/"}
                title={"The Shoppies - Nominate your favorite movies"}
                hashtag="#theshoppiesawards">
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <RedditShareButton
                url={"http://localhost:3000/"}
                title={"The Shoppies - Nominate your favorite movies"}>
                <RedditIcon size={36} />
            </RedditShareButton>
            <TumblrShareButton
                url={"http://localhost:3000/"}
                title={"The Shoppies - Nominate your favorite movies"}
                caption="">
                <TumblrIcon size={36} />
            </TumblrShareButton>
            <PinterestShareButton
                url={"http://localhost:3000/"}
                description={"The Shoppies - Nominate your favorite movies"}>
                <PinterestIcon size={36} />
            </PinterestShareButton>
            <WhatsappShareButton 
                url={"http://localhost:3000/"}
                title={"The Shoppies - Nominate your favorite movies"}
                separator=":: ">
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
        </div>
    )
}