import type { Publication, ResearchHighlight } from '@/models'

export const publications: Publication[] = [
  {
    title:
      'Malaria Parasite Classification in Thin Blood Smears Based on CNN with SpinalNet and GAN',
    authors: ['Bishwas Dangol', 'Sanjeeb Prasad Panday'],
    venue: 'Journal of Advanced College of Engineering and Management',
    volume: 'Vol. 12, No. 01',
    pages: '131–149',
    year: '2026',
    published: '2026-05-12',
    doi: '10.3126/jacem.v12i01.93926',
    url: 'https://www.nepjol.info/index.php/JACEM/article/view/93926',
    summary:
      'A WGAN-GP synthesises images of rare Plasmodium species to balance the training data, and a CNN with a SpinalNet classification head classifies parasites in thin blood smears, evaluated on real, held-out clinical test sets.',
    keywords: ['Malaria diagnosis', 'Deep learning', 'SpinalNet', 'CNN', 'GAN', 'Medical imaging'],
    projectSlug: 'malaria-xai-thesis',
  },
]

// Headline results from the MSc thesis behind the paper.
export const researchHighlights: ResearchHighlight[] = [
  { value: '0.959', label: 'mAP@0.5 for parasite detection (YOLOv8N)' },
  { value: '97%', label: 'Species classification accuracy (EfficientNet-B0 + SpinalNet)' },
  { value: '100%', label: 'Recall on rare P. ovale and P. malariae test images (custom CNN)' },
  { value: '4', label: 'Explainability methods at both stages: Grad-CAM, Grad-CAM++, LIME, SHAP' },
]
