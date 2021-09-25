export const tabNames = {
    ARTS: 'art',
    MUSIC: 'music',
    COLLECTIBLES: 'collectible',
    FASHION: 'fashion'
}

const BACKEND_TAB = {
    [tabNames.ARTS]: 'art',
    [tabNames.MUSIC]: 'music',
    [tabNames.COLLECTIBLES]: 'collectible',
    [tabNames.FASHION]: 'fashion'
}

export const getCategoryFromTab = (tabName)=>{
    return BACKEND_TAB[tabName]
}

export const tabList = [tabNames.ARTS, tabNames.MUSIC, tabNames.COLLECTIBLES, tabNames.FASHION];
