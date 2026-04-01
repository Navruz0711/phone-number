import { redirect } from 'next/navigation'

// All CTA buttons on the site link to /go
// This route redirects to the external service placeholder
export async function GET() {
  redirect('https://t.me/virtualsms_bot')
}
