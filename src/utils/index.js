
import FastAverageColor from "fast-average-color";

const fac = new FastAverageColor();

export const getDominantColorFromImages = async (imageList) => {
    const imageFetchColorPromise = imageList.map(async imageListItem => {
        const color = await fac.getColorAsync(imageListItem.url);
        return { color, id: imageListItem.id, url: imageListItem.url }
    });
    return await Promise.all(imageFetchColorPromise);
}

export const getInitials = (fullName='')=>{
    fullName = typeof fullName === 'string'?fullName: '';
    const [firstName,lastName] = fullName.split(' ');
    if(firstName && lastName){
        return firstName.charAt(0) + lastName.charAt(0);
    }else if(firstName && firstName.length >= 1){
        return firstName.charAt(0) + firstName.charAt(1);
    }else if(firstName){
        return firstName.charAt(0);
    }else{
        return null;
    }
}

export const genARandomColor = ()=>{
    const colorList = ['']
}
