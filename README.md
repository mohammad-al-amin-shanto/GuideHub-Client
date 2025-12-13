# GuideHub (Frontend)
GuideHub Frontend is the client-side application for the GuideHub platform — a modern marketplace where travelers can discover, book, and interact with professional guides across the world.
This frontend is built with Next.js, emphasizes clean UI/UX, and integrates tightly with the backend services of the platform.

---

## ✨ Features

- Modern Next.js App Router structure
- Responsive UI optimized for both desktop and mobile
- Authentication System using AuthContext + JWT
- Dynamic Guide Listings with search & filter
- Booking System with live API interactions
- Role-based Views (User / Guide / Admin)
- Reusable UI components following a consistent design system
- API integration layer with centralized request handling
- Toast notifications & error handling baked in

---

## 📁 Project Structure
```
src/
 ┣ components/        # Reusable UI components
 ┣ context/           # AuthProvider, global state
 ┣ app/               # Next.js App Router pages
 ┃ ┣ (auth)/          # Login/Register layouts
 ┃ ┣ dashboard/       # User & guide dashboards
 ┣ hooks/             # Custom React hooks
 ┣ lib/               # API helper, utilities
 ┣ styles/            # Global styles
 ┗ types/             # TypeScript definitions
```

---

## 🚀 Getting Started
### 1. Clone the repository
```
git clone https://github.com/your-repo/guidehub-frontend.git
cd guidehub-frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Create environment variables
Create a .env.local file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=GuideHub
```
(Adjust according to deployment environment.)

--- 

### 🏃 Running the Project

Development
```
npm run dev
```
App will be live at:
```
http://localhost:3000
```
Production Build
```
npm run build
npm start
```
---

### 🔗 API Integration
All API requests use the helper in:
```
src/lib/api.ts
```
- Centralized Axios instance
- Automatic JWT handling
- Typed responses
- Unified error formatting

### 🧰 Technology Stack
| Category | Tools |
|----------|--------|
| Framework |	Next.js (App Router) |
| Language | TypeScript |
| UI | TailwindCSS, Custom Components |
| State |	React Context, Custom Hooks |
| Auth | JWT-based |
| API |	Axios |
| Deployment | Vercel / Any Node-Compatible Hosting |

### 🧪 Quality & Best Practices

- ES Lint + Prettier formatting
- Modular folder structure
- Strong TypeScript usage
- Reusable, accessible UI
- Clear separation of concerns

### 📦 Deployment

The project is optimized for deployment on Vercel, but also works with:
- Netlify
- Docker containers
- Custom Node servers
Adjust environment variables as needed.

### 🤝 Contributing
Contributions are welcome!
Please open an issue or submit a pull request following the standard workflow:

- Fork the repo
- Create a feature branch
- Commit your changes
- Open a PR

### 📄 License
This project is licensed under the MIT License.

### 🏁 Author
Mohammad Al Amin
