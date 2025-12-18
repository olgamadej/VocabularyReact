import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays } from "date-fns";

const timeSlots = [
    "08:00", "08:20", "08:40", "09:00", "09:20", "09:40", "10:00", "10:20", "10:40",
    "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40",
    "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00", "16:20", "16:40",
    "17:00", "17:20", "17:40", "18:00", "19:20", "19:40", "20:00", "20:20", "20:40",
    "21:00", "21:20", "21:40"
]

const lessonTypes = [
    {id: "quick_conversation", name: "One Mug Conversation", duration: "20 min", price: 10, description: "Perfect for a quick boost and ideal for a busy schedule. This 20-minute phone call is just enough time to warm up your language skills, practice a specific topic, or get a daily dose of conversation. Think of it as the time it takes to enjoy one mug of your favorite drink."},
    {id: "lunch_conversation", name: "Quick Lunch Conversation", duration: "40 min", price: 18, description: "Sustained practice for steady progress. Step beyond the warm-up. This 40-minute session allows for a more substantial exchange—perfect for navigating a real-life scenario, delving into a theme, or getting constructive feedback. A fulfilling practice session that fits into a lunch break."},
    {id: "bench_conversation", name: "The Park Bench Chat", duration: "60 min", price: 25, description: "Immerse and transform your fluency. Our flagship session for maximum progress. A full hour of dedicated conversation allows for deep immersion, detailed correction, nuanced discussion, and truly building confidence. Walk away feeling like you've had a meaningful, fluency-boosting language experience."}
]

const paymentMethods = [
    {id: "stripe", name: "Card (Stripe)"},
    {id: "paypal", name: "PayPal"},
    {id: "revolut", name: "Revolut Pay"}
];

const BookingSection = () => {
    const [currentMonth, setCurrentMonth]
}