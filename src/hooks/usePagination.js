// // import React, { useState, useEffect } from 'react'

// // export default function usePagination(totalItems, itemsPerPage, initialPage = 0) {
// //     const [currentPage, setCurrentPage] = useState(initialPage);

// //     useEffect(() => {
// //         //reset currentPage if totalItems changes
// //         setCurrentPage(Math.floor((totalItems - 1) / itemsPerPage));
// //     }, [totalItems, itemsPerPage]);

// //     const nextPage = () => {
// //         if ((currentPage + 1) * itemsPerPage < totalItems) {
// //             setCurrentPage(prevPage => prevPage + 1);
// //         }
// //     };

// //     const prevPage = () => {
// //         if (currentPage > 0) {
// //             setCurrentPage(prevPage => prevPage - 1);
// //         }
// //     };

// //     const hasNextPage = (currentPage + 1) * itemsPerPage < totalItems;
// //     const hasPrevPage = currentPage > 0;

// //     return {currentPage, nextPage, prevPage, hasNextPage, hasPrevPage};
// // }
// import { useState, useEffect } from 'react'

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
        //reset currentPage if totalItems or itemsPerPage changes
        //but don't automatically set it to the last page - that's potentially problematic
        const maxPage = Math.max(0, Math.ceil(totalItems / itemsPerPage) - 1);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [totalItems, itemsPerPage, currentPage]);

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