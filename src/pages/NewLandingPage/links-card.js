import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLinks } from "./actions";
import CardSectionDesktop from "./card-section-desktop";
import CardSectionMobile from "./card-section-mobile";
import Spinner from "../../components/blocks/spinner";
import useViewport from "./useViewport";
import { CardsDesktopLoader, CardsMobileLoader } from "./LazyLoaders";

const LinksCard = ({
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
      {isLoading && isMobile ? (
        <CardsMobileLoader
          displayName={displayName}
          handleLinkSelection={handleLinkSelection}
          selectedLinks={selectedLinks}
          linksList={groupedLinks.slice(0, 1)}
          availableLinks={availableLinks}
          getPageDetails={getPageDetails}
        />
      ) : isLoading ? (
        <CardsDesktopLoader
          displayName={displayName}
          handleLinkSelection={handleLinkSelection}
          selectedLinks={selectedLinks}
          linksList={groupedLinks.slice(0, 1)}
          availableLinks={availableLinks}
          getPageDetails={getPageDetails}
        />
      ) : null}

      {!isLoading && groupedLinks.length > 0 && (
        <>
          {isMobile ? (
            <CardSectionMobile
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedLinks.slice(0, 1)}
              availableLinks={availableLinks}
              getPageDetails={getPageDetails}
            />
          ) : (
            <CardSectionDesktop
              displayName={displayName}
              handleLinkSelection={handleLinkSelection}
              selectedLinks={selectedLinks}
              linksList={groupedLinks.slice(0, 1)}
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
