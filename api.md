# TechEz API Reference

## 1. Overview

- API Version: v1
- Base URL: /api/v1
- Source of Truth: server/src/routes
- Transport: JSON over HTTP
- Upload Transport: multipart/form-data
- Global Rate Limit: 100 requests per 15 minutes per IP

## 2. Authentication and Authorization

- verifyJWT
  - Validates JWT and attaches authenticated user context.
  - Token sources:
    - Cookie: accessToken
    - Header: Authorization: Bearer <token>
- verifyUser
  - Requires authenticated user with isVerified = true.
- verifyTechnician
  - Requires authenticated user with role = technician.

## 3. Response Contracts

### 3.1 Success Envelope

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Operation completed",
  "success": true
}
```

### 3.2 Error Envelope

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### 3.3 Validation Error (Zod)

```json
{
  "success": false,
  "errors": "Validation failed",
  "message": "<first validation error>"
}
```

## 4. Endpoint Catalog

### 4.1 Auth APIs

| Path                      | Method | Controller         | Middleware Chain                                    | Auth Required | Access        |
| ------------------------- | ------ | ------------------ | --------------------------------------------------- | ------------- | ------------- |
| /auth/register-user       | POST   | registerUser       | None                                                | No            | Public        |
| /auth/register-technician | POST   | registerTechnician | upload.fields(profilePicture, verificationDocument) | No            | Public        |
| /auth/login               | POST   | login              | None                                                | No            | Public        |
| /auth/logout              | POST   | logout             | verifyJWT                                           | Yes           | Authenticated |
| /auth/send-otp            | POST   | sendOtp            | None                                                | No            | Public        |
| /auth/forgot-password     | PATCH  | forgotPassword     | None                                                | No            | Public        |
| /auth/change-password     | PATCH  | changePassword     | verifyJWT                                           | Yes           | Authenticated |
| /auth/deactivate-account  | PATCH  | deactivateAccount  | verifyJWT                                           | Yes           | Authenticated |

### 4.2 User APIs

Route-level middleware: verifyJWT

| Path                         | Method | Controller           | Middleware Chain                         | Auth Required | Access        |
| ---------------------------- | ------ | -------------------- | ---------------------------------------- | ------------- | ------------- |
| /user/update-profile         | PATCH  | updateUserProfile    | verifyJWT                                | Yes           | Authenticated |
| /user/upload-profile-picture | PATCH  | uploadProfilePicture | verifyJWT, upload.single(profilePicture) | Yes           | Authenticated |
| /user/profile                | GET    | getUserProfile       | verifyJWT                                | Yes           | Authenticated |
| /user/delete-profile-picture | DELETE | deleteProfilePicture | verifyJWT                                | Yes           | Authenticated |

### 4.3 Technician APIs

| Path                                     | Method | Controller                 | Middleware Chain                                                 | Auth Required | Access     |
| ---------------------------------------- | ------ | -------------------------- | ---------------------------------------------------------------- | ------------- | ---------- |
| /technician/get-all-technicians          | GET    | getAllTechnicians          | None                                                             | No            | Public     |
| /technician/:technicianId                | GET    | getTechnicianById          | None                                                             | No            | Public     |
| /technician/update-profile               | PATCH  | updateTechnicianDetails    | verifyJWT, verifyTechnician                                      | Yes           | Technician |
| /technician/delete-verification-document | PATCH  | deleteVerificationDocument | verifyJWT, verifyTechnician                                      | Yes           | Technician |
| /technician/upload-verification-document | PATCH  | uploadVerificationDocument | verifyJWT, verifyTechnician, upload.single(verificationDocument) | Yes           | Technician |

### 4.4 Booking APIs

Route-level middleware: verifyJWT

| Path                                          | Method | Controller                 | Middleware Chain                        | Auth Required | Access        |
| --------------------------------------------- | ------ | -------------------------- | --------------------------------------- | ------------- | ------------- |
| /booking/create-booking                       | POST   | createManualBookingRequest | verifyJWT, verifyUser                   | Yes           | Verified User |
| /booking/raise-booking-price                  | PATCH  | raiseManualBookingPrice    | verifyJWT, verifyUser, verifyTechnician | Yes           | Technician    |
| /booking/cancel-technician-booking/:bookingId | PATCH  | cancelTechnicianBooking    | verifyJWT, verifyUser, verifyTechnician | Yes           | Technician    |
| /booking/accept-booking/:bookingId            | PATCH  | acceptManualBooking        | verifyJWT, verifyUser, verifyTechnician | Yes           | Technician    |
| /booking/complete-booking/:bookingId          | PATCH  | completeManualBooking      | verifyJWT, verifyUser, verifyTechnician | Yes           | Technician    |
| /booking/user-agreement/:bookingId            | PATCH  | userAgreement              | verifyJWT, verifyUser                   | Yes           | Verified User |
| /booking/cancel-user-booking/:bookingId       | PATCH  | userCancelBooking          | verifyJWT, verifyUser                   | Yes           | Verified User |
| /booking/user-bookings                        | GET    | getUserBookings            | verifyJWT, verifyUser                   | Yes           | Verified User |
| /booking/technician-bookings                  | GET    | getTechnicianBookings      | verifyJWT, verifyUser, verifyTechnician | Yes           | Technician    |

### 4.5 Bid APIs

Route-level middleware: verifyJWT, verifyUser

| Path            | Method | Controller       | Middleware Chain      | Auth Required | Access        |
| --------------- | ------ | ---------------- | --------------------- | ------------- | ------------- |
| /bid/create-bid | POST   | createBidRequest | verifyJWT, verifyUser | Yes           | Verified User |

### 4.6 Review APIs

Route-level middleware: verifyJWT

| Path                                    | Method | Controller           | Middleware Chain            | Auth Required | Access        |
| --------------------------------------- | ------ | -------------------- | --------------------------- | ------------- | ------------- |
| /review/review-technician/:technicianId | POST   | reviewTechnician     | verifyJWT, verifyUser       | Yes           | Verified User |
| /review/update-review/:reviewId         | PATCH  | updateReview         | verifyJWT, verifyUser       | Yes           | Verified User |
| /review/delete-review/:reviewId         | DELETE | deleteReview         | verifyJWT, verifyUser       | Yes           | Verified User |
| /review/technician-reviews              | GET    | getTechnicianReviews | verifyJWT, verifyTechnician | Yes           | Technician    |
| /review/user-reviews                    | GET    | getUserReviews       | verifyJWT, verifyUser       | Yes           | Verified User |

### 4.7 Report APIs

Route-level middleware: verifyJWT

| Path                                    | Method | Controller           | Middleware Chain            | Auth Required | Access        |
| --------------------------------------- | ------ | -------------------- | --------------------------- | ------------- | ------------- |
| /report/report-technician/:technicianId | POST   | reportTechnician     | verifyJWT, verifyUser       | Yes           | Verified User |
| /report/delete-report/:reportId         | DELETE | deleteReport         | verifyJWT, verifyUser       | Yes           | Verified User |
| /report/user-reports                    | GET    | getUserReports       | verifyJWT, verifyUser       | Yes           | Verified User |
| /report/technician-reports              | GET    | getTechnicianReports | verifyJWT, verifyTechnician | Yes           | Technician    |

## 5. Upload Endpoints

- /auth/register-technician
  - Content-Type: multipart/form-data
  - Files:
    - profilePicture (required)
    - verificationDocument (optional)
- /user/upload-profile-picture
  - Content-Type: multipart/form-data
  - Files:
    - profilePicture (required)
- /technician/upload-verification-document
  - Content-Type: multipart/form-data
  - Files:
    - verificationDocument (required)

## 6. Query Filter Endpoints

- /technician/get-all-technicians
  - name, category, experience, address, verificationType, page, limit
- /booking/user-bookings
  - status, bookingMethod, limit, page, sortBy
- /booking/technician-bookings
  - status, bookingMethod, limit, page, sortBy
