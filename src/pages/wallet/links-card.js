import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLinks } from "./actions";
import CardSectionDesktop from "./card-section-desktop";
import CardSectionMobile from "./card-section-mobile";
import Spinner from "../../components/blocks/spinner";
import emojis from "./emojiicons";
import useViewport from "./useViewport";

const getGroupedLinks = (linkList) => {
  const st = new Set();
  linkList.forEach((item) => st.add(...item.tags));
  const uniqueKeys = [...st];

  const groupedList = {};
  linkList.forEach((link) => {
    uniqueKeys.forEach((key) => {
      if (link.tags.includes(key)) {
        groupedList[key] = groupedList[key] || [];
        groupedList[key].push({ icon: emojis[key], title: key, item: link });
      }
    });
  });
  return groupedList;
};
const LinksCard = ({
  setCostText,
  setShowBuyAllBtn,
  handleLinkSelection,
  selectedLinks,
  displayName,
}) => {
  const dispatch = useDispatch();

  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;

  useEffect(() => {
    dispatch(fetchLinks());
  }, []);

  const isLoading = useSelector((state) => state.category.general.isLoading);
  const allLinksList = useSelector((state) => state.category.links);
  var groupedList = {};

  if (allLinksList.length > 0) {
    groupedList = getGroupedLinks(allLinksList);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && allLinksList.length > 0 && (
        <>
          {isMobile ? (
            <CardSectionMobile
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedList}
            />
          ) : (
            <CardSectionDesktop
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedList}
            />
          )}
        </>
      )}
    </>
  );
};

export default LinksCard;
