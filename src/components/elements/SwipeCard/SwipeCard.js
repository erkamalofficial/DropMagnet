import React, { useState, useEffect } from 'react';
import './SwipeCard.css';
import { Frame, useMotionValue, useTransform, useAnimation, animate } from 'framer';


// export default function SwipeCard(props) {
	
// 	return (
// 		<div className="detail-view">
//       <div className="detail-view-header">
//         <img className="detail-swipe-view-header-image" src={props.drop.artist_image}/>
//         <h1 className="drop-swipe-author-title">{props.drop.artist}</h1>
// 				<div className="detail-swipe-view-placeholder-image"></div>
//       </div>
//       <img className="card-image" src={props.drop.drop_image}/>
//       <h1 className="drop-swipe-detail-title">{props.drop.title}</h1>
// 			<div style={{height: '1px', margin: '0 36px', backgroundColor: '#2F2F2F'}} />
//       <div className="drop-swipe-detail-holder">
//         <div className="drop-marketplace-title">{props.drop.marketplace}</div>
//         <div className="drop-swipe-category-title">{props.drop.category}</div>
// 				<p2 className="drop-swipe-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>
//         <p2 className="drop-swipe-detail-date">{props.drop.drop_date}</p2>
//       </div>
//       <div className="bottom-button-holder">
//         <div onClick={props.dislikeDrop} className="dismiss-button-unselected">
//           <div style={{margin: '-6px auto 0 auto'}}>
//             <img width={34} src="./discard-icon.png" />
//           </div>
//         </div>
//         <div onClick={props.likeDrop} className="add-button-unselected">
//         <img style={{margin: '0 auto'}} width={34} height={34} src="./add-icon.png" />
//         </div>
//       </div>
//     </div>
// 	)
// }

class SwipeCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			move: false,
			limit: false,
			mouseStartPosX: null,
			mouseStartPosY: null,
			mouseCurrPosX: null,
			mouseCurrPosY: null,
			Posx: null,
			Posy: null,
			k: 0.2,
			restX: 0,
			restY: 0,
			fx: 0,
			fy: 0,
			ax: 0,
			ay: 0,
			vx: 0.0,
			vy: 0.0,
			mass: 0.7,
			damping: 0.8
		};
		this.handleDown = this.handleDown.bind(this);
		this.handleUp = this.handleUp.bind(this);
		this.handleMove = this.handleMove.bind(this);
		this.animate = this.animate.bind(this);
		this.updateCard = this.updateCard.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
	}

	componentDidMount() {
		this.animate();
	}

	handleDown(e) {
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.clientX,
			mouseStartPosY: e.clientY
		});
	}

	handleTouchStart(e) {
		e.persist();
		this.setState({
			move: true,
			active: true,
			mouseStartPosX: e.touches[0].screenX,
			mouseStartPosY: e.touches[0].screenY
		});
		console.log("mouse start position", this.state.mouseStartPosX);
	}

	handleMove(e) {
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.clientX;
				let mouseCurrPosY = e.clientY;
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
				let Posy = mouseCurrPosY - this.state.mouseStartPosY;
				let el = document.getElementById("card" + this.props.no);
				let height = window.innerHeight;
				let width = window.innerWidth;
				let maxX = width - width * 20 / 100;
				function map_range(value, low1, high1, low2, high2) {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2) {
					mouseRange = width - mouseRange;
				}
				let damping = map_range(
					mouseRange,
					width / 2,
					width - width * 10 / 100,
					0.6,
					0.8
				);

				this.setState({
					Posx,
					Posy,
					damping,
					mouseCurrPosX,
					mouseCurrPosY
				});
				if (mouseCurrPosX > width - width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = this.state.Posx * 5;
					} else {
						restX = -this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.06;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 20 / 100) {
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
					}
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
					}
					let limit = true;
					let move = false;
					let damping = 0.06;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		} else {
			this.props.handleClick()
		}
	}

	handleTouchMove(e) {
		e.persist();
		if (!this.state.limit) {
			if (this.state.move) {
				let mouseCurrPosX = e.touches[0].screenX;
        let mouseCurrPosY = e.touches[0].screenY;
        console.log('touches x are', mouseCurrPosX)
        console.log('touches y are', mouseCurrPosY)
				let Posx = mouseCurrPosX - this.state.mouseStartPosX;
        let Posy = mouseCurrPosY - this.state.mouseStartPosY;
        console.log('mouse start x are', this.state.mouseStartPosX)
        console.log('mouse start y are', this.state.mouseStartPosY)
				let el = document.getElementById("card" + this.props.no);
				let height = window.innerHeight;
				let width = window.innerWidth;
				let maxX = width - width * 20 / 100;
				function map_range(value, low1, high1, low2, high2) {
					return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
				}
				let mouseRange = mouseCurrPosX;
				if (mouseRange < width / 2) {
					mouseRange = width - mouseRange;
				}
				let damping = map_range(
					mouseRange,
					width / 2,
					width - width * 10 / 100,
					0.6,
					0.8
				);

				this.setState({
					Posx,
					Posy,
					damping,
					mouseCurrPosX,
					mouseCurrPosY
        });

				if (mouseCurrPosX > width - width * 10 / 100) {
          console.log("moving card to the left with curr pos", mouseCurrPosX)
          console.log("moving card to the left with curr pos", mouseCurrPosY)
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = this.state.Posx * 5;
					} else {
						restX = -this.state.Posx * 5;
          }
          console.log("moving card to the left with restX", restX)
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
          }
          console.log("moving card to the left with restY", restY)
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState(
						{
							restX,
							restY,
							limit,
							move,
							damping
						},
						() => {
							setTimeout(() => {
								window.cancelAnimationFrame(this.animate);
							}, 10);
						}
					);
				} else if (mouseCurrPosX < width * 10 / 100) {
          console.log("moving card to the left with curr pos", mouseCurrPosX)
          console.log("moving card to the left with curr pos", mouseCurrPosY)
					let restX, restY;
					if (mouseCurrPosX > width / 2) {
						restX = -this.state.Posx * 5;
					} else {
						restX = this.state.Posx * 5;
          }
          console.log("moving card to the left with restX", restX)
					if (mouseCurrPosY > height / 2) {
						restY = this.state.Posy * 5;
					} else {
						restY = this.state.Posy * 5;
          }
          console.log("moving card to the left with restY", restY)
					let limit = true;
					let move = false;
					let damping = 0.08;
					this.setState({
						restX,
						restY,
						limit,
						move,
						damping
					});
				}
			}
		} else {
			this.props.handleClick()
		}
	}

  handleButtonClickLeft() {

		// this.setState({
		// 	move:true,
		// 	active: true,
		// 	mouseStartPosX: 391,
		// 	mouseStartPosY: -631
		// });

    // let mouseCurrPosX = 50;
    // let mouseCurrPosY = 0;
    // let Posx = mouseCurrPosX - this.state.mouseStartPosX;
    // let Posy = mouseCurrPosY - this.state.mouseStartPosY;

    // let el = document.getElementById("card" + this.props.no);
    // let height = window.innerHeight;
    // let width = window.innerWidth;
    // let maxX = width - width * 20 / 100;
    // function map_range(value, low1, high1, low2, high2) {
    //   return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    // }
    // let mouseRange = mouseCurrPosX;
    // if (mouseRange < width / 2) {
    //   mouseRange = width - mouseRange;
    // }
    // let damping = map_range(
    //   mouseRange,
    //   width / 2,
    //   width - width * 10 / 100,
    //   0.6,
    //   0.8
    // );

    // console.log('damping', damping)

    // this.setState({
    //   Posx,
    //   Posy,
    //   damping,
    //   mouseCurrPosX,
    //   mouseCurrPosY
    // });

    // console.log('width', width - width * 10 / 100)
    // console.log('mouseCurrPosX', mouseCurrPosX)
    // console.log("posx is bigger", width - width * 10 / 100)
    // console.log("posx is smaller", width * 10 / 100)

		// if (mouseCurrPosX < width * 10 / 100) {
    //   console.log("moving card to the left")
    //   let restX, restY;
    //   if (mouseCurrPosX > width / 2) {
    //     restX = -this.state.Posx * 5;
    //   } else {
    //     restX = this.state.Posx * 5;
		// 	}
		// 	console.log("moving card to the left with original restX", restX)
    //   restX = -1700
    //   console.log("moving card to the left with restX", restX)
    //   if (mouseCurrPosY > height / 2) {
    //     restY = this.state.Posy * 5;
    //   } else {
    //     restY = this.state.Posy * 5;
		// 	}
		// 	console.log("moving card to the left with original restY", restY)
		// 	restY = -87
    //   console.log("moving card to the left with restY", restY)
    //   let limit = true;
    //   let move = false;
    //   let damping = 0.08;
    //   this.setState({
    //     restX,
    //     restY,
    //     limit,
    //     move,
    //     damping
    //   });
		// }
		
		this.props.dislikeDrop()
	}

  handleButtonClickRight() {

		// this.setState({
		// 	move:true,
		// 	active: true,
		// 	mouseStartPosX: 391,
		// 	mouseStartPosY: -668
		// });

    // let mouseCurrPosX = 800;
    // let mouseCurrPosY = 0;
    // let Posx = mouseCurrPosX - this.state.mouseStartPosX;
    // let Posy = mouseCurrPosY - this.state.mouseStartPosY;

    // let el = document.getElementById("card" + this.props.no);
    // let height = window.innerHeight;
    // let width = window.innerWidth;
    // let maxX = width - width * 20 / 100;
    // function map_range(value, low1, high1, low2, high2) {
    //   return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    // }
    // let mouseRange = mouseCurrPosX;
    // if (mouseRange < width / 2) {
    //   mouseRange = width - mouseRange;
    // }
    // let damping = map_range(
    //   mouseRange,
    //   width / 2,
    //   width - width * 10 / 100,
    //   0.6,
    //   0.8
    // );

		// console.log('damping', damping)
		// console.log('Posx', Posx)
		// console.log('Posy', Posy)

    // this.setState({
    //   Posx,
    //   Posy,
    //   damping,
    //   mouseCurrPosX,
    //   mouseCurrPosY
    // });

    // console.log('width', width - width * 10 / 100)
    // console.log('mouseCurrPosX', mouseCurrPosX)
    // console.log("posx is bigger", width - width * 10 / 100)
    // console.log("posx is smaller", width * 10 / 100)

    // if (mouseCurrPosX > width - width * 10 / 100) {
    //   console.log("moving card to the right")
    //   let restX, restY;
    //   if (mouseCurrPosX > width / 2) {
    //     restX = this.state.Posx * 5;
    //   } else {
    //     restX = -this.state.Posx * 5;
    //   }
    //   restX = 4200
    //   console.log("moving card to the right with restX", restX)
    //   if (mouseCurrPosY > height / 2) {
    //     restY = this.state.Posy * 5;
    //   } else {
    //     restY = this.state.Posy * 5;
    //   }
    //   restY = -89
    //   console.log("moving card to the right with restY", restY)
    //   let limit = true;
    //   let move = false;
    //   let damping = 0.08;
    //   this.setState(
    //     {
    //       restX,
    //       restY,
    //       limit,
    //       move,
    //       damping
    //     },
		// 		() => {
		// 			setTimeout(() => {
		// 				window.cancelAnimationFrame(this.animate);
		// 			}, 10);
		// 		}
    //   );
		// }
		
		this.props.likeDrop()
	}

	handleUp() {
		this.setState({
			move: false
		});
	}

	handleTouchEnd() {
		this.setState({
			move: false
		});
	}

	updateCard() {
		if (!this.state.move) {
			this.setState(
				{
					fx: -this.state.k * (this.state.Posx - this.state.restX),
					fy: -this.state.k * (this.state.Posy - this.state.restY)
				},
				() => {
					this.setState(
						{
							ax: this.state.fx / this.state.mass,
							ay: this.state.fy / this.state.mass
						},
						() => {
							this.setState(
								{
									vx: this.state.damping * (this.state.vx + this.state.ax),
									vy: this.state.damping * (this.state.vy + this.state.ay)
								},
								() => {
									this.setState({
										Posx: this.state.Posx + this.state.vx,
										Posy: this.state.Posy + this.state.vy
									});
								}
							);
						}
					);
				}
			);
		}
  }

	animate() {
		let el = document.getElementById("card" + this.props.no);
		if (
			this.state.Posx > window.innerWidth + 400 ||
			this.state.Posx < -window.innerWidth - 400
		) {
			cancelAnimationFrame(this.animate);
		} else {
			requestAnimationFrame(this.animate);
		}
		if (this.state.active) {
			if (el) {
				el.style.transform =
					"translate(" +
					this.state.Posx +
					"px" +
					"," +
					this.state.Posy +
					"px) rotate(" +
					this.state.Posx / 9 +
					"deg) perspective(800px)";
				this.updateCard();
			}
		}
	}


  renderPlayButton() {
    return <div className="play-button-icon">
      <img height={38} width={38} style={{paddingLeft: '4px'}} src="./play-icon.png" />
    </div>
  }

	render() {
		console.log('current drop',this.props.drop)
		return (
			<div>
				<div
					id={"card" + this.props.no}
					className={"card"}
					style={{backgroundImage: 'url(' + this.props.drop.drop_image + ')'}}
					onMouseDown={this.handleDown}
					onMouseMove={this.handleMove}
					onMouseUp={this.handleUp}
					onMouseLeave={this.handleUp}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
					onClick={this.props.handleClick}
				>
        	<div className="swipe-card-view-header">
         		<img className="detail-swipe-view-header-image" src={this.props.drop.artist_image}/>
         		<h2 className="drop-swipe-author-title">{this.props.drop.artist}</h2>
 						<div className="detail-swipe-view-placeholder-image"></div>
       		</div>
					{this.props.drop.type === "music" ? this.renderPlayButton() : <></>}
					<img className="card-image" src={this.props.drop.drop_image}/>
					<div className="drop-swipe-detail-title-detail-holder">
						<h2 className="drop-swipe-detail-title">{this.props.drop.title}</h2>
						<div className="drop-swipe-detail-holder">
							<div className="drop-marketplace-title">{this.props.drop.marketplace}</div>
							<div className="drop-swipe-category-title">{this.props.drop.category}</div>
						</div>
					</div>
				</div>
				<div className="swipe-card-bottom-button-holder">
					<div onClick={() => this.handleButtonClickLeft()} className="dismiss-button-unselected">
						<div style={{margin: '-6px auto 0 auto'}}>
							<img className="dislike-icon" src="./discard-icon.png" />
						</div>
					</div>
					<div onClick={() => this.handleButtonClickRight()} className="add-button-unselected">
						<img className="like-icon" src="./add-icon.png" />
					</div>
				</div>
			</div>
    );
	}
}

export default SwipeCard;
