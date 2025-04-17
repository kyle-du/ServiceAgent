## ServiceAgent Complaint Management System Task

### 1. Setup
- Clone this repository. Run `npm install` at project root. 
- Create a `.env` file in `./server/` and enter `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Run `npm run dev` to start backend + frontend

### 2. Assumptions & Tradeoffs
- Assumes admin dashboard and submit page on same server + domain
- Assumes admin dashboard doesn't need authentication to view (demo purposes)

### 3. Potential Improvements
- Including more filters and sorting for complaints
- Organizing complaints by categories or keyword search
- UI fix with table header margins
- Connect backend with n8n/Zapier to send email/message when complaints are created/resolved
- Admin dashboard locked behind authentication page
- Support file uploads for complaints (images, videos, etc.)