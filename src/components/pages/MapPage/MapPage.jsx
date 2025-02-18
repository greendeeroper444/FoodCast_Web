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

//modal Component
function Modal({isOpen, onClose, children}) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

function MapPage() {
    const [locations, setLocations] = useState([]);
    const [centerPosition, setCenterPosition] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/adminSupply/getSupplyLocations');
                setLocations(response.data.locations);
            } catch (error) {
                console.error('Error fetching supply locations:', error);
            }
        };
        fetchData();
    }, []);

    const customIcon = L.icon({
        iconUrl: markerIconPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const handleSupplierClick = (supplier) => {
        setSelectedSupplier(supplier);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSupplier(null);
    };

  return (
    <div className={styles.mapPage}>
        <HeaderForm icon={mapIcon} title='MAP' />
        <MapContainer
            center={[7.1095, 124.9257]}
            zoom={7}
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
                        icon={customIcon}
                        eventHandlers={{
                            click: () =>
                            setCenterPosition([
                                location.locationDetails.latitude,
                                location.locationDetails.longitude,
                            ]),
                        }}
                    >
                        <Tooltip direction='top' offset={[0, -20]} opacity={1} permanent>
                            <span>
                                {
                                    location.suppliers.length === 1
                                    ? location.suppliers[0].supplierName
                                    : `${location.suppliers.length} suppliers`
                                }
                            </span>
                        </Tooltip>
                        <Popup>
                            <div className={styles.popupContent}>
                                <h2>Supplier</h2>
                                {
                                    location.suppliers.map((supplier, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleSupplierClick(supplier)}
                                            className={styles.supplierName}
                                        >
                                            <ul>
                                                <li>{supplier.supplierName}</li>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </div>
                        </Popup>


                    </Marker>
                ))
            }
        </MapContainer>

        {/* modal for supplier details */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            {
                selectedSupplier && (
                    <div>
                        <h3>{selectedSupplier.supplierName}'s Supplies</h3>
                        <ul>
                            {
                                selectedSupplier.supplies.map((supply, idx) => (
                                    <li key={idx}>
                                        {supply.supplyName} - {supply.totalQuantity} 
                                        {/* units @ ${supply.price}/unit */}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </Modal>

    </div>
  )
}

export default MapPage
