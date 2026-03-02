# Koidulaulik

Koidulaulik is a game-style culture web app that helps users discover cultural events and news happening across Estonia. Users can explore an interactive activities board, stay updated with the latest news, and manage their own inventory of items collected in the app.

The project was built by two independent developers and is open for anyone to use and improve.

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* Tailwind CSS

**Backend:**

* Node.js
* Express.js
* Sequelize ORM

**Database:**

* MySQL (hosted on Aiven)

**Authentication & Security:**

* JWT (JSON Web Tokens)
* Bcrypt password hashing
* Middleware to verify logged-in users

**Other Libraries & Tools:**

* Tesseract.js – for detecting text in images of activities
* Web scraping of event and news sources

**Deployment:**

* Frontend: Netlify
* Backend: Render
* Database: Aiven

---

## 🎮 Features

1. **Activities Board**

   * Users can browse cultural events happening across Estonia.
   * Text in images is detected using Tesseract.js and displayed on the board to make it more realistic.

2. **News Section**

   * Aggregates cultural news from sources like [ERR](https://www.err.ee/) and [Rahvakultuur](https://rahvakultuur.ee/mis-toimub/).

3. **User Authentication**

   * Sign up and log in with secure password hashing using bcrypt.
   * JWT-based authentication with middleware checking if the user is logged in.

4. **User Inventory**

   * Users can collect newspapers and other items (more items will be added later).

5. **Open for Improvement**

   * Built to be extensible. Others can fork, use, and improve it freely.

---

## 🔗 Data Sources

* [ERR – News](https://www.err.ee/)
* [Rahvakultuur – Mis Toimub](https://rahvakultuur.ee/mis-toimub/)
* [Kultuuriaken Tartu](https://kultuuriaken.tartu.ee)
* [Culture.ee Blog](https://culture.ee/en/blog/) *(inactive, not in use)*

---

## ⚡ Installation

> **Important:** You must have a MySQL database created and ready before running the app. The app will not work without it.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

> Make sure you have a `.env` file in the backend with:
>
> * Database credentials (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
> * JWT secret (`secret`)
> * Any other API keys needed

---

## 🌐 Deployment

* **Frontend:** [Netlify](https://www.netlify.com/)
* **Backend:** [Render](https://render.com/)
* **Database:** [Aiven](https://aiven.io/)

---

## 🧩 Database

* Managed using Sequelize ORM for easier handling of MySQL database interactions.
* Stores users, activities, inventory items, and news articles.
* **Note:** The database must exist and be properly configured in the `.env` file for the app to work.

---

## 🔒 Security

* Passwords are hashed with **bcrypt**.
* JWT is used for authentication and authorization.
* Middleware ensures routes are protected and only accessible to logged-in users.

---

## 🤖 How Tesseract is Used

* Scans activity images for text.
* If text is found, it’s displayed on the activities board to make the board more realistic.

---

## 💡 Contributing

* This project is open-source and free to use.
* Developers are welcome to fork, improve, and extend the app.
* No license is currently set, but a license can be added later via GitHub.

---

## 📌 Notes

* The app combines a cultural events finder, news aggregator, and gamified user experience.
* Designed to be easily extensible for new features like inventory items or activity enhancements.
* **Database creation is mandatory**; the app cannot run without a valid MySQL database connection.
