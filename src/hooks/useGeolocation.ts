import { useState, useEffect } from 'react'

export type UserLocation = {
  country: string
  latitude: number
  longitude: number
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getLocation = async () => {
      try {
        // First try to get geolocation from browser
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              
              // Use reverse geocoding to get country
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                )
                const data = await response.json()
                const country = data.address?.country_code?.toUpperCase() || 'US'
                
                setLocation({ country, latitude, longitude })
              } catch {
                // Fallback to US if reverse geocoding fails
                setLocation({ country: 'US', latitude, longitude })
              }
            },
            (err) => {
              console.warn('Geolocation error:', err)
              // Fallback to IP-based geolocation
              getLocationFromIP()
            }
          )
        } else {
          getLocationFromIP()
        }
      } catch (err) {
        console.error('Error getting location:', err)
        setError(err instanceof Error ? err.message : 'Failed to get location')
        setLoading(false)
      }
    }

    const getLocationFromIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const country = data.country_code || 'US'
        
        setLocation({
          country,
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
        })
      } catch (err) {
        console.error('Error getting location from IP:', err)
        // Default to US
        setLocation({ country: 'US', latitude: 0, longitude: 0 })
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  return { location, loading, error }
}
