'use client';

import { View, Map } from "ol";
import { RefObject, useEffect, useRef } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Link from "next/link";

export function MapView() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            new Map({
                layers: [new TileLayer({
                    source: new OSM({
                    })
                })],
                view: new View({ center: [0, 0], zoom: 1 }),
                target: ref.current
            });
        }
    }, [ref]);

    return (<><div ref={ref} className="w-full h-screen" />
        <Link href='https://www.openstreetmap.org/copyright' className="p-1 text-xs bg-white rounded border fixed bottom-2 right-2">
            © OpenStreetMap contributors
        </Link></>
    );
}