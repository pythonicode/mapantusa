"use client";

import { View, Map } from "ol";
import { useEffect, useRef } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import Link from "next/link";
import Static from "ol/source/ImageStatic";
import ImageLayer from "ol/layer/Image";

export function MapView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Create map with UTM projection
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 1,
          projection: "EPSG:4326",
          extent: [-140, 20, -50, 55],
        }),
        target: ref.current,
      });

      // Add your image layer
      const image = new ImageLayer({
        opacity: 0.5,
      });

      image.setSource(
        new Static({
          url: "/merged_depr.jpg",
          imageExtent: [
            -88.6932963904261, 42.76132622678787, -88.57545909327027,
            42.84192575240723,
          ],
          projection: "EPSG:4326",
        })
      );

      map.addLayer(image);
    }
  }, [ref]);

  return (
    <>
      <div ref={ref} className="w-full h-screen" />
      <Link
        href="https://www.openstreetmap.org/copyright"
        className="p-1 text-xs bg-white rounded border fixed bottom-2 right-2"
      >
        © OpenStreetMap contributors
      </Link>
    </>
  );
}
