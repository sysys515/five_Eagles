import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { HttpHeadersContext } from '../context/HttpHeadersProvider';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import "./../../css/map.css"
import { useNavigate } from 'react-router';

const containerStyle = {
    width: '100%',
    height: '600px'
};

const defaultCenter = {
    lat: 37.5665,  // 예: 서울 중심부
    lng: 126.9780
};

const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
];

const Map = () => {
    const [membersLocationInfo, setMembersLocationInfo] = useState({ locationInfoList: [] });
    const [currentLocation, setCurrentLocation] = useState(null);
    const navigate = useNavigate();
    const [center, setCenter] = useState(() => {
        try {
            const savedLocation = localStorage.getItem("myLocation");
            return savedLocation ? JSON.parse(savedLocation) : defaultCenter;
        } catch (e) {
            console.error('Failed to load location from localStorage:', e);
            return defaultCenter; // 오류가 발생하면 기본 위치를 반환
        }
    });
    const { headers } = useContext(HttpHeadersContext);
    const { isLoaded } = useJsApiLoader({
        id: 'mungfriends',
        googleMapsApiKey: "AIzaSyCwg6FKMO4Xbzn8SsCgEeLsqSyv3j7UNt0"
    })

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [gender, setGender] = useState("");
    const [dogBreed, setDogBreed] = useState("");
    const [age, setAge] = useState("");

    const onLoad = useCallback(function callback(map) {
        setMap(map);
        map.setCenter(center);
    }, [center]);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    useEffect(() => {
        fetchMembersLocationInfo();
        initializeCurrentLocation();
    }, []);

    
    const clearMarkers = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    };

    const fetchMembersLocationInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/location", {
                headers,
                params: { gender, dogBreed, age }
            });
            setMembersLocationInfo(response.data);
            clearMarkers();
            response.data.locationInfoList.forEach(member => {
                const marker = new window.google.maps.Marker({
                    position: { lat: member.latitude, lng: member.longitude },
                    map,
                });
                
                // 클릭 이벤트 리스너 추가
                marker.addListener('click', () => {
                    navigate(`/user/${member.userId}`);
                });
                setMarkers(prev => [...prev, marker]);
            });
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const initializeCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const newCurrentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            setCurrentLocation(newCurrentLocation);
            setCenter(newCurrentLocation);
            localStorage.setItem("myLocation", JSON.stringify(newCurrentLocation));
        }, (error) => {
            console.error('Error getting current location:', error);
            setCenter(defaultCenter);  // 위치를 가져오는 데 실패하면 기본 위치 사용
        });
    };

    const goToCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const newCurrentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            setCurrentLocation(newCurrentLocation);
            map.setCenter(newCurrentLocation);
        }, (error) => {
            console.error('Error getting current location:', error);
        });
    };

    const handleSearch = () => {
        fetchMembersLocationInfo();
    };

    return isLoaded ? (
        <Container>
            <Row className="search-filter mb-3 justify-content-center align-items-center">
                <Col md={4}>
                    <Form.Control className="form-control" type="text" placeholder="견종" onChange={e => setDogBreed(e.target.value)} />
                </Col>
                <Col md={4}>
                    <Form.Control as="select" onChange={e => setAge(e.target.value)}>
                    <option>나이</option>
                    {Array.from({ length: 80 }, (_, index) => (
                        <option key={index} value={index + 10}>{index + 10}</option>
                    ))}
                    </Form.Control>
                </Col>
                <Col md={4} className="gender-filter d-flex justify-content-center align-items-center">
                    <Form.Check 
                    inline 
                    className="form-check" 
                    label="남" 
                    type="radio" 
                    name="gender" 
                    onChange={() => setGender("male")} 
                    id="male"
                    />
                    <Form.Check 
                    inline 
                    className="form-check" 
                    label="여" 
                    type="radio" 
                    name="gender" 
                    onChange={() => setGender("female")} 
                    id="female"
                    />
                </Col>
                </Row>
                <Row className="mb-3 justify-content-center">
                <Col md={6} className="d-flex justify-content-center">
                    <Button onClick={handleSearch} className="search-btn">매칭하기</Button>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                    <Button onClick={goToCurrentLocation} className="move-btn">현재 위치로 이동</Button>
                </Col>
            </Row>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ disableDefaultUI: true, styles: myStyles }}
            > s
            {currentLocation && (
                <Marker
                    position={currentLocation}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: '#4285F4',
                        strokeOpacity: 0.8,
                        strokeWeight: 2
                    }}
                />
            )}
            </GoogleMap>
        </Container>
    ) : <></>;
};

export default Map;
