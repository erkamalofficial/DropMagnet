import React from 'react';

const useViewport = () => {
    const [viewportWidth, setViewportWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleWindowResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { viewportWidth };
}

export default useViewport;