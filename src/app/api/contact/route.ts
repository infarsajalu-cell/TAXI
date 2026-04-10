import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const { name, phone, vehicle, passengers, package: pkg, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Starego <onboarding@resend.dev>',
      to: ['sajalurahman321@gmail.com'],
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Travel Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Vehicle:</strong> ${vehicle || 'No Preference'}</p>
        <p><strong>No. of Passengers:</strong> ${passengers || 'Not specified'}</p>
        <p><strong>Interested Package:</strong> ${pkg}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message || 'Email delivery failed' }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
