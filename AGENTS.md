# AGENTS.md — saintkim12.github.io

> **Status:** normative entry point for agents in this project. There is no `method/` directory here; the sections below are the whole process for this project, and §9 holds the facts specific to this site.

This repository is the owner's personal site: an Astro 4 monorepo published to GitHub Pages, holding a
static landing page, a Markdown blog, and a resume/portfolio package built with Tailwind and React. Its
reader is the owner himself; every user-facing string is Korean.

It is one of two independent repositories in the folder that contains it. The resume's canonical data
lives in the sibling repository `../resume-data`, never here; its side of that boundary is stated in
`../resume-data/AGENTS.md`.

## 1. Confirmation before action

**Ask before you act on your own judgment.** Any step that contains a decision of yours — choosing an
approach, interpreting an ambiguous request, deciding scope, picking which file or symbol to touch,
deciding what to hand to which agent — is put to the owner as one short question first, and the acting
tool call waits for the answer.

- Restating or carrying out a step the owner already named needs no confirmation.
- A lookup with no judgment behind it needs no confirmation.
- Routing that follows the table in §5 is not a judgment of yours: pick the row and proceed. A task
  that fits no row, or fits two rows with different agents, is a judgment and is confirmed first.
- Everything else does. When you cannot tell whether judgment is involved, treat it as involved.
- One confirmation covers exactly what was asked. A later, different judgment is confirmed again.
- Silence is not approval. An unanswered question stops the step, and the step is never run "to be
  helpful" while the question is open.
- A blocked step is reported as blocked with the question that stopped it, not as a partial result.

## 2. File access

**Policy: delegated.** You do not read or edit files.

- This file is injected into your context. Never read it, or `CLAUDE.md`, from disk.
- Every read that §3 or a task requires is delegated to Worker or Explore with the exact paths and
  the question to answer. You work from the report, not from the file.
- If a decision cannot be made from reports alone and genuinely needs file contents in your own
  context, stop immediately, name the file and what you need from it, and ask the owner. Never fall
  back to reading on your own.
- Edits are never yours either: delegate them with exact target paths. One file has one writer.

## 3. Read order

| When | Read |
|---|---|
| any task | this file, then only the package the task touches |
| landing page | `packages/landing/index.html` |
| blog post | `packages/blog/src/content/blog/` |
| published resume copy | `packages/portfolio/src/content/resume/index.md` (written by the sync script, read by no page) |
| what the portfolio actually renders | `packages/portfolio/src/data/*.ts` |
| the build | `scripts/build.mjs` |
| deployment | `.github/workflows/deploy.yml` |
| canonical resume data | `../resume-data/docs/planning/resume-management/resume-data.json` (read-only from here) |

Read the one file the task changes and the file it must stay consistent with. Do not read a whole
package to change one string.

## 4. Runtime values

| Item | Value |
|---|---|
| Tier count | not declared here |
| Lead model | set per session by the owner; not pinned here |
| Worker model | `deepseek/deepseek-flash` |
| Effort | none |
| Budget regime | metered, prepaid balance; the cap is unmeasured and not required |
| Delegation | authorized by the owner; one package or one pipeline step at a time |

The tier count is deliberately not declared, so no measured rate is a prerequisite for starting work.

**These rows are a reading, not a requirement.** Each records what the runtime said when it was read.
Where the live config disagrees with a row, the live value wins, the row is stale, and the difference
is recorded instead of reconciled. A stale row never blocks a task and never justifies opening a
record file to make the numbers agree.

A model that differs from an earlier snapshot is not a finding. Do not report model drift and do not
re-read this section to check it. Record the model a task actually ran on with the task, not here.

An unmeasured cap blocks a cost claim, never the task. Record spend as token burn until a cap is
measured, and never type a number to satisfy this section.

Escalation is decided by rules, never by asking a model whether it needs a bigger one. When the build keeps failing on the same error, stop and report it.

## 5. Delegation

Ownership is by package. One package has one writer per task.

| Path | Owner |
|---|---|
| `packages/landing/`, `packages/blog/`, `packages/portfolio/` | one package per task |
| `scripts/build.mjs`, `scripts/dev.mjs`, `scripts/setup-resume.mjs` | the pipeline; touch only when the task is the pipeline |
| `packages/portfolio/resume-metadata.json` | written by `scripts/setup-resume.mjs`, never hand-edited |
| `.github/workflows/deploy.yml` | deployment; a task that is not deployment leaves it alone |
| `../resume-data/` | a separate repository with its own `AGENTS.md`; a task here reads it and never writes to it |

### Brief for a handoff

| Field | What it must say in this project |
|---|---|
| GOAL | the observable result on the page (a string that reads correctly, a section that renders) — never "update the resume" |
| CONTEXT | the fact being changed, the file that renders it, and the matching line in `../resume-data/docs/planning/resume-management/resume-data.json` |
| OWNED PATHS | the exact files you may change; everything else is read-only |
| NON-GOALS | no redesign, no dependency bumps, no deploy workflow edits, no new copy invented to fill a gap |
| CONSTRAINTS | user-facing text stays Korean; resume facts come from `resume-data.json` and are never authored here; one fact is kept identical across the TS data, the metadata index and `index.md` |
| DONE-WHEN | the changed text renders in the built site and `npm run build` exits 0 |

