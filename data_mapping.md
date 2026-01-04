# Data Mapping - Screens & Database

This document maps the UI components to the data stored in Neon DB.

## 📱 Registration Form (`/apply`)

The following data is collected via the `ApplyForm.jsx` component and sent to the `quickdrop_registrations` table.

| UI Field Label     | DB Column         | Data Type / Constraint                                     |
| :----------------- | :---------------- | :--------------------------------------------------------- |
| Name               | `name`            | `VARCHAR(255)` (Required)                                  |
| Email              | `email`           | `VARCHAR(255)` (Unique, Required)                          |
| Timezone           | `timezone`        | `ENUM` (et, ct, mt, pt, gmt3, gmt, cet)                    |
| Tech Stack         | `stack`           | `ENUM` (fullstack, frontend, backend, mobile, data, other) |
| GitHub             | `github_url`      | `VARCHAR(500)` (Required, URL)                             |
| X (Twitter)        | `x_url`           | `VARCHAR(500)` (Optional, URL)                             |
| LinkedIn           | `linkedin_url`    | `VARCHAR(500)` (Optional, URL)                             |
| Demo Preference    | `demo_interest`   | `ENUM` (yes, no)                                           |
| Fairplay Agreement | `fairplay_agreed` | `BOOLEAN` (Must be TRUE)                                   |

## ⚙️ System Generated Data

The following fields are managed by the API or Database triggers.

| DB Column        | Source      | Description                                        |
| :--------------- | :---------- | :------------------------------------------------- |
| `id`             | DB Serial   | Auto-incrementing primary key.                     |
| `drop_id`        | `.env`      | Taken from `LIVE_DROP_ID` at time of registration. |
| `status`         | API Default | Defaults to `pending`.                             |
| `created_at`     | DB Default  | Timestamp when the record was created.             |
| `updated_at`     | DB Trigger  | Auto-updates on any modification.                  |
| `payment_status` | Placeholder | Default `unpaid` (for future wallet integration).  |

## 📊 Dynamic Displays

Data from the database/config is displayed back to the user in:

- **`EntryStatusCard.jsx`**: Shows the Pot calculation (`ENTRY_FEE * PAID_COUNT`).
- **`Countdown.jsx`**: Uses `VOTING_OPENS_AT` from config.
