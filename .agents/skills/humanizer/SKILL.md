---
name: humanizer
description: Rewrites AI-generated, overly formal, or marketing-y text into natural, human-sounding prose while keeping every fact and the original intent intact. Use this whenever the user types the /humanize command, asks to "humanize" text, says a draft "sounds like AI" or "too robotic/corporate," or asks to remove AI writing tells (e.g. "it's not just X, it's Y," "a testament to," "game-changing," excessive em dashes, hedging). Also use when editing or polishing any existing draft for a more natural, less promotional voice.
---

# Humanizer

## Purpose

Take text that sounds like it was written by an AI — stiff, hedge-y, full of clichés and marketing hype — and rewrite it so it reads like something a thoughtful person actually wrote. The meaning, facts, and intent must come through unchanged; only the voice changes.

## When to use this skill

- The user types `/humanize` followed by text.
- The user says a draft sounds robotic, like ChatGPT/AI, too corporate, or too "salesy."
- The user asks you to edit, polish, or tighten a piece of writing.
- The user asks you to remove buzzwords, AI clichés, or excessive hedging from text.

## Workflow

1. Read the entire input text first — don't start rewriting line by line before understanding the whole piece.
2. Apply the rules below as a single pass.
3. Re-read the result and check it against the "Preserve meaning" rule before returning it.
4. Output only the revised text, per the Output Format section.

## Rules

### 1. Cut AI writing tells

These phrases are dead giveaways of AI-generated text. Cut them or replace with something a person would actually say:

- "It's not just X, it's Y"
- "In today's rapidly evolving landscape"
- "A testament to"
- "Showcasing"
- "Unlocking the power of"
- "Game-changing" / "Revolutionary" / "Cutting-edge"
- "Marking a pivotal moment"

When you hit one of these, don't just delete it — replace the sentence with a plainer one that says the same thing directly.

### 2. Improve readability

- Prefer simple, everyday words over fancier alternatives ("use" instead of "utilize," "help" instead of "facilitate").
- Vary sentence length. A run of same-length sentences is itself an AI tell — mix short, punchy sentences with longer ones.
- Avoid repetitive sentence structures (e.g., don't open every sentence the same way, don't overuse the same three-part list construction).
- Cut filler that doesn't add information ("it's important to note that," "in order to," "at the end of the day").
- Replace abstract language with concrete specifics. If the source material gives you a specific source, name, or number, use it instead of a vague attribution like "experts say" or "studies show."

### 3. Reduce hedging and tame punctuation

- Trim excessive hedging ("might potentially," "it could perhaps be argued") down to a direct statement, unless the hedge reflects genuine uncertainty the author intended to convey.
- Avoid unnecessary em dashes. Use a period, comma, or colon where a sentence would naturally take one.

### 4. Tone

- Natural and conversational by default.
- Professional when the source material calls for it — humanizing isn't the same as casualizing everything.
- No marketing hype, no corporate jargon, no AI-style enthusiasm ("We're thrilled to announce...").

### 5. Preserve meaning — this is non-negotiable

- Do not add facts, claims, or examples that weren't in the original.
- Do not drop information that matters to the point being made.
- Keep the author's intent and stance intact, even as the wording changes.

## Output format

- Return only the revised text.
- Do not explain what you changed unless the user explicitly asks for an explanation.
- Do not add commentary, a preamble, or a summary before or after the result.

## Examples

**Example 1**

Input: "In today's rapidly evolving digital landscape, our platform isn't just a tool — it's a game-changing solution showcasing truly cutting-edge technology."

Output: "Our platform uses newer technology to help teams get more done, faster."

**Example 2**

Input: "This marks a pivotal moment in the company's journey, a true testament to the team's relentless dedication and unwavering commitment to excellence."

Output: "This is a big moment for the company, and it shows just how hard the team has pushed to get here."

**Example 3**

Input: "Studies show that it is widely believed that remote work could potentially lead to improved productivity in certain contexts."

Output: "A 2023 Stanford study found remote workers were about 13% more productive than their in-office peers."
(Note: only use a specific source like this if one was actually given in the source material — otherwise keep the claim appropriately general rather than inventing a citation.)

## Command

When the user writes `/humanize` followed by text, apply every rule in this skill to that text and return only the rewritten version.
