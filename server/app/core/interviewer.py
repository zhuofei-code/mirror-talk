import anthropic

from app.core.config import settings
from app.prompts.interviewer import SYSTEM_PROMPT
from app.prompts.portrait import PORTRAIT_PROMPT


class Interviewer:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.sessions: dict[str, list[dict]] = {}

    def _get_or_create_session(self, session_id: str) -> list[dict]:
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        return self.sessions[session_id]

    async def chat(self, session_id: str, user_message: str) -> str:
        messages = self._get_or_create_session(session_id)
        messages.append({"role": "user", "content": user_message})

        response = self.client.messages.create(
            model=settings.model,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=messages,
        )

        assistant_message = response.content[0].text
        messages.append({"role": "assistant", "content": assistant_message})
        return assistant_message

    async def generate_portrait(self, session_id: str) -> str:
        messages = self._get_or_create_session(session_id)
        if not messages:
            return "对话记录为空，无法生成画像。"

        conversation_text = "\n".join(
            f"{'受访者' if m['role'] == 'user' else '访谈者'}: {m['content']}"
            for m in messages
        )

        response = self.client.messages.create(
            model=settings.model,
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": PORTRAIT_PROMPT.format(conversation=conversation_text),
                }
            ],
        )

        return response.content[0].text

    def get_turn_count(self, session_id: str) -> int:
        messages = self._get_or_create_session(session_id)
        return sum(1 for m in messages if m["role"] == "user")


interviewer = Interviewer()
