# 🍽️ Photo Viewer API (Ruby on Rails)

This is the **backend API** for the Photo Viewer mobile app. It provides a list of static food-related photo data including category, title, photographer, and image URL.

Built with **Ruby on Rails** and designed to be simple, fast, and mobile-friendly.

---

## 📦 Tech Stack

- **Ruby** 3.x+
- **Rails** 8.x+
- **SQLite** (default) or optional PostgreSQL
- **CORS-enabled JSON API**
- **Image data seeded using** `db/seeds.rb`

---

## 🧪 Setup Instructions

### 1. Install Ruby and Rails

Install using [rbenv](https://github.com/rbenv/rbenv) or your preferred version manager.

```bash
brew install rbenv
rbenv install 3.3.0
rbenv global 3.3.0
gem install rails
```
💡 Check your version:

```bash
ruby -v
rails -v
```

### 2. Install Dependencies

```bash
cd backend
bundle install
```

### 3. Setup Database

```bash
bin/rails db:setup
```
This will:

- Create the database
- Run migrations
- Seed with food photo data (with categories and photographer)

If you need to reset later:
```bash
bin/rails db:reset
```
### 4. Run the Server

Start the Rails server:

```bash
bin/rails server -b 0.0.0.0
```

How to Get Your IP Address (for Expo access)
```bash
ipconfig getifaddr en0        # macOS
```

Your API will now be accessible at:
```bash
http://<YOUR-IP>:3000/api/v1/photos
```

Use that URL in your **React Native app** (in usePhotos.ts):
```bash
axios.get('http://<YOUR-IP>:3000/api/v1/photos');
```

And run the React Native project.
