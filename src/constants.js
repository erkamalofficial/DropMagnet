export const tabNames = {
    ARTS: 'art',
    MUSIC: 'music',
    COLLECTIBLES: 'collectible',
    FASHION: 'fashion',
    CLONEX:'CloneX',
    DEVINEWOLVES:'TWV',
    SUPERRARE:'SUPR',
    DOODLE:'DOODLE',
    BAYC:'BAYC',
}

const BACKEND_TAB = {
    [tabNames.ARTS]: 'art',
    [tabNames.MUSIC]: 'music',
    [tabNames.COLLECTIBLES]: 'collectible',
    [tabNames.FASHION]: 'fashion',
    [tabNames.CLONEX]: 'CloneX',
    [tabNames.DEVINEWOLVES]: 'TWV',
    [tabNames.SUPERRARE]: 'SUPR',
    [tabNames.DOODLE]: 'DOODLE',
    [tabNames.BAYC]: 'BAYC',
}

export const getCategoryFromTab = (tabName)=>{
    return BACKEND_TAB[tabName]
}

export const tabList = [tabNames.ARTS, tabNames.MUSIC, tabNames.COLLECTIBLES, tabNames.FASHION, tabNames.CLONEX, tabNames.DEVINEWOLVES, tabNames.SUPERRARE , tabNames.DOODLE, tabNames.BAYC ];
