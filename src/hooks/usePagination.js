// import React, { useState, useEffect } from 'react'

// export default function usePagination(totalItems, itemsPerPage, initialPage = 0) {
//     const [currentPage, setCurrentPage] = useState(initialPage);

//     useEffect(() => {
//         //reset currentPage if totalItems changes
//         setCurrentPage(Math.floor((totalItems - 1) / itemsPerPage));
//     }, [totalItems, itemsPerPage]);

//     const nextPage = () => {
//         if ((currentPage + 1) * itemsPerPage < totalItems) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const prevPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage(prevPage => prevPage - 1);
//         }
//     };

//     const hasNextPage = (currentPage + 1) * itemsPerPage < totalItems;
//     const hasPrevPage = currentPage > 0;

//     return {currentPage, nextPage, prevPage, hasNextPage, hasPrevPage};
// }
import { useState, useEffect } from 'react'

export default function usePagination(totalItems, itemsPerPage, initialPage = 0) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        //reset currentPage if totalItems changes
        setCurrentPage(Math.floor((totalItems - 1) / itemsPerPage));
    }, [totalItems, itemsPerPage]);

    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < totalItems) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const hasNextPage = (currentPage + 1) * itemsPerPage < totalItems;
    const hasPrevPage = currentPage > 0;

    return {currentPage, nextPage, prevPage, hasNextPage, hasPrevPage};
}
