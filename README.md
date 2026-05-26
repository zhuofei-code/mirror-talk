# Mirror Talk

> A mirror that asks back. — 一面会追问的镜子

## What is this?

Mirror Talk is an AI-powered conversational interviewer that helps people discover and articulate who they are — not through fixed questionnaires or predefined personality types, but through **adaptive, personalized dialogue**.

Unlike MBTI, Big Five, or any traditional personality assessment:

- **No fixed questions.** Every conversation is unique, shaped by what you say.
- **No predefined types.** You won't be sorted into a box. The output is a narrative portrait that belongs only to you.
- **Deep follow-up.** The AI interviewer knows when to dig deeper — when it senses hesitation, contradiction, or emotional signals worth exploring.

## Why?

Many people have never been asked the right questions. They aren't unable to express themselves — they've simply never had someone (or something) draw it out of them through genuine, adaptive inquiry.

Mirror Talk is not a test. It's a process of **self-encounter**.

## How it works

The AI interviewer is equipped with knowledge across psychology — attachment theory, defense mechanisms, cognitive styles, motivation theory, emotional regulation, and more. But it doesn't use any single framework to categorize you. Instead, these serve as its **internal intuition**: the ability to recognize what's happening beneath the surface and ask the question that matters next.

At the end of a session, you receive a **personalized narrative portrait** — not a label, not a score, but a rich, human-readable reflection of who you are.

## Project Structure

```
mirror-talk/
├── server/                # Python backend
│   └── app/
│       ├── main.py        # FastAPI entry point
│       ├── api/chat.py    # API routes
│       ├── core/
│       │   ├── config.py  # Settings
│       │   └── interviewer.py  # Core interview logic
│       └── prompts/
│           ├── interviewer.py  # Interviewer system prompt
│           └── portrait.py     # Portrait generation prompt
├── miniprogram/           # WeChat Mini Program frontend
│   ├── pages/
│   │   ├── index/         # Landing page
│   │   ├── chat/          # Chat interface
│   │   └── portrait/      # Portrait display
│   └── utils/api.js       # API client
└── README.md
```

## Tech Stack

- **Backend**: Python, FastAPI, Claude API (Anthropic)
- **Frontend**: WeChat Mini Program
- **Architecture**: Mini Program (chat UI) → FastAPI (interview logic) → Claude (AI interviewer)

## Status

Early stage — first prototype scaffolded.

## License

MIT
