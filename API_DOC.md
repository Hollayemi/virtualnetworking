# API Documentation Summary

## Users

### Register
`POST /api/v1/users/register`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| email | string | ✅ |
| password | string (min 8) | ✅ |
| phone | string | |
| bio | string | |
| role | string | |
| company | string | |
| industry | string | |
| interests | array | |
| networkingGoals | string | |

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": { "token": "...", "user": { "_id", "name", "email", ... } }
}
```

### Login
`POST /api/v1/users/login`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| email | string | ✅ |
| password | string | ✅ |

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": { "token": "...", "user": { ... } }
}
```

### Get Profile
`GET /api/v1/users/me`

**Response (200):**
```json
{ "success": true, "message": "Profile retrieved", "data": { "user": { ... } } }
```

### Update Profile
`PATCH /api/v1/users/me`

**Request:** All fields optional. Send only what you want to change.

**Response (200):**
```json
{ "success": true, "message": "Profile updated", "data": { "user": { ... } } }
```

### Toggle VIP Protection
`PATCH /api/v1/users/me/vip-protection`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| enabled | boolean | ✅ |

**Response (200):**
```json
{ "success": true, "message": "VIP protection enabled", "data": { "user": { ... } } }
```

### Logout
`POST /api/v1/users/logout`

**Response (200):**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

## Organisers

### Register
`POST /api/v1/organisers/register`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| email | string | ✅ |
| password | string (min 8) | ✅ |
| organisationName | string | ✅ |
| organisationDescription | string | |
| website | string | |
| phone | string | |

**Response (201):**
```json
{
  "success": true,
  "message": "Organiser account created",
  "data": { "token": "...", "organiser": { ... } }
}
```

### Login
`POST /api/v1/organisers/login`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| email | string | ✅ |
| password | string | ✅ |

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": { "token": "...", "organiser": { ... } }
}
```

### Get Profile
`GET /api/v1/organisers/me`

**Response (200):**
```json
{ "success": true, "message": "Profile retrieved", "data": { "organiser": { ... } } }
```

### Update Profile
`PATCH /api/v1/organisers/me`

**Request:** All fields optional.

**Response (200):**
```json
{ "success": true, "message": "Profile updated", "data": { "organiser": { ... } } }
```

### Get My Events
`GET /api/v1/organisers/me/events`

**Response (200):**
```json
{ "success": true, "message": "Your events retrieved", "data": { "events": [...] } }
```

### Logout
`POST /api/v1/organisers/logout`

**Response (200):**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

## Events

### List Events (Public)
`GET /api/v1/events?page=1&limit=20&search=keyword`

**Response (200):**
```json
{
  "success": true,
  "message": "Events retrieved",
  "data": { "events": [...], "pagination": { "total", "page", "limit", "totalPages" } }
}
```

### Get Event (Public)
`GET /api/v1/events/{eventId}`

**Response (200):**
```json
{ "success": true, "message": "Event retrieved", "data": { "event": { ... } } }
```

### Create Event
`POST /api/v1/events`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| description | string | ✅ |
| startDate | date-time | ✅ |
| endDate | date-time | ✅ |
| location.type | physical/virtual/hybrid | ✅ |
| location.address | string | |
| location.city | string | |
| location.virtualLink | string | |
| bannerUrl | string | |
| tiers | array (min 1) | ✅ |
| customFields | array | |

**Tier object:**
| Field | Type | Required |
|-------|------|----------|
| label | string | ✅ |
| price | number | ✅ |
| description | string | |
| capacity | int (0=unlimited) | |
| color | string (#hex) | |

**CustomField object:**
| Field | Type | Required |
|-------|------|----------|
| fieldKey | string | ✅ |
| label | string | ✅ |
| type | text/textarea/select/checkbox/url/number | ✅ |
| options | array | (for select) |
| isRequired | boolean | |
| placeholder | string | |

**Response (201):**
```json
{ "success": true, "message": "Event created successfully", "data": { "event": { ... } } }
```

### Update Event
`PATCH /api/v1/events/{eventId}`

**Request:** All fields optional. Cannot change tiers/customFields after publishing.

**Response (200):**
```json
{ "success": true, "message": "Event updated", "data": { "event": { ... } } }
```

### Publish Event
`PATCH /api/v1/events/{eventId}/publish`

**Response (200):**
```json
{ "success": true, "message": "Event published successfully", "data": { "event": { ... } } }
```

---

## Registrations

### Register for Event
`POST /api/v1/events/{eventId}/register`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| tierId | string | ✅ |
| customFieldValues | object | (for required fields) |
| referredBy | string | |

**Response (201):**
```json
{
  "success": true,
  "message": "Successfully registered for event",
  "data": { "registration": { "_id", "userId", "eventId", "tierId", "status", ... } }
}
```

### Get Event Registrations (Organiser)
`GET /api/v1/events/{eventId}/registrations`

**Response (200):**
```json
{ "success": true, "message": "Registrations retrieved", "data": { "registrations": [...] } }
```

### Get My Registrations (User)
`GET /api/v1/registrations`

**Response (200):**
```json
{ "success": true, "message": "Your registrations retrieved", "data": { "registrations": [...] } }
```

### Cancel Registration
`PATCH /api/v1/registrations/{registrationId}/cancel`

**Response (200):**
```json
{ "success": true, "message": "Registration cancelled", "data": { "registration": { ... } } }
```

---

## Connections

### Browse Attendees in My Tier
`GET /api/v1/events/{eventId}/attendees`

**Response (200):**
```json
{
  "success": true,
  "message": "Attendees retrieved",
  "data": { "attendees": [{ "_id", "name", "email", "company", "connectionStatus", ... }] }
}
```

### List My Connections
`GET /api/v1/events/{eventId}/connections`

**Response (200):**
```json
{
  "success": true,
  "message": "Connections retrieved",
  "data": { "connections": [{ "_id", "requesterId", "recipientId", "status", "intentionTag", ... }] }
}
```

### Send Connection Request
`POST /api/v1/events/{eventId}/connections`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| recipientId | string | ✅ |
| intentionTag | Hiring/Investment/Partnership/Mentorship/Sales/Collaboration | ✅ |
| message | string (max 300) | |

**Response (201):**
```json
{
  "success": true,
  "message": "Connection request sent",
  "data": { "connection": { ... } }
}
```

### Respond to Request
`PATCH /api/v1/connections/{connectionId}/respond`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| action | accept/decline | ✅ |

**Response (200):**
```json
{
  "success": true,
  "message": "Connection request accepted",
  "data": { "connection": { ... } }
}
```

---

## Wallet

### Get My Wallet
`GET /api/v1/wallet/me`

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet retrieved",
  "data": { "wallet": { "balance", "totalEarned", "totalSpent", ... } }
}
```

