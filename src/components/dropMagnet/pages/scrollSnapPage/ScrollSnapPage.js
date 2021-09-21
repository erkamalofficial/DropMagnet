import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from 'react-router-dom'
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
import { useAuth } from "../../../../contexts/FirebaseAuthContext"
import * as DropMagnetAPI from "../../../../DropMagnetAPI"
import { useMoralis } from "react-moralis";
import { result } from "lodash";
import Spinner from "../../../blocks/spinner";

const ScrollSnapPage = ({ darkTheme, changeSlide, data }) => {

    const { isInitialized, Moralis } = useMoralis()
    const {link, user, id} = useParams()
    const { currentUser } = useAuth()

    const [metaURL, setmetaURL] = useState(null)
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    const galleryRef = useRef(null);
    const coverPageRef = useRef(null);
    const firstSlide = useMemo(() => ({ id: 1, imgUrl: galleryImage, backgroundColor: "#292929", price: "100" }), []);
    const [filteredData, setFilteredData] = useState([]);

    const iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    // console.log(window.innerHeight)
    // useEffect(() => {
    //
    // },[data])
    // console.log(data)

    const fixUrl = (url) => {
        if (url.startsWith("ipfs")) {
            return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/").slice(-1)[0]
        }
        return url + "?format=json"
    }

    const fetchNFTsUtils = async (data) => {
        let results = []
        for (const d of data) {
            let url = fixUrl(d.token_uri)
            try {
                let res = await fetch(url)
                    .then(res => res.json())
                    .catch(err => null)
                if (res && (res.name || res.image || res.id || res.description)) {
                    results.push(res)
                }
            } catch (error) { }
        }
        return results
    }

    const fetchNFTs = async (metaurl) => {
        for (const wa of metaurl.addresses) {
            const options = {
                chain: "polygon",
                address: wa.address,
            };
            let response = await Moralis.Web3.getNFTs(options)
                .then(async res => {
                    let results = await fetchNFTsUtils(res)
                    return results
                })
            let newNfts = nfts.concat(response)
            setNfts(newNfts)
        }
        setLoading(false)
    }

    const getMetaURL = () => {
        DropMagnetAPI.getMetaURLById(id)
            .then(async res => {
                if (res.status === 409) {
                    alert("This wallet already exists.")
                }
                else {
                    setmetaURL(res)
                    setLoading(true)
                    await fetchNFTs(res)
                }
            })
    }

    useEffect(() => {
        if (id) {
            getMetaURL()
        }
    }, [id])

    const slideItems = useMemo(() => [
        {
            id: 1,
            content: <section ref={coverPageRef}><NewUserContent galleryRef={galleryRef} coverPageRef={coverPageRef} darkTheme={darkTheme} changeSlide={changeSlide} /></section>
        }
        // {
        //     id: 2,
        //     content: <>{!nfts ? <section ref={galleryRef}><Spinner /></section> : null}</>
        // }
        // {
        //     id: 3,
        //     content: <section><HoveredCard iOS={iOS} /></section>
        // },
        // {
        //     id: 4,
        //     content: <section><Three /></section>
        // },
        // {
        //     id: 5,
        //     content: <section><VideoPlayer iOS={iOS} /></section>
        // },
        // {
        //     id: 6,
        //     content: <section><Portrait /></section>
        // },
        // {
        //     id: 7,
        //     content: <section><Landscape /></section>
        // }
    ], [darkTheme, changeSlide, firstSlide, iOS]);

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

    }, [data, slideItems])
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
            {(nfts.length === 0 && loading) ? (<section ref={galleryRef}><Spinner /></section>) :
                nfts.map(n => (
                    <section ref={galleryRef}>
                        <Gallery {...firstSlide} iOS={iOS} nft={n} />
                    </section>
                ))}
            {/* props={props}*/}
            <PageLiksComponent darkTheme={darkTheme} galleryRef={galleryRef} coverPageRef={coverPageRef} userComponentStyles='user-component-styles' />
        </article>
    )
}

export default ScrollSnapPage