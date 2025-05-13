// import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom';
// import styles from './MapPage.module.css';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
// import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
// import mapIcon from '../../../assets/icons/map-light.svg';
// import api from '../../../api/api';
// import { toast } from 'react-toastify';
// import Spinner from '../../atoms/Spinner/Spinner';

// //component for centering the map
// function MapCenter({position}) {
//     const map = useMap();
//     useEffect(() => {
//         if (position) {
//             map.setView(position, map.getZoom(), {animate: true});
//         }
//     }, [position, map]);
//     return null;
// }

// //modal content
// function Modal({isOpen, onClose, children, title}) {
//     if (!isOpen) return null;

//     return ReactDOM.createPortal(
//         <div className={styles.modalOverlay} onClick={() => onClose()}>
//             <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//                 <div className={styles.modalHeader}>
//                     <h2 className={styles.modalTitle}>{title}</h2>
//                     <button className={styles.closeButton} onClick={onClose} aria-label="Close">
//                         &times;
//                     </button>
//                 </div>
//                 <div className={styles.modalBody}>
//                     {children}
//                 </div>
//             </div>
//         </div>,
//         document.body
//     );
// }

// //supply item component
// function SupplyItem({ supply }) {
//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleDateString();
//     };

//     return (
//         <div className={styles.supplyItem}>
//             <div className={styles.supplyHeader}>
//                 <h4 className={styles.supplyName}>{supply.supplyName}</h4>
//                 <span className={styles.supplyQuantity}>{supply.totalQuantity} Kilos</span>
//             </div>
//             {
//                 supply.price && (
//                     <div className={styles.supplyPrice}>
//                         ${supply.price}/unit
//                     </div>
//                 )
//             }
//             {
//                 supply.supplyType && (
//                     <div className={styles.supplyTag}>
//                         {supply.supplyType}
//                     </div>
//                 )
//             }
//             {
//                 supply.date && (
//                     <div className={styles.supplyDate}>
//                         Added: {formatDate(supply.date)}
//                     </div>
//                 )
//             }
//         </div>
//     );
// }

// function MapPage() {
//     const [locations, setLocations] = useState([]);
//     const [centerPosition, setCenterPosition] = useState(null);
//     const [selectedSupplier, setSelectedSupplier] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [categoryFilters, setCategoryFilters] = useState([]);
//     const [activeFilter, setActiveFilter] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await api.get('/api/adminSupply/getSupplyLocations');
//                 setLocations(response.data.locations);
                
//                 //extract unique supply types for filters
//                 const types = new Set();
//                 response.data.locations.forEach(location => {
//                     location.suppliers.forEach(supplier => {
//                         supplier.supplies.forEach(supply => {
//                             if (supply.supplyType) types.add(supply.supplyType);
//                         });
//                     });
//                 });
//                 setCategoryFilters(Array.from(types));
//             } catch (error) {
//                 console.error('Error fetching supply locations:', error);
//                 setError('Failed to load supply locations. Please try again later.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const customIcon = (category) => {
        
//         return L.icon({
//             iconUrl: markerIconPng,
//             shadowUrl: markerShadowPng,
//             iconSize: [25, 41],
//             iconAnchor: [12, 41],
//             popupAnchor: [1, -34],
//             shadowSize: [41, 41],
//         });
//     };

//     const handleSupplierClick = (supplier) => {
//         setSelectedSupplier(supplier);
//         setIsModalOpen(true);
//     };

//     const contactSupplier = () => {
//         toast.info("This feature is unavailable because the supplier's contact data is not yet provided.");
//     }    
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedSupplier(null);
//     };

//     const filteredLocations = activeFilter 
//         ? locations.filter(location => 
//             location.suppliers.some(supplier => 
//                 supplier.supplies.some(supply => 
//                     supply.supplyType === activeFilter
//                 )
//             )
//         ) 
//         : locations;

//     //get location details
//     const getSupplierAddress = (supplier) => {
//         const location = locations.find(loc => 
//             loc.suppliers.some(s => s.supplierName === supplier.supplierName)
//         );
//         return location?.locationDetails || {};
//     };

//   return (
//     <div className={styles.mapPage}>
//         <HeaderForm icon={mapIcon} title="SUPPLIER'S MAP" />
        