The worker returns a summary and artifact paths; the lead never absorbs a transcript, and the lead
does not re-read or re-emit the work it delegated.

## 6. Gates

```powershell
npm run build
```

Run it from the project root before handing work back. Exit 0 means the landing page, blog and
portfolio all assemble into `dist/`.

The build checks that the site assembles, not that its content is current or true. Resume facts are
verified by reading `../resume-data/docs/planning/resume-management/resume-data.json`, and a personal
detail is never filled in to make the build pass.

## 7. Records

| Record | Path |
|---|---|
| resume metadata index | `packages/portfolio/resume-metadata.json` |
| published resume copy | `packages/portfolio/src/content/resume/index.md` |

No log or progress file belongs in this repository. Durable content state lives in git history, and a
task reports its progress in the conversation.

## 8. Stop line

Halt the batch and hand the decision to the owner when any of these hits: the same checkpoint fails
twice for the same task; a sampled re-check disagrees with a delivered result; work with no verifier
was tagged verifiable; an approver rejects the same change twice; the cap is reached. Report which
trigger fired, with the evidence. Never continue on a cheaper path to keep a batch alive.

## 9. Project facts

These are the traps in this repository: the things that are true here, are not obvious from the code,
and produce a wrong result when assumed away.

### Layout and build

| Path | What it is |
|---|---|
| `packages/landing/index.html` | static landing page, copied to `dist/index.html` |
| `packages/blog` | Markdown blog served at `/blog/` |
| `packages/portfolio` | resume/portfolio served at `/portfolio/`, Tailwind + React |
| `scripts/build.mjs` | injects resume frontmatter, copies the landing page, then runs `npm install && npm run build` per package |
| `.github/workflows/deploy.yml` | deploys on a push to `main` |

Local: `npm run dev` (blog 4321, portfolio 4322). Build once before any commit: `npm run build`.

### The resume's source of truth is the sibling repository

The canonical data is `docs/planning/resume-management/resume-data.json` in the repository checked out
at `../resume-data` (remote `https://github.com/saintkim12/resume-data.git`); its design notes and its
sync procedure are in that repository — read `../resume-data/AGENTS.md`, do not restate it here.

Read the canonical data from a session here without leaving this repository:

```powershell
# sibling checkout present
Get-Content ../resume-data/docs/planning/resume-management/resume-data.json

# sibling checkout absent
gh api repos/saintkim12/resume-data/contents/docs/planning/resume-management/resume-data.json -H "Accept: application/vnd.github.raw"
```

Sync is manual and run from `../resume-data`; there is no CI wiring. From here, the export's effect on
this repository is narrow and you should expect exactly this much:

1. `packages/portfolio/src/content/resume/index.md` is overwritten with `resume-simple.md`.
2. `index` in `packages/portfolio/resume-metadata.json` is rewritten by `scripts/setup-resume.mjs`,
   which keeps the stored title and description because the export passes neither (the defaults
   `이력서` and an empty description apply only when no stored value exists).
3. `packages/portfolio/src/data/*.ts` is not touched — the page keeps rendering the old mirror until
   those files are edited (see the next section).

Resume content changes start in `resume-data.json`; this repository carries the copy. Never author
career or achievement wording here. Personal data (name, contact) lives only in `../resume-data`'s
`docs/planning/resume-management/.env.local`, never here.

### The portfolio page does not read `index.md`

`packages/portfolio/src/pages/index.astro` renders only the TypeScript data files (since commit
`bcb3530`). Those files are a hand-copied mirror of `resume-data.json`, and no pipeline refreshes them.

| Rendered content | File |
|---|---|
| profile, strengths, skills, contact | `packages/portfolio/src/data/heroData.ts` |
| experience, newest first | `packages/portfolio/src/data/experienceData.ts` |
| site title, description, social links | `packages/portfolio/src/data/config.ts`, `src/data/footerData.ts` |
| projects (currently unused) | `src/data/portfolioData.ts` |

Mapping from the source: `summary.highlights` → `heroData.strengths`, `skills` → `heroData.skills`,
`experience[].projects[]` → `experienceData` (only the three most recent companies are published).

`packages/portfolio/src/content/resume/index.md` is manuscript copy that no page reads, and its
frontmatter is overwritten at build time from `resume-metadata.json`. The README's "resume location"
section disagrees with this; the code is right. When resume content changes, either keep the TypeScript
data and `index.md` in step or ask the owner which one is canonical.

### One fact, every copy

The same fact — years of experience, a strength's wording, a date range — is kept identical across
`packages/portfolio/src/data/heroData.ts`, `packages/portfolio/src/data/experienceData.ts`, the
description in `packages/portfolio/src/data/config.ts`, `packages/portfolio/resume-metadata.json` and
`packages/portfolio/src/content/resume/index.md`. A change that updates one copy and not the others is
incomplete.

Never invent an email address, LinkedIn URL or other personal detail to fill a gap; ask the owner.

