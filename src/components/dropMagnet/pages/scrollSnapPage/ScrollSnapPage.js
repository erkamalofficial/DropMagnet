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
import LoadingModal from "../../../elements/LoadingModal/LoadingModal";
import axios from 'axios'

const ScrollSnapPage = ({ darkTheme, changeSlide, data }) => {

    const { isInitialized, Moralis } = useMoralis()
    const { link, user, id } = useParams()
    const { currentUser } = useAuth()

    const [metaURL, setmetaURL] = useState(null)
    const [polygonNfts, setPolygonNfts] = useState([])
    const [ethNfts, setEthNfts] = useState([])
    const [loading, setLoading] = useState(false)
    const [ethLoading, setEthLoading] = useState(false)
    const [polygonLoading, setPolygonLoading] = useState(false)
    const [pdModal, setpdModal] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [password, setPassword] = useState('')
    const [spAddress, setSpAddress] = useState('')

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

    const fetchNFTsUtils = async (address, data, chain) => {
        let results = []
        results = data.map(async d => {
            if (d.token_id && d.token_uri) {
                let res = await fetch(fixUrl(d.token_uri))
                    .then(res => res.json())
                    .catch(err => null)
                const options = { address: address, token_id: d.token_id, chain: chain };
                const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);
                console.log(res, tokenIdMetadata)
                if (res && (res.name || res.image || res.id || res.description)) return res
                else return null
            }
        })
        return results
    }

    const fetchNFTs = async (metaurl, chain) => {
        if (isInitialized) {
            for (const wa of metaurl.addresses) {

                let response = await Moralis.Web3API.account.getNFTs(
                    { chain: chain, address: wa.address, limit: 100 }
                )
                let nfts = []
                response.result.forEach(async (d) => {
                    if (d.metadata) {
                        nfts.push(JSON.parse(d.metadata))
                    }
                    else if (d.token_uri) {
                        let res = await fetch(fixUrl(d.token_uri))
                            .then(res => res.json())
                        if (res && (res.name || res.image || res.id || res.description))
                            nfts.push(res)
                    }
                })

                if (chain === 'eth') {
                    nfts = ethNfts.concat(nfts)
                    setEthNfts(nfts)
                }
                else if (chain === 'polygon') {
                    nfts = polygonNfts.concat(nfts)
                    setPolygonNfts(nfts)
                }
            }
            if (chain === 'eth') setTimeout(() => {setEthLoading(false)}, 1000);
            else if (chain === 'polygon') setTimeout(() => {setPolygonLoading(false)}, 1000);
        }

    }

    const fetchFromSA = async (metaurl, address, chain) => {
        if (isInitialized) {
            let response = await Moralis.Web3API.account.getNFTs(
                { chain: chain, address: address }
            )
            let nfts = []
            response.result.forEach(async (d) => {
                if (d.metadata) {
                    nfts.push(JSON.parse(d.metadata))
                }
                else if (d.token_uri) {
                    let res = await fetch(fixUrl(d.token_uri))
                        .then(res => res.json())
                    if (res && (res.name || res.image || res.id || res.description))
                        nfts.push(res)
                }
            })

            if (chain === 'eth') {
                nfts = ethNfts.concat(nfts)
                setEthNfts(nfts)
            }
            else if (chain === 'polygon') {
                nfts = polygonNfts.concat(nfts)
                setPolygonNfts(nfts)
            }

            if (chain === 'eth') setEthLoading(false)
            else if (chain === 'polygon') setPolygonLoading(false)
        }
    }

    const verifyPD = () => {
        if (password !== '') {
            DropMagnetAPI.verifyPassword(id, password)
                .then(async res => {
                    if (res.status === 200) {
                        alert("Verified!")
                        setpdModal(false)
                        setEthLoading(true)
                        setPolygonLoading(true)
                        await fetchNFTs(metaURL, "polygon")
                        await fetchNFTs(metaURL, "eth")
                    }
                    else {
                        alert("Wrong password!!")
                    }
                })
        }
        else {
            alert("Enter password.")
        }

    }

    const showPDModal = () => {
        return (
            <div className="cnf-modal">
                <div className="content">
                    <div className="modal-title">
                        This MetaURL Is Private!
                    </div>
                    <p>
                        To view this page, you have to enter password.
                    </p>

                    <input placeholder="Enter password here"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={verifyPD}>
                        View Page
                    </button>
                </div>
            </div>
        )
    }

    const getMetaURL = () => {
        setLoadingModal(true)
        DropMagnetAPI.getMetaURLById(id)
            .then(async res => {
                if (res.status === 409) {
                    alert("This wallet already exists.")
                }
                else {
                    setmetaURL(res)
                    setLoadingModal(false)
                    if (res.privacy === 'private') {
                        setpdModal(true)
                    }
                    else if (res.privacy === 'smart') {
                        setSpAddress(res.specificAddress)
                        setEthLoading(true)
                        setPolygonLoading(true)
                        await fetchFromSA(res, res.specificAddress, "polygon")
                        await fetchFromSA(res, res.specificAddress, "eth")
                    }
                    else {
                        setEthLoading(true)
                        setPolygonLoading(true)
                        await fetchNFTs(res, "polygon")
                        await fetchNFTs(res, "eth")
                    }
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
            {loadingModal && <LoadingModal label="Loading data...." />}
            {pdModal ? (
                showPDModal()
            ) : (
                <>
                    {
                        filteredData.map((item) => {
                            return (
                                <React.Fragment key={item.id}>
                                    {item.content}
                                </React.Fragment>
                            )
                        })
                    }
                    {(polygonNfts.length === 0 && polygonLoading) ? (<section ref={galleryRef}><Spinner /></section>) :
                        polygonNfts.map(n => (
                            <section ref={galleryRef}>
                                <Gallery {...firstSlide} iOS={iOS} nft={n} />
                            </section>
                        ))}
                    {(ethNfts.length === 0 && ethLoading) ? (<section ref={galleryRef}><Spinner /></section>) :
                        ethNfts.map(n => (
                            <section ref={galleryRef}>
                                <Gallery {...firstSlide} iOS={iOS} nft={n} />
                            </section>
                        ))}
                    {/* props={props}*/}
                    <PageLiksComponent darkTheme={darkTheme} galleryRef={galleryRef} coverPageRef={coverPageRef} userComponentStyles='user-component-styles' />
                </>
            )}
        </article>
    )
}

export default ScrollSnapPage