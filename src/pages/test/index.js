import React, { useState } from "react";
import FinalFour from "../reswipe/final_4";

export default function TestFinalFour() {
  const [deleted, setDeleted] = useState([false, false, false, false]);
  const handleChange = (isDeleted, index) => {
    const newDeleted = [...deleted];
    newDeleted[index] = isDeleted;
    setDeleted(newDeleted);
  };
  return (
    <FinalFour
      bucket={[
        {
          id: "hlNLtlGVdkPB9kmB6eL1",
          user_id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
          title: "Test Drop 5",
          desc: "This is a test drop.",
          price: "0",
          media: [
            {
              url: "https://storage.googleapis.com/drop_content/149444d746b.jpg",
              width: 3840,
              type: "photo",
              height: 2160,
            },
          ],
          is_blocked: false,
          drop_date: 1624636742000,
          category: "art",
          tags: [],
          marketplace: "Rarible",
          created: 1624463979850,
          artist: {
            id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
            username: "dpramanick9990",
            name: "dpramanick9990",
            avatar_url: "",
          },
        },
        {
          id: "ICfjV6IFDHzVMSO5VTbR",
          user_id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
          title: "Future Drop",
          desc: "This is test drop.",
          price: "0",
          media: [
            {
              type: "photo",
              height: 1080,
              width: 1920,
              url: "https://storage.googleapis.com/drop_content/a1f0963870d.jpg",
            },
          ],
          is_blocked: false,
          drop_date: 1624797282000,
          category: "art",
          tags: [],
          marketplace: "Mintable",
          created: 1624451746218,
          artist: {
            id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
            username: "dpramanick9990",
            name: "dpramanick9990",
            avatar_url: "",
          },
        },
        {
          id: "QOZ2NfZkDna0xC5iBSu9",
          user_id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
          title: "Test Drop 7",
          desc: "This is a test drop.",
          price: "5345",
          media: [
            {
              width: 3840,
              url: "https://storage.googleapis.com/drop_content/d9d7e143054.jpg",
              height: 2160,
              type: "photo",
            },
          ],
          is_blocked: false,
          drop_date: 1624723230000,
          category: "art",
          tags: [],
          marketplace: "OpenSea",
          created: 1624464068075,
          artist: {
            id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
            username: "dpramanick9990",
            name: "dpramanick9990",
            avatar_url: "",
          },
        },
        {
          id: "VO2o419g99eorvrm0k9I",
          user_id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
          title: "Future Drop 3",
          desc: "This is test drop.",
          price: "0",
          media: [
            {
              height: 4320,
              width: 7680,
              url: "https://storage.googleapis.com/drop_content/1b1d8ef4b3b.jpg",
              type: "photo",
            },
          ],
          is_blocked: false,
          drop_date: 1624711133000,
          category: "art",
          tags: [],
          marketplace: "Mintable",
          created: 1624451979784,
          artist: {
            id: "4AhNeB9V5BPPuuu1gb5of5WxS1t1",
            username: "dpramanick9990",
            name: "dpramanick9990",
            avatar_url: "",
          },
        },
      ]}
      deleted={deleted}
      onChange={handleChange}
    />
  );
}
