import { createServer } from "miragejs"

let server = createServer()
server.get("/api/arts",
    [
        {
            "drop_id": 101,
            "title": "Awesome O Art",
            "description": "My wonderful art was done by da Vinci",
            "artist": "Crypto Art Man",
            "artist_image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg",
            "drop_image": "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992",
            "drop_images": [{ src: "https://lh3.googleusercontent.com/MCG6J-4dGfDxrLYFjEzKt_rEKhHuQxC3sxAR_CkHwnJ4lH5RtR1EveCkdskeRPoZFT2Ykvo1u2NcUxM618Jcgi0=s992", w: 1200, h: 900 }],
            "category": "Art",
            "drop_date": 1617985941,
            "marketplace": "Rarible",
            "marketplace_id": "https://rarible.com/iconow?tab=collectibles",
            "drop_pieces": 9
        },
        {
            "drop_id": 102,
            "title": "FLYING SKULL",
            "description": "My wonderful art was done by da Vinci",
            "artist": "Zonked",
            "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmXnyRawTJUanAV9VNp8uxWmixX2YhQpVNbiauT6d6kG6D&w=100",
            "drop_image": "https://ipfs.rarible.com/ipfs/QmYaVCBzBvaRjLWxwws3L5uojA4Aoz9dYQJmmVAXNbTSF9/image.jpeg",
            "category": "Art",
            "drop_date": 1617985941,
            "marketplace": "Rarible",
            "marketplace_id": "https://rarible.com/iconow?tab=collectibles",
            "drop_pieces": 9
        },
        {
            "drop_id": 103,
            "title": "Sitting On Air",
            "description": `In 1987 Nike created their first air max shoe.
          In 1967 Paolo Lomazzi & crew designed the Blow Chair which was the first mass-produced inflatable chair.
          In 2021, I decided to merge the two and call it “Sitting on Air”."`,
            "artist": "no_fun_studio",
            "artist_image": "https://images.rarible.com/?fit=outsize&n=-1&url=https%3A%2F%2Fipfs.rarible.com%2Fipfs%2FQmaswCxMqPN22Ad9qcimmYYFzJywtuTX5oym7zvZ6F4kY7&w=100",
            "drop_image": "https://ipfs.rarible.com/ipfs/QmNXeNk2UTrNNETFjTzojvjSQezjAEc39mcJKWVb5usuZG/nft.jpg",
            "category": "Art",
            "drop_date": 1617985941,
            "marketplace": "Rarible",
            "marketplace_id": "https://rarible.com/iconow?tab=collectibles",
            "drop_pieces": 9
        }

    ]

);