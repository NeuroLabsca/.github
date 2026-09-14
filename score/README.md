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

Four factors, each scored 0-100, then weighted. Weights live in `src/factors.ts`.

| Factor | Weight | Score 100 when | Score 0 when |
|---|---|---|---|
| Storm reach | 40% | Forecast Kp puts the auroral oval overhead at your magnetic latitude | Kp is a full point below what a horizon view here needs |
| Cloud cover | 30% | 0% cover during dark hours | 100% cover |
| Dark hours | 15% | 6 h or more with the sun below -12° | Sun never gets below -12° |
| Moon | 15% | New moon | Full moon |

Storm reach uses the NOAA view line (oval edge magnetic latitude per Kp) with a 4.5°
horizon margin. Magnetic latitude is a centred dipole approximation, accurate to a few
degrees, which is inside the spread of the view-line table.

### Caps

A weighted sum lets a Kp 8 storm under solid cloud score 60. That is wrong, so three
caps override the sum. Each is reported in the result with its reason.

| Condition | Score capped at |
|---|---|
| Cloud cover 85% or more | 20 |
| Under 1 h of real darkness | 10 |
| Storm cannot reach this latitude at all | 10 |

### Verdict

Band lead, then the single biggest thing holding the score back.

| Score | Lead |
|---|---|
| 80-100 | Go out tonight. |
| 60-79 | Good odds tonight. |
| 40-59 | Worth a look if you are already up. |
| 20-39 | Unlikely tonight. |
| 0-19 | Not tonight. |

## Example

```
2026-09-15  85/100  Go out tonight. Conditions line up.
  Storm reach   74 x 0.40 =  29.6   Kp 4, magnetic latitude 55.4. Kp 4 clears the Kp 3.2 horizon threshold. Overhead needs about Kp 5.4.
  Cloud cover   90 x 0.30 =    27   10% cover during dark hours. Mostly clear.
  Dark hours   100 x 0.15 =    15   9.2 h with sun below -12°. Plenty of window.
  Moon          92 x 0.15 =  13.8   8% illuminated. Dark sky. Moon is not a problem.
  weighted sum 85.4
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
