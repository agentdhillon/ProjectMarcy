"""
AI companion powered by Claude.

Responsibilities:
  1. Empathetic listener — responds to venting posts/messages with warmth.
  2. Content curator — suggests music genres or meme categories based on mood.
  3. Crisis detection — flags messages that may need professional support.
"""

import os
import anthropic

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

LISTENER_SYSTEM_PROMPT = """
You are an empathetic AI companion for salespeople who are stressed, frustrated, or burned out.

Your role:
- Listen actively and validate feelings without judgment
- Ask a thoughtful follow-up question to help them feel heard
- Offer a brief, practical de-stress tip only when it feels natural
- Keep responses warm, concise (2-4 sentences), and human
- If someone expresses thoughts of self-harm or severe distress, gently recommend
  professional support (e.g. a therapist or a helpline) and do NOT continue the conversation normally

Never give financial, medical, or legal advice.
Never identify yourself as Claude or mention Anthropic.
""".strip()

CURATOR_SYSTEM_PROMPT = """
You are a mood-aware content curator for a salesperson community app.

Given a short description of someone's current mood or situation, respond with JSON only:
{
  "music_genres": ["<genre1>", "<genre2>"],
  "meme_tags": ["<tag1>", "<tag2>", "<tag3>"],
  "suggested_activity": "<one short activity suggestion>"
}

Keep suggestions uplifting but realistic for someone who is stressed or tired.
""".strip()


def get_listener_response(
    user_message: str,
    conversation_history: list[dict] | None = None,
) -> str:
    """Return an empathetic AI response to the user's message."""
    messages = list(conversation_history or [])
    messages.append({"role": "user", "content": user_message})

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=LISTENER_SYSTEM_PROMPT,
        messages=messages,
    )
    return response.content[0].text


def get_content_curation(mood_description: str) -> dict:
    """Return music genres, meme tags, and an activity suggestion based on mood."""
    import json

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        system=CURATOR_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": mood_description}],
    )

    raw = response.content[0].text.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"music_genres": [], "meme_tags": [], "suggested_activity": ""}
