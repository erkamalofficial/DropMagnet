import React from "react";
// import styled from "styled-components";
import classNames from "classnames";
import playBtn from "../../assets/play-btn.svg";
import pauseBtn from "../../assets/pause-btn.svg";
import './style.scss';

// const ProgressBarContainer = styled.div`
// .percent {
//   width: 0;
//   height: 0;
//   z-index: 0;
// }
//
// svg {
//   position: relative;
//   width: 150px;
//   height: 150px;
//   z-index: 1000;
//   transform: rotate(-90deg);
// }
//
// svg circle {
//   width: 100%;
//   height: 100%;
//   fill: none;
//   stroke: transparent;
//   stroke-width: 4;
//   stroke-linecap: round;
//   transform: translate(5px, 5px);
// }
//
// svg circle:nth-child(2) {
//   stroke-dasharray: 440;
//   stroke-dashoffset: 440;
//   stroke-dashoffset: calc(440 - (440 * 10) / 100);
//   stroke: rgba(250, 210, 88, 1.0);
// }
// `;
const AUDIO = [
    {
        title: 'In The Long Run',
        subtitle: 'Port Isla',
        image: 'https://piers.io/codepen/music-player/port-isla/thumb.jpg',
        audio: 'https://piers.io/codepen/music-player/port-isla/audio.m4a'
    }
];

class AudioBubble extends React.Component {
    constructor() {
        super();
        this.state = {
            strokeDashoffset: null
        };
    }
    componentDidMount() {
        this.$audio.addEventListener('loadedmetadata', () => {
            this.duration = this.$audio?.duration || 6000;
        });
        this.pathLength = this.$progress.getTotalLength();
        this.setState({
            strokeDashoffset: this.pathLength
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            const progressUpdater = () => {
                this.updateProgressBar();
                this.progressLoop = requestAnimationFrame(progressUpdater);
            };
            this.$audio.play();
            this.progressLoop = requestAnimationFrame(progressUpdater);
            this.$audio.addEventListener('ended', this.props.onComplete);
        } else {
            cancelAnimationFrame(this.progressLoop);
            this.$audio.addEventListener('ended', this.props.onComplete);
            this.$audio.pause();
            this.$audio.currentTime = 0;
            this.setState({
                strokeDashoffset: this.pathLength
            });
        }
    }
    updateProgressBar() {
        const currentTime = this.$audio.currentTime;
        const percentage = (currentTime / this.duration);
        const strokeDashoffset = percentage * this.pathLength;
        this.setState({
            strokeDashoffset: (this.pathLength - strokeDashoffset)
        });
    }
    handleClick() {
        this.props.setActive();
    }
    render() {
        return (
            <figure
                className={classNames(
                    'audio-bubble',
                    { 'audio-bubble--active': this.props.active }
                )}
            >
                <audio
                    src={this.props.audio}
                    ref={ref => { this.$audio = ref; }}
                />
                <button
                    onClick={this.handleClick.bind(this)}
                    className="audio-bubble__button"
                >
                    <svg
                        viewBox="0 0 200 200"
                        className="audio-bubble__progress"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="100"
                            cy="100"
                            r="97"
                            strokeWidth="3"
                            fill="none"
                            ref={ref => { this.$progress = ref; }}
                            style={{ strokeDashoffset: this.state.strokeDashoffset }}
                        />
                    </svg>
                    <div className="audio-bubble__image"> </div>
                    {!this.props.active &&
                    // <svg className="audio-bubble__play" viewBox="0 0 109.4 124.5">
                    //     <path
                    //         fill="#fff"
                    //         d="M106.4 57L9 .8C5-1.5 0 1.4 0 6v112.5c0 4.6 5 7.5 9 5.2l97.4-56.2c4-2.4 4-8.2 0-10.5z"
                    //     />
                    // </svg>
                    <img src={playBtn} className='audio-bubble__play' alt="play"/>
                    }
                    {this.props.active &&
                    // <svg className="audio-bubble__pause" viewBox="0 0 120.2 124.5">
                    //     <path
                    //         fill="#fff"
                    //         d="M114.2 124.5c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6h-36c-3.3 0-6 2.7-6 6v112.5c0 3.3 2.7 6 6 6h36zM42 124.5c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6H6C2.7 0 0 2.7 0 6v112.5c0 3.3 2.7 6 6 6h36z"
                    //     />
                    // </svg>
                    <img src={pauseBtn} alt="pause" className="audio-bubble__pause"/>
                    }
                </button>
            </figure>
        );
    }
}

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: null };
    }
    onComplete() {
        this.setState({
            activeIndex: null
        });
    }
    setActive(i) {
        const index = i === this.state.activeIndex ? null : i;
        this.setState({
            activeIndex: index
        });
    }
    render() {
        return (
            <div className="player">
                <div className="player__items">
                    {AUDIO.map((audio, i) =>
                        <AudioBubble
                            active={this.state.activeIndex === i}
                            key={audio.title}
                            title={audio.title}
                            subtitle={audio.subtitle}
                            image={audio.image}
                            audio={audio.audio}
                            setActive={this.setActive.bind(this, i)}
                            onComplete={this.onComplete.bind(this)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default ProgressBar;
