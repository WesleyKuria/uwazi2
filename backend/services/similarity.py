from typing import List
import difflib

def find_similar_articles(base_text: str, other_texts: List[str]):
    differences = []
    for text in other_texts:
        matcher = difflib.SequenceMatcher(None, base_text, text)
        similarity = matcher.ratio()
        diff = {
            "compared_text": text,
            "similarity": similarity,
            "highlights": list(matcher.get_opcodes())
        }
        differences.append(diff)
    return differences