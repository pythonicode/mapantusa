'use client';

import { View, Map } from "ol";
import { useEffect, useRef } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Link from "next/link";

export function MapView({ zoom = 1 }: { zoom?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map>(null);
    useEffect(() => {
        if (ref.current && !mapRef.current) {
            const map = new Map({
                layers: [new TileLayer({
                    source: new OSM({

                    })
                })],
                view: new View({ center: [0, 0], zoom: 1 }),
                target: ref.current
            });
            (mapRef as any).current = map;
        }
    }, [ref, mapRef]);

    useEffect(() => {
        mapRef.current?.getView().setZoom(zoom);
    }, [mapRef, zoom]);

    return (<div ref={ref} className="w-full h-screen">
        <Link href='https://www.openstreetmap.org/copyright' className="p-1 text-xs bg-white rounded border fixed bottom-2 right-2">
            © OpenStreetMap contributors
        </Link>
    </div>);
}