# Aurora score

Weighted 0-100 aurora viewing score for one location, tonight plus the next two nights.
Every number comes with the breakdown that produced it.

Pure functions, no I/O, no dependencies. Fetch Kp and cloud forecasts elsewhere and pass
them in. Results depend only on location, date, Kp and cloud, so cache by grid cell and
date, not per user.

## v1 scope

- Geolocate or manual location entry
- Tonight's score, plus next 2 nights
- One-line plain-English verdict
- Email or web push alert above user-set threshold
- Nothing else

This package covers the scoring, verdict and alert decision. Location UI, forecast
fetching and delivery of the alert live in the app.

## How the number is built

Two questions, multiplied:

```
score = storm reach × sky
```

An additive model hands out most of its points for a clear, dark, moonless sky before
any aurora exists. Kp 2.7 in Prince Edward Island under a perfect sky scored 66 that way.
Multiplying fixes it: no storm, no score.

**Storm reach** is a gate from 0 to 1. Will a storm this strong be visible from this
magnetic latitude at all? It uses the NOAA view line (oval edge magnetic latitude per Kp)
with a 3.5° horizon margin. Reach is 0 half a Kp below the horizon threshold, 0.5 at the
horizon threshold, and 1 at the overhead threshold. Magnetic latitude is a centred dipole
approximation, accurate to a few degrees, which is inside the spread of the view-line table.

**Sky** is 0-100, a weighted mix of what gets in the way. Weights live in `src/factors.ts`.

| Factor | Weight | Score 100 when | Score 0 when |
|---|---|---|---|
| Cloud cover | 60% | 0% cover during dark hours | 100% cover |
| Dark hours | 20% | 6 h or more with the sun below -12° | Sun never gets below -12° |
| Moon | 20% | New moon | Full moon |

For Charlottetown under a clear sky: Kp 3 scores about 0, Kp 4 about 55, Kp 5 about 80,
Kp 6 about 90.

### Caps

Two caps sit on top of the multiplication and are reported with their reason.

| Condition | Score capped at |
|---|---|
| Cloud cover 85% or more | 15 |
| Under 1 h of real darkness | 10 |

### Verdict

Band lead, then the single biggest thing holding the score back. A cap wins. Then the
gate, if the storm is under the horizon threshold. Then the sky factor that lost the most.

| Score | Lead |
|---|---|
| 80-100 | Go out tonight. |
| 60-79 | Good odds tonight. |
| 40-59 | Worth a look if you are already up. |
| 20-39 | Unlikely tonight. |
| 0-19 | Not tonight. |

## Example

```
2026-09-15  54/100  Worth a look if you are already up. A modest storm: look for a glow low on the northern horizon.
  Storm reach  x0.58 gate           Kp 4, magnetic latitude 55.4. Kp 4 clears the Kp 3.7 horizon threshold. Overhead needs about Kp 5.4.
  Cloud cover   90 x 0.60 =    54   10% cover during dark hours. Mostly clear.
  Dark hours   100 x 0.20 =    20   9.2 h with sun below -12°. Plenty of window.
  Moon          92 x 0.20 =  18.4   8% illuminated. Dark sky. Moon is not a problem.
  sky 92.4 x reach 0.58 = 53.6
```

## Usage

```ts
import { scoreNights, decideAlert } from "./src/index.ts";

const nights = scoreNights({ lat: 46.24, lon: -63.13 }, [
  { date: "2026-09-14", kp: 6, cloudCoverPct: 30 },
  { date: "2026-09-15", kp: 4, cloudCoverPct: 10 },
  { date: "2026-09-16", kp: 2, cloudCoverPct: 90 },
]);
// nights[0].score, .verdict, .breakdown[], .caps[]

const { send, next } = decideAlert(savedState, nights[0].date, nights[0].score, userThreshold);
```

Alerts fire on the upward crossing of the threshold, once per night. Hourly forecast
refreshes on a storm night do not resend. Persist `next` per user.

## Run

```
npm test
npm run typecheck
npm run demo
```

Node 22.6 or newer. Tests use the built-in runner with type stripping.
