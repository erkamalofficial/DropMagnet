
import FastAverageColor from "fast-average-color";

const fac = new FastAverageColor();

export const getDominantColorFromImages = async (imageList) => {
    const imageFetchColorPromise = imageList.map(async imageListItem => {
        const color = await fac.getColorAsync(imageListItem.url);
        return { color, id: imageListItem.id, url: imageListItem.url }
    });
    return await Promise.all(imageFetchColorPromise);
}
