import React, { useRef, useState, useEffect } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { FormBtn } from '../../../pages/register/FormComponents'
import Spinner from '../../blocks/spinner'

const CropModal = ({ img, setImg, setCropModal, onChange, uploading, setUploading }) => {

    const cropper = useRef(null)
    const [scale, setScale] = useState(1)
    const [file, setFile] = useState(null)

    const saveImage = () => {
        if (cropper) {
            const canvas = cropper.current.getImage()
            let dataURL = canvas.toDataURL();
            var blobBin = atob(dataURL.split(',')[1]);
            var array = [];
            for (var i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            var f = new Blob([new Uint8Array(array)], { type: 'image/png' });
            setFile(f)
            setUploading(true)
        }
    }

    useEffect(() => {
        if (uploading && file) {
            onChange(file)
        }
    }, [uploading, file])

    return (
        <div className="crop-modal">
            <button className="close-button"
                disabled={uploading}
                onClick={() => {
                    setCropModal(false)
                    setImg(null)
                }}>
                <img src="./close-icon.png" alt="/" />
            </button>

            <div className="editor">
                {uploading && (
                    <div className="overlay">
                        <Spinner />
                    </div>
                )}
                <AvatarEditor
                    ref={cropper}
                    image={img}
                    width={400}
                    height={400}
                    border={5}
                    color={[0, 0, 0, 0.8]}
                    scale={scale}
                    borderRadius={250}
                    rotate={0}
                />

                <div className="slider"
                    style={{ marginTop: "14px" }}>
                    <label for="volume"
                        style={{ marginBottom: "8px", display: 'block' }}>Zoom</label>
                    <input type="range"
                        value={scale}
                        onChange={(e => setScale(e.target.value))}
                        min={1} max={10} />
                </div>

                <FormBtn className="w-100" type="submit"
                    onClick={saveImage}
                    style={{ marginTop: "20px" }}>
                    Save
                </FormBtn>
            </div>
        </div>
    )
}

export default CropModal
