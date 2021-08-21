import React from 'react'

const Plan = () => {
    return (
        <div className="plan-card">
            <div className="plan-card-top">
                <div>
                    <p className="plan-name">Beginner</p>
                    <p className="plan-price">Free</p>
                </div>
                <button className="purchase-btn">
                    <span>Purchase</span>
                </button>
            </div>
            <p className="short-dese">Your max bucket size is 20 drops</p>
            <p className="long-desc">
                You can add 20 drops to your bucket and
                enter reswipe anytime.
            </p>
        </div>


    )
}

export default Plan
