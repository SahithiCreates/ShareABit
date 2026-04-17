# 🍱 FoodMatch – Food Donation & Distribution Platform

FoodMatch is a full-stack platform designed to **connect food donors with NGOs and volunteers**, enabling efficient redistribution of surplus food to those in need.

---

## 📌 Overview

FoodMatch helps reduce food waste and improve accessibility by providing:

* A platform for donors to list surplus food
* **NGOs/volunteers** to discover and claim donations
* Real-time coordination between donors and receivers
* Transparent tracking of donation status

---

## 🏗 System Architecture

```id="0x9f8d"
Frontend (React)
   │
   ├── Auth Module (User Roles: Donor / NGO / Volunteer)
   ├── Donation Module (Create, Browse, Claim Food)
   ├── Request Module (Manage incoming/outgoing requests)
   ├── Status Tracking (Pending → Accepted → Completed)
   └── Dashboard (User activity and history)
```

---

## ✨ Core Features

### 🔐 Authentication & Roles

* Secure login/signup
* Role-based access (**Donor / NGO / Volunteer**)

---

### 🍲 Food Donation System

* Donors can post available food with details
* Include quantity, location, and expiry info
* Easy listing and management

---

### 🤝 Claim & Distribution

* NGOs/volunteers can browse available donations
* Claim food based on availability and location
* Prevents duplicate claims

---

### 📍 Status Tracking

* Track donation lifecycle:
  **Pending → Accepted → Completed**
* Ensures transparency in distribution

---

### 📊 Dashboards

* Donors can track their contributions
* NGOs can manage claims and requests
* View history of completed donations

---

## ⚙️ Tech Stack

**Frontend:** React.js, Tailwind CSS
**Backend:** Node.js (Express.js)
**Database:** MongoDB
**Authentication:** JWT

---

## 📸 Preview

(Add screenshots: donation listing, dashboard, claim flow)

---

## 🎯 Future Improvements

* Real-time notifications
* Location-based matching (maps integration)
* Expiry-based prioritization
* Rating system for NGOs and donors

---

## 🧠 Key Highlights

* **Real-world social impact project**
* Clean role-based workflow design
* Efficient food redistribution system
* Focus on simplicity and usability

---

