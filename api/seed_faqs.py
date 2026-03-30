#!/usr/bin/env python3
"""
FAQ Seeder Script
Inserts initial FAQ data into the database
"""

import sys
import os
from datetime import datetime, timezone

# Add the src directory to the path so we can import our modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.db.db_config import get_database

def seed_faqs():
    """Seed initial FAQ data into the database"""

    # FAQ data to insert
    faq_data = [
        {
            "question": "How does the pet adoption process work?",
            "answer": "Browse available pets, select the one you like, and submit an adoption request. The owner or admin will review your request and update the status."
        },
        {
            "question": "How long does it take for my adoption request to be approved?",
            "answer": "Approval time depends on the pet owner or admin. It usually takes between 1 to 3 days, but may vary based on verification and availability."
        },
        {
            "question": "Can I cancel my adoption request?",
            "answer": "Yes, you can cancel your request before it is approved. Once approved, you may need to contact the owner directly."
        },
        {
            "question": "What information do I need to provide when applying?",
            "answer": "You may need to provide basic details like your contact information, living conditions, and a short message explaining why you want to adopt the pet."
        },
        {
            "question": "Is there any adoption fee?",
            "answer": "Adoption fees depend on the pet owner or platform policy. Some pets may be free to adopt, while others may include a small fee."
        },
        {
            "question": "Can I adopt more than one pet?",
            "answer": "Yes, you can apply for multiple pets, but each request will be reviewed separately."
        },
        {
            "question": "How do I track my adoption request?",
            "answer": "Go to the 'My Requests' page to view the status of all your adoption requests in real-time."
        },
        {
            "question": "What do the request statuses mean?",
            "answer": "Pending means your request is under review, Approved means your request has been accepted, and Rejected means it was not accepted."
        },
        {
            "question": "Can I contact the pet owner directly?",
            "answer": "Yes, once your request is approved, you may be provided with contact details to coordinate the adoption."
        },
        {
            "question": "What should I consider before adopting a pet?",
            "answer": "Consider your lifestyle, time availability, financial responsibility, and the pet's needs before making a decision."
        }
    ]

    try:
        # Get database connection
        db = get_database()
        faqs_collection = db.faqs

        # Check how many FAQs already exist
        existing_count = faqs_collection.count_documents({})
        print(f"Found {existing_count} existing FAQs in database")

        if existing_count > 0:
            print("FAQs already exist in database. Skipping seed operation.")
            return

        # Insert FAQ data
        inserted_count = 0
        for faq in faq_data:
            # Check if this specific FAQ already exists (by question)
            existing = faqs_collection.find_one({"question": faq["question"]})
            if not existing:
                faq_doc = {
                    **faq,
                    "created_at": datetime.now(timezone.utc)
                }
                result = faqs_collection.insert_one(faq_doc)
                inserted_count += 1
                print(f"✓ Inserted FAQ: {faq['question'][:50]}...")
            else:
                print(f"⚠ Skipped duplicate FAQ: {faq['question'][:50]}...")

        print(f"\n✅ Successfully inserted {inserted_count} FAQs into database")

    except Exception as e:
        print(f"❌ Error seeding FAQs: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    print("🌱 Starting FAQ seeding process...")
    seed_faqs()
    print("🎉 FAQ seeding completed!")