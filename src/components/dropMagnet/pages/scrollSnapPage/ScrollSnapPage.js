import React, {useEffect, useMemo, useRef, useState} from "react";
import "./ScrollSnapPage.scss";
import NewUserContent from "../../components/newUserContent/newUserContent";
import Gallery from "../../components/gallery/gallery";
import galleryImage from "../../assets/gallery.png";
import HoveredCard from "../../components/3dCard/3dCard";
import Three from "../../components/threeJs/threeJs";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import Portrait from "../../components/portrait/portrait";
import Landscape from "../../components/landscape/landscape";
import PageLiksComponent from "../../components/pageLiks/PageLiks";


const ScrollSnapPage = ({darkTheme,changeSlide, data}) => {
    // console.log(data);
    const galleryRef = useRef(null);
    const coverPageRef = useRef(null);
    const firstSlide = useMemo(() => ({id: 1, imgUrl: galleryImage, backgroundColor: "#292929", price: "100"}), []);
    const [filteredData, setFilteredData] = useState([]);

    const iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    // console.log(window.innerHeight)
    // useEffect(() => {
    //
    // },[data])
    // console.log(data)

    const slideItems = useMemo(() => [
        {
            id: 1,
            content: <section ref={coverPageRef}><NewUserContent galleryRef={galleryRef}  coverPageRef={coverPageRef} darkTheme={darkTheme} changeSlide={changeSlide}/></section>
        },
        {
            id: 2,
            content: <section ref={galleryRef}><Gallery {...firstSlide} iOS={iOS}/></section>
        },
        {
            id: 3,
            content: <section><HoveredCard iOS={iOS} /></section>
        },
        {
            id: 4,
            content: <section><Three/></section>
        },
        {
            id: 5,
            content: <section><VideoPlayer iOS={iOS} /></section>
        },
        {
            id: 6,
            content: <section><Portrait/></section>
        },
        {
            id: 7,
            content: <section><Landscape/></section>
        }
    ],[darkTheme,changeSlide, firstSlide, iOS]);
    useEffect(() => {
        const sortOrder = data.map(e => +e.id);
        const sortedArr = [];
        if (sortOrder.length) {
            sortedArr.push(slideItems[0])
        }
        sortOrder.forEach(e => {
            const idx = slideItems.findIndex(el => e === el.id);
            sortedArr.push(slideItems[idx])
        })
        setFilteredData(sortedArr.length ? sortedArr : slideItems);
        // console.log(sortedArr);

    },[data, slideItems])
    return (
        <article className="scroller">
            {
                filteredData.map((item) => {
                    return (
                        <React.Fragment key={item.id}>
                            {item.content}
                        </React.Fragment>
                    )
                })
            }
            {/* props={props}*/}
            <PageLiksComponent darkTheme={darkTheme} galleryRef={galleryRef} coverPageRef={coverPageRef} userComponentStyles='user-component-styles'/>
        </article>
    )
}

export default ScrollSnapPage