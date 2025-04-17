## ServiceAgent Complaint Management System Task

### 1. Setup
- Clone this repository. Run `npm install` at project root. 
- Create a `.env` file in `./server/` and enter `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Modify `target` in `./client/vite.config.ts` to reflect the domain and port where the server will run (default `localhost:3000` for demo purposes).
- Run `npm run dev` in project root to start backend + frontend

### 2. Assumptions & Tradeoffs
- Assumes admin dashboard and submit page on same server + domain
- Assumes admin dashboard doesn't need authentication to view (demo purposes)
- Tradeoffs of client-server structure: by using Vite for frontend and Express/Node for backend, two servers run concurrently and communicate with each other through HTTP requests. This is less straightforward than a full-stack framework like Next.js but can be remedied using tools like vite-express or by having the express server serve static Vite content.

### 3. Potential Improvements
- Including more filters and sorting for complaints
- Organizing complaints by categories or keyword search
- UI fix with table header margins
- Connect backend with n8n/Zapier to send email/message when complaints are created/resolved
- Admin dashboard locked behind authentication page
- Support file uploads for complaints (images, videos, etc.)