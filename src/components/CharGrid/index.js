import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import CharGrid from './CharGrid.styled';
import Paginator from '../Paginator';
import CharCard from '../CharCard';
import DialogBox from '../DialogBox';
import RadioInput from '../RadioInput';
import Switch from '../Switch';

import SideDrawerContext from '../../contexts/SideDrawer/context';

import { ReactComponent as FilterIcon } from '../../assets/svgs/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/svgs/sort.svg';

const sortingModes = ['Auction End', 'Level', 'Price', 'Price (bidded only)'];

export default ({ itemsPerPage, data, initialSort, initialOrder }) => {
    const gridRef = useRef(null);
    const listRef = useRef(null);

    const { toggleSideDrawer } = useContext(SideDrawerContext);

    const [sortedData, setSortedData] = useState(data);

    const [charList, setCharList] = useState(sortedData.slice(0, 30));
    const [index, setIndex] = useState(0);
    const [isSortingOpen, setSortingOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(initialSort);
    const [descendingOrder, setDescendingOrder] = useState(initialOrder);


    const sliceList = useCallback((index) => {
        return sortedData.slice(index * itemsPerPage, ((index + 1) * itemsPerPage));
    }, [sortedData, itemsPerPage]);

    const handleAction = (value) => {
        setIndex(value);
        if (gridRef.current && listRef.current) {
            gridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    useEffect(() => {
        setCharList(sliceList(index));
    }, [index, sortedData, sliceList]);

    useEffect(() => {
        handleAction(0);
    }, [sortedData]);

    useEffect(() => {
        setSortedData(applySort(
            data,
            sortingModes[selectedSort],
            descendingOrder
        ));
    }, [data, selectedSort, descendingOrder]);

    return (
        <CharGrid className="custom-scrollbar" ref={gridRef}>
            <header className="grid-header shadow inner-container">
                <div className="left-header-menu">
                    <FilterIcon className="icon clickable" onClick={toggleSideDrawer} />
                    <div className="sorting-wrapper">
                        <SortIcon className="icon clickable" onClick={() => setSortingOpen(prev => !prev)} />
                        <DialogBox isOpen={isSortingOpen} setState={setSortingOpen}>
                            <div className="options-wrapper shadow">
                                <Switch active={descendingOrder} onClick={() => setDescendingOrder(prev => !prev)}>Descending</Switch>
                                {sortingModes.map((mode, index) => (
                                    <RadioInput
                                        key={index}
                                        active={selectedSort === index}
                                        onClick={() => setSelectedSort(index)}
                                    >
                                        {mode}
                                    </RadioInput>
                                ))}
                            </div>
                        </DialogBox>
                    </div>
                </div>

                <Paginator
                    itemsPerPage={itemsPerPage}
                    dataSize={sortedData.length}
                    handleAction={handleAction}
                />
            </header>
            <main className="items-wrapper custom-scrollbar inner-container" ref={listRef}>
                {charList.map(item => <CharCard key={item.id} charData={item} />)}
            </main>
        </CharGrid>
    )
}

const applySort = (oldData, sortingMode, descendingOrder) => {

    const data = [...oldData];

    const byAuctionEnd = (a, b) => {
        if (!descendingOrder) return a.auctionEnd - b.auctionEnd;
        return b.auctionEnd - a.auctionEnd;
    }

    const byLevel = (a, b) => {
        if (!descendingOrder) return a.level - b.level;
        return b.level - a.level;
    }

    const byPrice = (a, b) => {
        if (!descendingOrder) return a.currentBid - b.currentBid;
        return b.currentBid - a.currentBid;
    }

    switch (sortingMode) {
        case 'Auction End':
            return data.sort(byAuctionEnd);

        case 'Level':
            return data.sort(byLevel);

        case 'Price':
            return data.sort(byPrice);

        case 'Price (bidded only)':
            return data.filter(item => item.hasBeenBidded).sort(byPrice);

        default:
            return data;
    }
}