export const GET = async (request) => {
    const url = new URL(request.url)
    const upc = url.searchParams.get('upc')
    
    if (!upc) {
        return new Response(JSON.stringify({ error: 'UPC is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    try {
        const response = await fetch(`https://us.openfoodfacts.org/api/v0/product/${upc}.json`)
        // const response = await fetch(`https://go-upc.com/api/v1/code/${upc}?key=cf463a2ee661a10213267e08b10cd63f7c5936e52cfc1607dbc9c79f3e44cad3&format=true`)
        const data = await response.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}