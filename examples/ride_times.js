const Uber = require('uber-api')({bearer_token:process.env.UBER_TOKEN,version:'v1'})

// Go to https://developer.uber.com/dashboard/ and create a new token with history_lite access
// Generate an "authorization code" / "OAUTH ACCESS TOKEN" and paste in .env or run:
// export UBER_TOKEN=

Uber.getHistory({limit: 50}, historyParser)
function historyParser(err, data) {
    const starts = data.history
        .map(ride=>ride.start_time) // Extract trip start times
        .map(time=>new Date(time * 1000)) // Convert to dates
        .filter(t=>t.getDay()>0) // Get weekdays
        .filter(t=>t.getDay()<6)

    const time_map = {}
    starts.forEach(t=>time_map[h=t.getHours()]=(time_map[h]||0)+1)
    console.log(
        Object.entries(time_map)
            .map(([t,n])=>`${t}:00 - ${n}`)
        .join('\n')
    )
}