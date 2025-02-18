import React, { useEffect, useState } from 'react';
import styles from './UsersManagementPage.module.css';
import HeaderForm from '../../../components/molecules/HeaderForm/HeaderForm';
import usersManagementIcon from '../../../assets/icons/partners-management-light.svg';
import SearchBar from '../../atoms/SearchBar/SearchBar';
import CollectorDetailsComponent from './components/CollectorDetailsComponent';
import VendorDetailsComponent from './components/VendorDetailsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectorDetails, fetchCollectors } from '../../../redux/actions/AdminActions/AdminCollectorAction';

function UsersManagementPage() {
    const dispatch = useDispatch();
    const collectors = useSelector((state) => state.collectors.collectors);
    const selectedCollectorDetails = useSelector((state) => state.collectors.collectorDetails);
    const [selectedCollectorId, setSelectedCollectorId] = useState(null);

    useEffect(() => {
        dispatch(fetchCollectors());
    }, [dispatch]);

    const handleUserClick = (collectorId) => {
        setSelectedCollectorId(collectorId);
        dispatch(fetchCollectorDetails(collectorId));
    };

    const handleBackClick = () => {
        setSelectedCollectorId(null);
    };


    // const handleUserClick = (collector, vendor) => {
    //     if (collector) {
    //         setSelectedCollector(collector);
    //         setSelectedVendor(null);
    //     } else if (vendor) {
    //         setSelectedVendor(vendor);
    //         setSelectedCollector(null);
    //     }
    // };
    // const handleBackClick = () => {
    //     setSelectedCollector(null);
    //     setSelectedVendor(null);
    // };

  return (
    <div className={styles.usersManagementPagePage}>
        <HeaderForm icon={usersManagementIcon} title='USERS MANAGEMENT' />

        {/* conditionally render CollectorDetailsComponent if a collector is selected */}
        {/* {
            selectedCollector && (
                <CollectorDetailsComponent onBack={handleBackClick} collector={selectedCollector} />
            )
        } */}
            {
                selectedCollectorId && selectedCollectorDetails && (
                    <CollectorDetailsComponent onBack={handleBackClick} collectorDetails={selectedCollectorDetails} />
                )
            }

        {/* {
            selectedVendor&& (
                <VendorDetailsComponent onBack={handleBackClick} vendor={selectedVendor} />
            )
        } */}


        {/* render usersManagementContainer only if no collector is selected */}
        {
            !selectedCollectorId && (
                <div className={styles.usersManagementContainer}>
                    <div className={styles.cardContainer}>
                        <header className={styles.header}>
                            <h2>Collector</h2>
                            <button className={styles.addButton}>+</button>
                        </header>
                        <div className={styles.statusContent}>
                            <p><span className={`${styles.status} ${styles.active}`}></span> 6 Collectors active</p>
                            <p><span className={`${styles.status} ${styles.offline}`}></span> 12 Collectors offline</p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.contentHeader}>
                                <span>Users</span>
                                <SearchBar />
                                <span className={styles.sort}>Sort by ▼</span>
                            </div>
                            <ul className={styles.userList}>
                                {
                                    collectors.map(collector => (
                                        <li key={collector._id} className={styles.userItem} onClick={() => handleUserClick(collector._id)}>
                                            <span>{collector.fullName}</span> <span className={styles.role}>Fruit Collector</span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className={styles.footer}>Next ➔</div>
                        </div>
                    </div>

                    {/* vendors Section */}
                    <div className={styles.cardContainer}>
                        <header className={styles.header}>
                            <h2>Vendor</h2>
                            <button className={styles.addButton}>+</button>
                        </header>
                        <div className={styles.statusContent}>
                            <p><span className={`${styles.status} ${styles.active}`}></span> 6 Vendors active</p>
                            <p><span className={`${styles.status} ${styles.offline}`}></span> 12 Vendors offline</p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.contentHeader}>
                                <span>Users</span>
                                <SearchBar />
                                <span className={styles.sort}>Sort by ▼</span>
                            </div>
                            <ul className={styles.userList}>
                                <li className={styles.userItem} onClick={() => handleUserClick(null, 'Kyla L. Jardinico')}>
                                    <span>1</span> Kyla L. Jardinico <span className={styles.role}>Vegetable Vendor</span>
                                </li>
                                <li className={styles.userItem} onClick={() => handleUserClick(null, 'Rhea R. Vitualia')}>
                                    <span>2</span> Rhea R. Vitualia <span className={styles.role}>Fruit Vendor</span>
                                </li>
                                <li className={styles.userItem} onClick={() => handleUserClick(null, 'Vench Peria')}>
                                    <span>3</span> Vench Peria <span className={styles.role}>Vegetable Vendor</span>
                                </li>
                                <li className={styles.userItem} onClick={() => handleUserClick(null, 'Kimberly Egnilan')}>
                                    <span>4</span> Kimberly Egnilan <span className={styles.role}>Fruit Vendor</span>
                                </li>
                                <li className={styles.userItem} onClick={() => handleUserClick(null, 'Zyrah Faith Gascon')}>
                                    <span>5</span> Zyrah Faith Gascon <span className={styles.role}>Fruit Vendor</span>
                                </li>
                            </ul>
                            <div className={styles.footer}>Next ➔</div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UsersManagementPage
