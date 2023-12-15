import React from 'react'
import { NetworkError, handleNetworkError } from './utils/networkHelpers';
import CityCards from "./components/CityCards"

async function getBusinessUnits<BusinessUnit>(url: string): Promise<BusinessUnit[]> {
  const res = await fetch(url);
  if (!res.ok) {
    await handleNetworkError(res, url);
  }
  const data = (await res.json()).data as BusinessUnit[];
  return data;
}

async function getCities<City>(url: string): Promise<City[]> {
  const res = await fetch(url);
  if (!res.ok) {
    await handleNetworkError(res, url);
  }
  const data = (await res.json()).data as City[];
  return data;
}

async function fetchCityOnlineDiagnostics(url: string): Promise<CityDetails>  {
  const res = await fetch(url);
  if (!res.ok) {
    await handleNetworkError(res, url);
  }
  const data = (await res.json()) as CityDetails;
  return data;
}

const CitiesList = async() => {
  const apiURL = process.env.JAROWA_CITY_API_URL || 'https://app-clouds-admin-pool.azurewebsites.net';
  const botApiURL = process.env.JAROWA_CITY_BOT_API_URL || 'https://app-clouds-bot-api-pool.azurewebsites.net';
  const apiKey = process.env.JAROWA_CITY_API_KEY;

  const units: BusinessUnit[] = await getBusinessUnits(`${apiURL}/api/businessUnits?code=${apiKey}`);
  var cities: City[] = []
  for (let unit of units ) {
     const newCities: City[] = await getCities(`${apiURL}/api/cities?code=${apiKey}&businessUnit=${unit.businessUnit}`)
     if (newCities && newCities.length > 0){
       cities = cities.concat(newCities);
      }
  }
  const brokenCities: City[] =[]
  for (let city of cities) {
    const diagnostics = await fetchCityOnlineDiagnostics(`${botApiURL}/Admin/City/${city.key}/onlineDiagnostics?wait=false&refresh=false`);
      if (diagnostics.regions){
        city.onlineDiagnostics = diagnostics;
        if (diagnostics.regions[0]?.frontend.error || diagnostics?.regions[0]?.backend.error ) {
          const lastDiagnostics = await fetchCityOnlineDiagnostics(`${botApiURL}/Admin/City/${city.key}/lastEnableDiagnostics`);
          city.lastDiagnostics = lastDiagnostics
        }
      } else {
        brokenCities.append(city.key)
      }
  }
    
  return (
    <>
    <CityCards cities={cities}/>
    </>
  )
}

export default CitiesList