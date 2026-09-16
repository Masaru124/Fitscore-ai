import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitScore AI — Real-Time Workout & Pose Quality Intelligence",
  description:
    "AI-powered browser biomechanics scoring, real-time injury risk prevention, and intelligent form feedback.",
  keywords: ["workout", "fitness AI", "pose estimation", "form correction", "biomechanics"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
