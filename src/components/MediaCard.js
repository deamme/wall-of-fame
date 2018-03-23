import React, { Component } from "react";
import poster from "../img/giveth.png"; // relative path to image

class MediaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      id: props.id,
      type: props.type,
      ipfs: props.ipfs,
      title: props.title,
      timestamp: props.timestamp,
      description: props.description,
      hideTimer: null,
      _overlay: null,
      date: props.date,
      video_src: null,
      disable: props.disable
    };
  }

  onClick = e => {
    console.log("on click");
  };

    triggerMouseMove = () => {
        if (!this.props.autoplay) {
            this._overlay.style.opacity = "1";

            if (this.hideTimer)
                clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => {
    
                if (this._overlay) {
                    this._overlay.style.opacity = "0";
                }
            }, 1000);
        }
    }

    handleMouseEnter(){
       
        if(this.state.video_src != null){
            if(this.state.disable != "true")
                return
            this.refs.vidRef.play();
        }else{
            this.setState({ video_src: this.state.src }, () => {this.refs.vidRef.play()});
        }
    }
  }

  handleMouseLeave() {
    if (this.state.disable !== "true") return;
    if (this.state.video_src != null) {
      this.refs.vidRef.pause();
    }
  }

    render() {
        const { autoplay, muted } = this.props
        return (
            <div className="card overview-card">
                <div className="VideoWrapper" onMouseMove={this.onMouseMove}  onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}> 
                    {!autoplay && (<div className="overlayContainer" ref={ref => this._overlay = ref} onMouseMove={this.onMouseMove} >
                        <div>
                            <h4 className="overlayTitle">{this.props.title} </h4>
                            <div className="overlayDate">{this.props.date}</div>
                        </div>
                    </div>)}
                    <video
                        ref="vidRef"
                        autoPlay={autoplay}
                        poster={poster}
                        controls
                        muted={muted}
                        loop
                        src={autoplay ? this.state.src : this.state.video_src}
                        className="card-img .embed-responsive-item"
                    />
                </div>
            </div>
          </div>
          <video
            ref="vidRef"
            poster={poster}
            controls
            muted
            loop
            src={this.state.video_src}
            className="card-img .embed-responsive-item"
          />
        </div>
      </div>
    );
  }
}

export default MediaCard;