//         {/* Filter Controls */}
//         {/* <div className={styles.filterControls}>
//             <button 
//                 className={`${styles.filterButton} ${!activeFilter ? styles.activeFilter : ''}`}
//                 onClick={() => setActiveFilter(null)}
//             >
//                 All Supplies
//             </button>
//             {
//                 categoryFilters.map(filter => (
//                     <button 
//                         key={filter}
//                         className={`${styles.filterButton} ${activeFilter === filter ? styles.activeFilter : ''}`}
//                         onClick={() => setActiveFilter(filter)}
//                     >
//                         {filter}
//                     </button>
//                 ))
//             }
//         </div> */}
        
//         {
//             isLoading ? (
//                 <div className={styles.loadingContainer}>
//                     {/* <div className={styles.spinner}></div> */}
//                     <Spinner />
//                     <p>Loading map data...</p>
//                 </div>
//             ) : error ? (
//                 <div className={styles.errorContainer}>
//                     <p>{error}</p>
//                     <button onClick={() => window.location.reload()}>Try Again</button>
//                 </div>
//             ) : (
//                 <div className={styles.mapContainer}>
//                     <MapContainer
//                         center={[7.1095, 124.9257]}
//                         zoom={8}
//                         className={styles.map}
//                         attributionControl={false}
//                     >
//                         <TileLayer
//                             attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />

//                         {centerPosition && <MapCenter position={centerPosition} />}

//                         {
//                             filteredLocations.map((location, idx) => (
//                                 <Marker
//                                     key={idx}
//                                     position={[
//                                         location.locationDetails.latitude,
//                                         location.locationDetails.longitude,
//                                     ]}
//                                     icon={customIcon(location.category)}
//                                     eventHandlers={{
//                                         click: () =>
//                                             setCenterPosition([
//                                                 location.locationDetails.latitude,
//                                                 location.locationDetails.longitude,
//                                             ]),
//                                     }}
//                                 >
//                                     <Tooltip direction='top' offset={[0, -20]} opacity={1} permanent>
//                                         <span className={styles.tooltipContent}>
//                                             {location.suppliers.length === 1
//                                                 ? location.suppliers[0].supplierName
//                                                 : `${location.suppliers.length} suppliers in ${location.locationDetails.city || 'this area'}`
//                                             }
//                                         </span>
//                                     </Tooltip>
//                                     <Popup>
//                                         <div className={styles.popupContent}>
//                                             <h3 className={styles.popupTitle}>
//                                                 {location.locationDetails.city || 'Location'}: {location.suppliers.length} {location.suppliers.length === 1 ? 'Supplier' : 'Suppliers'}
//                                             </h3>
//                                             <div className={styles.popupAddress}>
//                                                 {location.locationDetails.address || 'No address provided'}
//                                             </div>
//                                             <div className={styles.supplierList}>
//                                                 {
//                                                     location.suppliers.map((supplier, idx) => (
//                                                         <div
//                                                             key={idx}
//                                                             onClick={() => handleSupplierClick(supplier)}
//                                                             className={styles.supplierCard}
//                                                         >
//                                                             <div className={styles.supplierName}>{supplier.supplierName}</div>
//                                                             <div className={styles.supplierInfo}>
//                                                                 {supplier.supplies.length} {supplier.supplies.length === 1 ? 'supply' : 'supplies'}
//                                                             </div>
//                                                             <button className={styles.viewDetailsBtn}>View Details</button>
//                                                         </div>
//                                                     ))
//                                                 }
//                                             </div>
//                                         </div>
//                                     </Popup>
//                                 </Marker>
//                             ))
//                         }
//                     </MapContainer>
//                 </div>
//             )
//         }

//         {/* modal details */}
//         <Modal 
//             isOpen={isModalOpen} 
//             onClose={closeModal} 
//             title={selectedSupplier?.supplierName || 'Supplier Details'}
//         >
//             {
//                 selectedSupplier && (
//                     <div className={styles.supplierDetails}>
//                         <div className={styles.supplierInfo}>
//                             <h3 className={styles.supplierName}>{selectedSupplier.supplierName}</h3>
                            
//                             {/* location details */}
//                             <div className={styles.locationDetails}>
//                                 {
//                                     (() => {
//                                         const details = getSupplierAddress(selectedSupplier);
//                                         return (
//                                             <>
//                                                 <p><strong>Location:</strong> {details.city || 'N/A'}{details.province ? `, ${details.province}` : ''}</p>
//                                                 <p><strong>Address:</strong> {details.address || 'No address provided'}</p>
//                                                 <p><strong>Coordinates:</strong> {details.latitude}, {details.longitude}</p>
//                                             </>
//                                         );
//                                     })()
//                                 }
//                             </div>
                            
