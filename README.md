# 📚 Scrapbook Concierge Request App (Client)
The Scrapbook Concierge Request App is a web application that enables customers of Scrapbook Concierge to participate in the creation process of upcoming scrapbooking kits. Built with Vue.js, TailwindCSS, and Parcel, this application provides an engaging way for users to submit kit ideas, vote for their favorites, and view kits that have been officially released.


## ✨ Features
- Submit Requests: Users can suggest new scrapbook kits they would like to see.
- Vote for Kits: On the "Requests" page, users can like/upvote submitted kit ideas to show interest.
- Sort Requests: View requests sorted by most recent or most liked.
- View Released Kits: Browse kits that have already been launched and click "Buy Now" to purchase directly from the main Scrapbook Concierge website.
- Admin Tools:
    - Update request statuses.
    - Mark kits as released and assign product URLs.
    - Email users who liked the newly released kits.


##🖼️ Screenshots
### Requests View
![Requests view.](/src/assets/images/all-requests.png "Requests view.")

### User Requests View
![User Requests view..](/src/assets/images/User-requests.png "Released Requests view.")

### Released Requests View
![Released Requests view..](/src/assets/images/released-requests.png "Released Requests view.")


## 🛠️ Tech Stack
* **Framework**: Vue.js
* **Styling**: TailwindCSS
* **Bundler**: Parcel
* **Routing**: Vue Router
* **Icons**: Heroicons
* **Other Tools**:
    * uuid for unique IDs
    * dotenv for environment variable support
    * Google Analytics via vue-gtag


## 🚀 Getting Started
### Prerequisites
* Node.js (v16 or higher recommended)
* Yarn or npm

### Installation

**Clone the repository**
```
git clone https://github.com/your-username/scrapbook-concierge-request-app-client.git
cd scrapbook-concierge-request-app-client
```

**Install dependencies**
```
npm install
# or
yarn install
```

**Development**
```
npm start
# or
yarn start
```
This will run the app on `http://localhost:1234`.

**Build**
```
npm run build
# or
yarn build
```


## ⚙️ Environment Variables
Create a .env file in the project root and define any required variables. Example:

SERVER_URL=https://your-api-domain.com/api


## 📂 Project Structure

    src/    
    ├── assets/
    |   └──  images/
    ├── components/
    |    └──  images/
    ├── store/
    ├── utils/
    ├── views/
    ├── app.vue
    ├── index.css
    ├── index.html
    └── index.js

