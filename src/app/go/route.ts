import { NextResponse } from 'next/server'

// All CTA buttons on the site link to /go
// This route performs a permanent redirect to the external service
export async function GET() {
  return NextResponse.redirect('https://365sms.vip/?ref=1', { status: 301 })
}