//                             <div className={styles.supplyStats}>
//                                 <div className={styles.statItem}>
//                                     <span className={styles.statValue}>{selectedSupplier.supplies.length}</span>
//                                     <span className={styles.statLabel}>Products</span>
//                                 </div>
//                                 <div className={styles.statItem}>
//                                     <span className={styles.statValue}>
//                                         {selectedSupplier.supplies.reduce((sum, item) => sum + (parseInt(item.totalQuantity) || 0), 0)}
//                                     </span>
//                                     <span className={styles.statLabel}>Total Kilos</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <h4 className={styles.suppliesHeading}>Supplies</h4>
//                         <div className={styles.suppliesList}>
//                             {
//                                 selectedSupplier.supplies.length === 0 ? (
//                                     <p className={styles.noSupplies}>No supplies currently from this supplier.</p>
//                                 ) : (
//                                     selectedSupplier.supplies.map((supply, idx) => (
//                                         <SupplyItem key={idx} supply={supply} />
//                                     ))
//                                 )
//                             }
//                         </div>
                        
//                         <div className={styles.modalActions}>
//                             <button className={styles.contactBtn} onClick={contactSupplier}>Contact Supplier</button>
//                             <button className={styles.closeModalBtn} onClick={closeModal}>Close</button>
//                         </div>
//                     </div>
//                 )
//             }
//         </Modal>
//     </div>
//   )
// }

// export default MapPage
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from './MapPage.module.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import mapIcon from '../../../assets/icons/map-light.svg';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import Spinner from '../../atoms/Spinner/Spinner';
import { FaChevronDown } from 'react-icons/fa';
import SelectCustomize from '../../molecules/SelectCustomize/SelectCustomize';

//component for centering the map
function MapCenter({position}) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), {animate: true});
        }
    }, [position, map]);
    return null;
}

//modal content
function Modal({isOpen, onClose, children, title}) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={() => onClose()}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

//supply item component
function SupplyItem({ supply }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className={styles.supplyItem}>
            <div className={styles.supplyHeader}>
                <h4 className={styles.supplyName}>{supply.supplyName}</h4>
                <span className={styles.supplyQuantity}>{supply.totalQuantity} Kilos</span>
            </div>
            {
                supply.price && (
                    <div className={styles.supplyPrice}>
                        ₱{supply.price} per kilo
                    </div>
                )
            }
            {
                supply.supplyType && (
                    <div className={styles.supplyTag}>
                        {supply.supplyType}
                    </div>
                )
            }
            {
                supply.date && (
                    <div className={styles.supplyDate}>
                        Added: {formatDate(supply.date)}
                    </div>
                )
            }
        </div>
    );
}

