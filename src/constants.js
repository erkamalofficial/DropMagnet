export const tabNames = {
    ARTS: 'arts',
    MUSIC: 'music',
    COLLECTABLES: 'collectables',
    FASHION: 'fashion'
}

const BACKEND_TAB = {
    [tabNames.ARTS]: 'art',
    [tabNames.MUSIC]: 'music',
    [tabNames.COLLECTABLES]: 'collectible',
    [tabNames.FASHION]: 'fashion'
}

export const getCategoryFromTab = (tabName)=>{
    return BACKEND_TAB[tabName]
}

export const tabList = [tabNames.ARTS, tabNames.MUSIC, tabNames.COLLECTABLES, tabNames.FASHION];
