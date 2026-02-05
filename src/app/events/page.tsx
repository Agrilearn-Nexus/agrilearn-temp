"use client"

import Footer from "@/components/footer";
import EventsHero from "@/components/events/EventsHero";
import EventsList from "@/components/events/EventsList";
import MarqueeNotification from "@/components/MarqueeNotification";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col pt-1">
      <MarqueeNotification />

      <main className="flex-grow">
        <EventsHero />
        <EventsList />
      </main>
      
    </div>
  );
}