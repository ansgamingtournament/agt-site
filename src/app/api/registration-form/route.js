import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { teamName, excel, logo } = await request.json();

        await resend.emails.send({
            from: `Zgłoszenie – ${teamName} <onboarding@resend.dev>`,
            to: ["ansgamingtournament@gmail.com"],
            subject: `Nowe zgłoszenie drużyny "${teamName}"`,
            html: "<p>Formularz rejestracyjny w załącznikach</p>",
            attachments: [
                {
                    filename: "rejestracja_druzyny.xlsx",
                    content: excel,
                },
                {
                    filename: logo.filename,
                    content: logo.content,
                    contentType: logo.type,
                },
            ],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "Email failed" },
            { status: 500 }
        );
    }
}
