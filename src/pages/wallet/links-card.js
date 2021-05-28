import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLinks } from "./actions";
import CardSectionDesktop from "./card-section-desktop";
import CardSectionMobile from "./card-section-mobile";
import Spinner from "../../components/blocks/spinner";
import useViewport from "./useViewport";

const LinksCard = ({
  setCostText,
  setShowBuyAllBtn,
  handleLinkSelection,
  selectedLinks,
  displayName,
  getPageDetails,
}) => {
  const dispatch = useDispatch();

  const { viewportWidth } = useViewport();
  const breakpoint = 620;
  const isMobile = viewportWidth < breakpoint;

  useEffect(() => {
    dispatch(fetchLinks());
  }, []);

  const isLoading = useSelector((state) => state.category.general.isLoading);
  const groupedLinks = useSelector((state) => state.category.groupedLinks);
  const availableLinks = useSelector((state) => state.category.availableLinks);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && groupedLinks.length > 0 && (
        <>
          {isMobile ? (
            <CardSectionMobile
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedLinks}
              availableLinks={availableLinks}
              getPageDetails={getPageDetails}
            />
          ) : (
            <CardSectionDesktop
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedLinks}
              availableLinks={availableLinks}
              getPageDetails={getPageDetails}
            />
          )}
        </>
      )}
    </>
  );
};

export default LinksCard;