function MapPage() {
    const [locations, setLocations] = useState([]);
    const [centerPosition, setCenterPosition] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                //add supplyType query parameter if a filter is active
                const response = await api.get('/api/adminSupply/getSupplyLocations', {
                    params: activeFilter ? { supplyType: activeFilter } : {}
                });
                setLocations(response.data.locations);
            } catch (error) {
                console.error('Error fetching supply locations:', error);
                setError('Failed to load supply locations. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [activeFilter]);

    const customIcon = (category) => {
        return L.icon({
            iconUrl: markerIconPng,
            shadowUrl: markerShadowPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
    };

    const handleSupplierClick = (supplier) => {
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const contactSupplier = () => {
        toast.info("This feature is unavailable because the supplier's contact data is not yet provided.");
    }    

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSupplier(null);
    };

    //get location details
    const getSupplierAddress = (supplier) => {
        const location = locations.find(loc => 
            loc.suppliers.some(s => s.supplierName === supplier.supplierName)
        );
        return location?.locationDetails || {};
    };

    //filter options
    const filterOptions = [
        { value: null, label: 'ALL SUPPLY' },
        { value: 'FRUIT', label: 'FRUIT' },
        { value: 'VEGETABLE', label: 'VEGETABLE' }
    ];

    const handleFilterSelect = (option) => {
        setActiveFilter(option.value);
        setIsDropdownOpen(false);
    };

    //close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector(`.${styles.filterControlsContainer}`);
            if (dropdown && !dropdown.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <div className={styles.mapPage}>
        <HeaderForm icon={mapIcon} title="SUPPLIER'S MAP" />
        
         <div className={styles.filterControlsContainer}>
            <SelectCustomize
                value={filterOptions.find(option => option.value === activeFilter)?.label || 'ALL SUPPLY'}
                onChange={(selectedLabel) => {
                const selectedOption = filterOptions.find(option => option.label === selectedLabel);
                    if (selectedOption) {
                        handleFilterSelect(selectedOption);
                    }
                }}
                options={filterOptions.map(option => option.label)}
            />
        </div>
        
        {
            isLoading ? (
                <div className={styles.loadingContainer}>
                    <Spinner />
                    <p>Loading map data...</p>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            ) : (
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={[7.1095, 124.9257]}
                        zoom={8}
                        className={styles.map}
                        attributionControl={false}
                    >
                        <TileLayer
                            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {centerPosition && <MapCenter position={centerPosition} />}

                        {
                            locations.map((location, idx) => (
                                <Marker
                                    key={idx}
                                    position={[
                                        location.locationDetails.latitude,
                                        location.locationDetails.longitude,
                                    ]}
                                    icon={customIcon(location.category)}
                                    eventHandlers={{
                                        click: () =>
                                            setCenterPosition([
                                                location.locationDetails.latitude,
                                                location.locationDetails.longitude,
                                            ]),
                                    }}
                                >
                                    <Tooltip direction='top' offset={[0, -20]} opacity={1} permanent>
                                        <span className={styles.tooltipContent}>
                                            {location.suppliers.length === 1
                                                ? location.suppliers[0].supplierName
                                                : `${location.suppliers.length} suppliers in ${location.locationDetails.city || 'this area'}`
                                            }
                                        </span>
                                    </Tooltip>
                                    <Popup>
                                        <div className={styles.popupContent}>
                                            <h3 className={styles.popupTitle}>
                                                {location.locationDetails.city || 'Location'}: {location.suppliers.length} {location.suppliers.length === 1 ? 'Supplier' : 'Suppliers'}
                                            </h3>
                                            <div className={styles.popupAddress}>
                                                {location.locationDetails.address || 'No address provided'}
                                            </div>
                                            <div className={styles.supplierList}>
                                                {
                                                    location.suppliers.map((supplier, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => handleSupplierClick(supplier)}
                                                            className={styles.supplierCard}
                                                        >
                                                            <div className={styles.supplierName}>{supplier.supplierName}</div>
                                                            <div className={styles.supplierInfo}>
                                                                {supplier.supplies.length} {supplier.supplies.length === 1 ? 'supply' : 'supplies'}
                                                            </div>
                                                            <button className={styles.viewDetailsBtn}>View Details</button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                </div>
            )
        }

        {/* modal details (remains the same as before) */}
        <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            title={selectedSupplier?.supplierName || 'Supplier Details'}
        >
            {
                selectedSupplier && (
                    <div className={styles.supplierDetails}>
                        <div className={styles.supplierInfo}>
                            <h3 className={styles.supplierName}>{selectedSupplier.supplierName}</h3>
                            
                            {/* location details */}
                            <div className={styles.locationDetails}>
                                {
                                    (() => {
                                        const details = getSupplierAddress(selectedSupplier);
                                        return (
                                            <>
                                                <p><strong>Location:</strong> {details.city || 'N/A'}{details.province ? `, ${details.province}` : ''}</p>
                                                <p><strong>Address:</strong> {details.address || 'No address provided'}</p>
                                                <p><strong>Coordinates:</strong> {details.latitude}, {details.longitude}</p>
                                            </>
                                        );
                                    })()
                                }
                            </div>
                            
                            <div className={styles.supplyStats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{selectedSupplier.supplies.length}</span>
                                    <span className={styles.statLabel}>Products</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>
                                        {selectedSupplier.supplies.reduce((sum, item) => sum + (parseInt(item.totalQuantity) || 0), 0)}
                                    </span>
                                    <span className={styles.statLabel}>Total Kilos</span>
                                </div>
                            </div>
                        </div>

                        <h4 className={styles.suppliesHeading}>Supplies</h4>
                        <div className={styles.suppliesList}>
                            {
                                selectedSupplier.supplies.length === 0 ? (
                                    <p className={styles.noSupplies}>No supplies currently from this supplier.</p>
                                ) : (
                                    selectedSupplier.supplies.map((supply, idx) => (
                                        <SupplyItem key={idx} supply={supply} />
                                    ))
                                )
                            }
                        </div>
                        
                        <div className={styles.modalActions}>
                            <button className={styles.contactBtn} onClick={contactSupplier}>Contact Supplier</button>
                            <button className={styles.closeModalBtn} onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )
            }
        </Modal>
    </div>
  )
}

export default MapPage