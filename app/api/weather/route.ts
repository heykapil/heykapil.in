import { NextResponse } from 'next/server';

export async function WeatherData() {
   
    const lat = '28.644800';
    const long = '77.216721';
    const res = await fetch(`${process.env.WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.WEATHER_API_KEY}`,{next:{ revalidate: 3600 }})
    const data = await res.json()
 
    return NextResponse.json(data)
}