// Geolocation utility functions

export interface GeolocationData {
    city: string;
    place: string;
    latitude?: number;
    longitude?: number;
}

/**
 * Get user's location using browser Geolocation API
 */
export const getUserLocation = async (): Promise<GeolocationData> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn('Geolocation not supported');
            resolve({ city: '', place: 'unknown' });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Reverse geocoding using OpenStreetMap Nominatim (free)
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    const city = data.address?.city ||
                                data.address?.town ||
                                data.address?.village ||
                                data.address?.state ||
                                '';

                    const place = determinePlace(data.address);

                    resolve({
                        city,
                        place,
                        latitude,
                        longitude
                    });
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                    resolve({
                        city: '',
                        place: 'unknown',
                        latitude,
                        longitude
                    });
                }
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                resolve({ city: '', place: 'unknown' });
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000 // Cache for 5 minutes
            }
        );
    });
};

/**
 * Determine place type from address data
 */
const determinePlace = (address: any): string => {
    // Check for specific amenities
    if (address.amenity) {
        const amenity = address.amenity.toLowerCase();
        if (amenity.includes('restaurant') || amenity.includes('cafe')) return 'cafe';
        if (amenity.includes('school') || amenity.includes('university')) return 'school';
        if (amenity.includes('hospital') || amenity.includes('clinic')) return 'hospital';
        if (amenity.includes('bank')) return 'bank';
        if (amenity.includes('library')) return 'library';
    }

    // Check for building type
    if (address.building) {
        const building = address.building.toLowerCase();
        if (building.includes('residential')) return 'home';
        if (building.includes('office') || building.includes('commercial')) return 'office';
    }

    // Check for road type
    if (address.road) {
        return 'street';
    }

    // Check for specific place types
    if (address.aeroway) return 'airport';
    if (address.railway) return 'railway_station';
    if (address.leisure) {
        const leisure = address.leisure.toLowerCase();
        if (leisure.includes('park')) return 'park';
        if (leisure.includes('gym')) return 'gym';
    }

    // Default based on address components
    if (address.house_number) return 'home';

    return 'unknown';
};

/**
 * Request location permission and store preference
 */
export const requestLocationPermission = async (): Promise<boolean> => {
    try {
        const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

        if (permission.state === 'granted') {
            localStorage.setItem('location_permission', 'granted');
            return true;
        } else if (permission.state === 'prompt') {
            // Will prompt when getUserLocation is called
            return true;
        } else {
            localStorage.setItem('location_permission', 'denied');
            return false;
        }
    } catch (error) {
        // Fallback for browsers that don't support permissions query
        return true;
    }
};

/**
 * Check if user has previously denied location
 */
export const hasLocationPermission = (): boolean => {
    const permission = localStorage.getItem('location_permission');
    return permission !== 'denied';
};

