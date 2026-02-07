import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const SIMULATED_LEARNER_PAPERS = [
  {
    title: 'Generative Students: Using LLM-Simulated Student Profiles for Scalable Question Evaluation',
    authors: 'Lu & Wang',
    year: 2024,
    venue: 'L@S 2024',
    url: 'https://arxiv.org/abs/2405.11591',
    influence:
      'Teacher-predicting-student framing produces better profile alignment than direct role-play. The KLI (Knowledge-Learning-Instruction) framework informed how we structure knowledge state dimensions.',
  },
  {
    title: 'Can LLMs Reliably Simulate Human Learner Actions?',
    authors: 'Mannekote et al.',
    year: 2024,
    venue: 'arXiv preprint',
    url: 'https://arxiv.org/abs/2410.02110',
    influence:
      'Identified the "hyper-accuracy distortion" — LLMs struggle to be wrong on purpose and default to correct answers. This motivated our emphasis on detailed misconception descriptions in the knowledge state section.',
  },
  {
    title: 'Simulating Human-Like Learning Dynamics with LLMs',
    authors: 'Yuan et al.',
    year: 2025,
    venue: 'arXiv preprint',
    url: 'https://arxiv.org/abs/2508.05622',
    influence:
      'Introduced deep, surface, and lazy learning profiles with distinct behaviors. Showed that surface learners fail on "trap questions" (same structure, different context) and that self-efficacy should evolve dynamically within a tutoring session.',
  },
  {
    title: 'Simulating Students with LLMs: A Systematic Review',
    authors: 'Marquez-Carpintero et al.',
    year: 2025,
    venue: 'arXiv preprint',
    url: 'https://arxiv.org/abs/2511.06078',
    influence:
      'Comprehensive survey of cognitive modeling approaches for simulated students. Reinforced working memory and metacognitive awareness as key simulation dimensions alongside knowledge state.',
  },
  {
    title: 'Simulated Learners in Educational Technology',
    authors: 'Käser & Alexandron',
    year: 2024,
    venue: 'International Journal of Artificial Intelligence in Education',
    url: 'https://doi.org/10.1007/s40593-024-00417-1',
    influence:
      'Proposed a Turing-like evaluation framework for simulated learners. Emphasized that realistic communication patterns — not just correct knowledge modeling — are essential for passing interaction validity tests.',
  },
];

const FOUNDATIONAL_THEORIES = [
  {
    theory: 'Cognitive Load Theory',
    researchers: 'Sweller, 1988',
    dimension: 'Working Memory',
    description:
      'Working memory has limited capacity. When learners must hold too many steps in mind simultaneously, learning breaks down — not because they lack ability, but because the processing demands exceed capacity.',
  },
  {
    theory: 'Self-Efficacy Theory',
    researchers: 'Bandura, 1997',
    dimension: 'Self-Efficacy',
    description:
      'A learner\'s belief about their own capability directly predicts their effort, persistence, and how they interpret failure. Low self-efficacy learners may give up before trying or change correct answers under pressure.',
  },
  {
    theory: 'Achievement Goal Theory',
    researchers: 'Dweck & Leggett, 1988',
    dimension: 'Goal Orientation',
    description:
      'Mastery-oriented learners seek deep understanding and persist through difficulty. Performance-oriented (grade-seeking) learners optimize for correct answers and may skip conceptual understanding entirely.',
  },
  {
    theory: 'Metacognitive Monitoring',
    researchers: 'Flavell, 1979',
    dimension: 'Metacognitive Awareness',
    description:
      'The ability to monitor one\'s own understanding — knowing what you know and what you don\'t — is a key predictor of learning outcomes. Metacognitively unaware learners don\'t experience confusion where they should.',
  },
  {
    theory: 'Dunning-Kruger Effect',
    researchers: 'Kruger & Dunning, 1999',
    dimension: 'Trait Resolver',
    description:
      'Learners who are confident but unaware of their gaps won\'t seek help — they don\'t know they need it. This interaction between confidence and metacognitive awareness creates a distinct behavioral pattern in the simulation.',
  },
  {
    theory: 'Self-Determination Theory',
    researchers: 'Deci & Ryan, 1985',
    dimension: 'Engagement Level',
    description:
      'Intrinsic motivation arises from autonomy, competence, and relatedness. Disengaged or resistant learners aren\'t being difficult — they often lack one or more of these needs in their learning context.',
  },
];

export default function ResearchPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-xl font-bold tracking-tight">Research & References</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Synthetic Learner Generator is informed by recent research on LLM-simulated students
          and foundational learning science. Each profile dimension — from knowledge state to
          communication style — is grounded in established theories of how real learners think,
          feel, and behave.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Simulated Learner Research</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recent papers on using LLMs to simulate student behavior
          </p>
        </div>
        <div className="space-y-3">
          {SIMULATED_LEARNER_PAPERS.map((paper) => (
            <Card key={paper.url}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium leading-snug">{paper.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {paper.authors}, {paper.year} &middot; {paper.venue}
                    </p>
                  </div>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Read ${paper.title}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">How it informed the tool: </span>
                  {paper.influence}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold">Foundational Learning Science</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Established theories that underpin the profile dimensions
          </p>
        </div>
        <div className="space-y-3">
          {FOUNDATIONAL_THEORIES.map((theory) => (
            <Card key={theory.theory}>
              <CardContent className="p-4 space-y-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{theory.theory}</h3>
                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                      {theory.dimension}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{theory.researchers}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {theory.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