### Get Transaction History
`GET /api/v1/wallet/me/transactions?page=1&limit=20`

**Response (200):**
```json
{
  "success": true,
  "message": "Transaction history retrieved",
  "data": { "transactions": [...], "pagination": { ... } }
}
```

### Initiate Purchase
`POST /api/v1/wallet/purchase/initiate`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| packageId | string | ✅ |

**Response (200):**
```json
{
  "success": true,
  "message": "Payment initialized",
  "data": { "package": { "id", "name", "credits", "price", "currency" }, "paymentUrl": "..." }
}
```

### Payment Callback (Webhook)
`POST /api/v1/wallet/purchase/callback`

**Response (200):**
```json
{ "success": true, "message": "Webhook processed" }
```

---

## Credit Packages (Admin)

### List Active Packages (Public)
`GET /api/v1/credit-packages`

**Response (200):**
```json
{
  "success": true,
  "message": "Credit packages retrieved",
  "data": { "packages": [{ "_id", "name", "credits", "price", ... }] }
}
```

### List All Packages (Admin)
`GET /api/v1/credit-packages/all`

**Response (200):**
```json
{
  "success": true,
  "message": "All credit packages retrieved",
  "data": { "packages": [...] }
}
```

### Create Package (Admin)
`POST /api/v1/credit-packages`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| credits | int (min 1) | ✅ |
| price | number | ✅ |
| description | string | |
| currency | string | |
| isPopular | boolean | |
| sortOrder | int | |

**Response (201):**
```json
{
  "success": true,
  "message": "Credit package created",
  "data": { "package": { ... } }
}
```

### Update Package (Admin)
`PATCH /api/v1/credit-packages/{id}`

**Request:** All fields optional.

**Response (200):**
```json
{
  "success": true,
  "message": "Credit package updated",
  "data": { "package": { ... } }
}
```

### Deactivate Package (Admin)
`DELETE /api/v1/credit-packages/{id}`

**Response (200):**
```json
{
  "success": true,
  "message": "Credit package deactivated",
  "data": { "package": { ... } }
}
```

---

## Credit Config (Admin)

### Get Config
`GET /api/v1/credit-config`

**Response (200):**
```json
{
  "success": true,
  "message": "Credit config retrieved",
  "data": { "config": { "cashbackRatio", "registrationRewardAmount", "referralRewardAmount", "vipRequestCost", ... } }
}
```

### Update Config
`PUT /api/v1/credit-config`

**Request:**
| Field | Type | Required |
|-------|------|----------|
| cashbackRatio | float (0-1) | ✅ |
| registrationRewardAmount | int (min 0) | ✅ |
| referralRewardAmount | int (min 0) | ✅ |
| vipRequestCost | int (min 1) | ✅ |

**Response (200):**
```json
{
  "success": true,
  "message": "Credit config updated",
  "data": { "config": { ... } }
}
```

---

## Error Responses

**Generic Error (4xx):**
```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

**Validation Error (422):**
```json
{
  "success": false,
  "type": "validation_error",
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email address" }],
  "timestamp": "..."
}
```

---

## Authentication

| Auth Type | Header | Used For |
|-----------|--------|----------|
| Bearer Token | `Authorization: Bearer <token>` | User & Organiser endpoints |
| Admin Key | `x-admin-key: <key>` | Credit packages & config endpoints |