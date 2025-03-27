'use client';

import React from 'react';

import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';
import { useRef } from 'react';


const Mapa = () => {

    const searchParams = useSearchParams();
    const lat = searchParams.get('lat');
    const long = searchParams.get('long');
    const position = [lat, long]
    return (
        <>
            <LeafletMap coordinates={position} popup='La tienda' />
        </>
    )
}

export default Mapa

const LeafletMap = ({
    // markers,
    width = "90%",
    height = 700,
    coordinates,
    popup,
}) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const markersRef = useRef([{ lat: coordinates[0], lng: coordinates }]);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                attributionControl: false,
            }).setView(coordinates, 20);

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {}
            ).addTo(mapRef.current);
        }
    }, []);

    useEffect(() => {
        // if (mapRef.current) {
        // To Clear existing markers
        markersRef.current.forEach((marker) => {
            mapRef.current.removeLayer(marker);
        });
        markersRef.current = [];

        // markersRef.current.forEach((markerProps) => {
        const marker = L.marker([coordinates[0], coordinates[1]], {
            icon: L.icon({
                iconUrl: '/img/icon.png',
                iconSize: [30, 32], // size of the icon
                popupAnchor: [-3, -13] // point from which the popup should open relative to the iconAnchor
            }),
        });

        const popupContent = `<b>${popup}<br/>`
        marker.bindPopup(popupContent);

        marker.addTo(mapRef.current);
        markersRef.current.push(marker);
    }, []);

    return (
        <div className='h-svh w-svw'>
            <div
                ref={mapContainerRef}
                className='flex justify-center items-center'
                style={{ height, width }}
            />
        </div>
    );
};
