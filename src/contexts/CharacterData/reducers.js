import initialData from './initialData';
import { indexedServerData } from '../ServerData/initialData';
import itemData from '../../ItemsData.json';

const applyFilters = (filterState) => {

    const {
        vocation,
        pvp,
        battleye,
        location,
        serverSet,
        minLevel,
        minSkill,
        skillKey,
        itemSet
    } = filterState;

    const auctionsItemsSet = getAuctionIdSetFromItemNameSet(itemSet);

    let filteredData = [];
    for (const character of initialData) {

        const {
            id,
            vocationId,
            serverId,
            level,
            skills
        } = character;

        if(setDoesntHasValue(vocation, vocationId)) continue;

        if(setDoesntHasValue(pvp, indexedServerData[serverId].pvpType.type)) continue;

        if(setDoesntHasValue(battleye, indexedServerData[serverId].battleye)) continue;

        if(setDoesntHasValue(location, indexedServerData[serverId].serverLocation.type)) continue;

        if(setDoesntHasValue(serverSet, indexedServerData[serverId].serverName)) continue;

        if(setDoesntHasValue(auctionsItemsSet, id)) continue;

        if(skillKey.size) {
            let hasMinimumSkill = false;
            const skillArray = Array.from(skillKey);
            
            for(const skillItem of skillArray) {
                if(skills[skillItem].level >= minSkill) {
                    hasMinimumSkill = true;
                    break;
                }
            }
            if(!hasMinimumSkill) continue;
        }
        
        if(level < minLevel) continue;

        filteredData.push(character);
    }

    return filteredData;
}

const setDoesntHasValue = (set, value) => {
    if (set.size && !set.has(value)) {
        return true;
    } else {
        return false;
    }
}

const getAuctionIdSetFromItemNameSet = (nameSet) => {

    const auctionIdSet = new Set([])
    for(const itemName of [...nameSet]) {
        for(const setItem of [...itemData[itemName]]) {
            auctionIdSet.add(setItem);
        }
    }

    return auctionIdSet;
}

export const characterDataReducer = (state, action) => {
    switch (action.type) {
        case 'APPLY_FILTERS':
            return applyFilters(action.filterState);

        default:
            return state;
    }
}