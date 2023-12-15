import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Spacer, Image } from "@nextui-org/react";
import CityCardCompact from "./CityCardCompact"; 

export default function CityCards({
    cities,
}: {
    cities: City[];
}) {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <Spacer />

            <div className="space-y-4 text-center">
                <h3 className="pb-2 font-bold text-2xl text-gray-800">
                    Pandora
                </h3>
            </div>

            <Spacer y={1} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mt-4">
                {cities.map((city, i) => (
                    <div key={city.key} className="w-full"> {/* Corrected the key prop */}
                        <CityCardCompact city={city} />
                    </div>
                ))}
            </div>
        </div>
    );
}
