from __future__ import annotations

from collections import Counter
import re

from app.config import settings

try:
    from openai import OpenAI
except ImportError:  # pragma: no cover
    OpenAI = None


class AIEngine:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key and OpenAI else None

    def summarize(self, text: str) -> str:
        if self.client:
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Summarize the document into concise bullets."},
                    {"role": "user", "content": text[:12000]},
                ],
                temperature=0.2,
            )
            return completion.choices[0].message.content or "No summary generated."
        return self._extractive_summary(text)

    def chat_with_pdf(self, prompt: str, pdf_text: str) -> str:
        if self.client:
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Answer questions based only on the provided PDF text."},
                    {"role": "user", "content": f"PDF text:\n{pdf_text[:12000]}\n\nQuestion:\n{prompt}"},
                ],
                temperature=0.1,
            )
            return completion.choices[0].message.content or "No answer generated."
        return f"Local mode answer (best effort): I found this relevant context -> {self._extractive_summary(pdf_text)}"

    def rewrite(self, text: str, mode: str = "simplify") -> str:
        if self.client:
            instruction = "Simplify and clarify" if mode == "simplify" else "Rewrite professionally"
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": instruction},
                    {"role": "user", "content": text[:8000]},
                ],
                temperature=0.3,
            )
            return completion.choices[0].message.content or text
        return self._rule_based_rewrite(text, mode)

    def _extractive_summary(self, text: str) -> str:
        sentences = re.split(r"(?<=[.!?])\s+", text.strip())
        if not sentences:
            return "No content to summarize."
        words = re.findall(r"\w+", text.lower())
        freq = Counter(words)
        scores = []
        for sentence in sentences:
            score = sum(freq.get(w.lower(), 0) for w in re.findall(r"\w+", sentence))
            scores.append((score, sentence))
        top = [s for _, s in sorted(scores, reverse=True)[:3]]
        return "\n".join(f"• {line.strip()}" for line in top)

    def _rule_based_rewrite(self, text: str, mode: str) -> str:
        cleaned = " ".join(text.split())
        if mode == "simplify":
            return cleaned.replace("utilize", "use").replace("commence", "start")
        return f"Professional rewrite: {cleaned}"


ai_engine = AIEngine()
