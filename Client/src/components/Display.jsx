// src/components/Display.js
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import { albumsData } from '../assets/assets';

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum ? location.pathname.split('/').pop() : '';
    const bgColor = isAlbum && albumsData[Number(albumId)] ? albumsData[Number(albumId)].bgColor : null;

    useEffect(() => {
        if (isAlbum && bgColor) {
            displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else {
            displayRef.current.style.background = `#121212`;
        }
    }, [bgColor, isAlbum]);

    return (
        <div ref={displayRef} className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <DisplayHome />
        </div>
    );
};

export default Display;
