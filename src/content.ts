// Every text of the site, in French and English. A result that has not been checked against
// a report or a run is left empty (`result: null`): the page then says "to be completed"
// instead of showing an invented figure.

export type Lang = "fr" | "en";
type T = Record<Lang, string>;

export interface Project {
  id: string;
  title: T;
  context: T;
  problem: T;
  approach: T;
  result: T | null;
  tech: string[];
  github?: string;
  report?: string;
  image?: string;
  video?: string;
  poster?: string;
}

export interface Entry {
  period: T;
  title: T;
  place: string;
  desc: T;
}

export const profile = {
  name: "Kouamé KONAN",
  email: "kouame.konan20@inphb.ci",
  github: "https://github.com/angestephane06",
  linkedin: "https://www.linkedin.com/in/kouam%C3%A9konan/",
  cv: "/Kouame-KONAN-CV.pdf",
  location: { fr: "Rennes, France", en: "Rennes, France" },
  headline: {
    fr: "Ingénieur IA — évaluation d'agents LLM et vision par ordinateur",
    en: "AI engineer — LLM agent evaluation and computer vision",
  },
  intro: {
    fr: "Ingénieur ESIR en imagerie numérique. Je construis des systèmes d'IA mesurables et reproductibles : bancs d'évaluation d'agents LLM en environnement isolé, pipelines Graph RAG multimodaux, vision par ordinateur.",
    en: "ESIR engineer in digital imaging. I build measurable, reproducible AI systems: evaluation harnesses for LLM agents in isolated environments, multimodal Graph RAG pipelines, computer vision.",
  },
} as const;

export const ui = {
  projects: { fr: "Projets", en: "Projects" },
  otherProjects: { fr: "Autres projets", en: "Other projects" },
  experience: { fr: "Expérience", en: "Experience" },
  education: { fr: "Formation", en: "Education" },
  skills: { fr: "Compétences", en: "Skills" },
  contact: { fr: "Contact", en: "Contact" },
  featuredTitle: { fr: "Projets phares", en: "Featured projects" },
  available: { fr: "Basé à Rennes", en: "Based in Rennes, France" },
  problem: { fr: "Problème", en: "Problem" },
  approach: { fr: "Approche", en: "Approach" },
  result: { fr: "Résultat", en: "Result" },
  resultTodo: { fr: "Résultat à compléter.", en: "Result to be completed." },
  code: { fr: "Code", en: "Code" },
  report: { fr: "Rapport (PDF)", en: "Report (PDF, French)" },
  cv: { fr: "CV (PDF)", en: "Résumé (PDF)" },
  contactText: {
    fr: "Un poste, un projet, une question sur un de mes travaux : écrivez-moi.",
    en: "A position, a project, a question about my work: write to me.",
  },
} as const;

export const featured: Project[] = [
  {
    id: "llm-ctf-bench",
    title: { fr: "Banc d'évaluation d'agents LLM", en: "LLM agent evaluation harness" },
    context: { fr: "Projet personnel — 2026", en: "Personal project — 2026" },
    problem: {
      fr: "Mesurer la capacité d'agents LLM à résoudre des épreuves de sécurité offensive, sans jamais laisser leurs commandes atteindre la machine hôte ni le réseau, et de façon reproductible.",
      en: "Measure how well LLM agents solve offensive-security challenges, without their commands ever reaching the host or the network, in a reproducible way.",
    },
    approach: {
      fr: "15 épreuves publiques (InterCode-CTF / picoCTF), un conteneur Docker jetable par épisode, sans réseau, sans privilèges et avec délais. Boucle d'agent commune à tous les modèles, campagnes décrites en YAML, reprise après interruption, métriques en CSV/JSON, tableau de bord de relecture des traces, CI GitHub et GitLab, playbook Ansible.",
      en: "15 public challenges (InterCode-CTF / picoCTF), one throw-away Docker container per episode with no network, no privileges and timeouts. Same agent loop for every model, YAML-described resumable campaigns, CSV/JSON metrics, a trace-replay dashboard, GitHub and GitLab CI, an Ansible playbook.",
    },
    result: {
      fr: "135 épisodes (3 modèles locaux × 15 tâches × 3 graines) : mistral-small3.2 (24B) résout 51 % des épisodes, qwen3:8b 31 %, llama3.1:8b 20 %. Les modèles 8B échouent surtout en répétant la même commande après une erreur (plus d'un quart de leurs tours, contre 9 % pour le 24B).",
      en: "135 episodes (3 local models × 15 tasks × 3 seeds): mistral-small3.2 (24B) solves 51 % of episodes, qwen3:8b 31 %, llama3.1:8b 20 %. The 8B models mostly fail by resending the same command after an error (over a quarter of their turns, against 9 % for the 24B model).",
    },
    tech: ["Python", "Docker", "Ollama", "pytest", "GitHub Actions", "GitLab CI", "Ansible", "Streamlit"],
    github: "https://github.com/angestephane06/llm-ctf-bench",
    video: "/media/bench.mp4",
    poster: "/media/bench-poster.jpg",
  },
  {
    id: "multimodal-graph-rag",
    title: { fr: "Graph RAG multimodal, évalué sur vérité terrain", en: "Multimodal Graph RAG, scored against ground truth" },
    context: { fr: "Projet personnel — 2026", en: "Personal project — 2026" },
    problem: {
      fr: "Interroger une collection de photos en langage naturel, avec des modèles uniquement locaux, et savoir à quel point les réponses sont justes.",
      en: "Query a photo collection in natural language with local models only, and know how right the answers are.",
    },
    approach: {
      fr: "qwen3-vl décrit chaque image (légende, scène, objets) ; graphe Neo4j et vecteurs ChromaDB ; un LLM route la question, écrit le Cypher (lecture seule, délai de 10 s) et répond en citant les images. Chaque étape est mesurée sur COCO 2017.",
      en: "qwen3-vl describes each image (caption, scene, objects); a Neo4j graph and ChromaDB vectors; an LLM routes the question, writes the Cypher (read-only, 10 s limit) and answers citing the images. Every stage is scored on COCO 2017.",
    },
    result: {
      fr: "Sur 490 images : extraction des objets F1 0,87, routage 40/40, Cypher correct 30/30, précision@5 de 0,94 en recherche sémantique. Les comptages s'écartent de 20 % en médiane de la vérité COCO : l'erreur vient entièrement de la vision, pas du LLM.",
      en: "On 490 images: object extraction F1 0.87, routing 40/40, correct Cypher 30/30, semantic search precision@5 of 0.94. Counts deviate from COCO by 20 % (median): the error comes entirely from vision, not from the LLM.",
    },
    tech: ["Ollama", "qwen3-vl", "Neo4j", "ChromaDB", "Gradio", "Python"],
    github: "https://github.com/angestephane06/multimodal-graph-rag",
    video: "/media/graphrag.mp4",
    poster: "/media/graphrag-poster.jpg",
  },
  {
    id: "unet",
    title: {
      fr: "Asymétries 3D : ICP contre U-Net, export ONNX INT8",
      en: "3D asymmetry: ICP vs U-Net, ONNX INT8 export",
    },
    context: { fr: "Prolongement d'un projet ESIR3 — 2026", en: "Extension of an ESIR3 project — 2026" },
    problem: {
      fr: "Un ICP par plan de symétrie mesure précisément l'asymétrie d'une surface 3D, mais sa carte ne peut pas dire quel côté est déformé : une bosse à gauche crée aussi un écart à l'endroit symétrique, à droite.",
      en: "A symmetry-plane ICP measures the asymmetry of a 3D surface precisely, but its map cannot tell which side is deformed: a bump on the left also creates a gap at the mirrored spot on the right.",
    },
    approach: {
      fr: "Plan de symétrie par ICP (porté de MATLAB en Python, départ depuis les trois axes de l'ACP), surfaces de synthèse avec vérité terrain exacte, U-Net sur cartes de profondeur et d'asymétrie, export ONNX et quantification INT8 statique avec ONNX Runtime.",
      en: "Symmetry plane by ICP (ported from MATLAB to Python, started from the three PCA axes), synthetic surfaces with exact ground truth, a U-Net on depth and asymmetry maps, ONNX export and static INT8 quantization with ONNX Runtime.",
    },
    result: {
      fr: "L'ICP retrouve le plan avec moins de 1° d'erreur, mais seuiller sa carte marque la déformation et son miroir : Dice 0,41 sur 1 000 visages de test. Le U-Net, qui part de cette carte, retrouve le bon côté : Dice 0,88, aucune fausse alerte sur les visages symétriques (0,74 s'il n'a vu que des formes abstraites). En INT8 : même Dice, 3,7 fois plus petit, 1,9 fois plus rapide sur CPU.",
      en: "The ICP finds the plane within 1°, but thresholding its map marks the deformation and its mirror: Dice 0.41 on 1,000 test faces. The U-Net, which starts from that map, finds the right side: Dice 0.88, no false alarm on symmetric faces (0.74 if it only saw abstract shapes). In INT8: same Dice, 3.7 times smaller, 1.9 times faster on CPU.",
    },
    tech: ["PyTorch", "U-Net", "ONNX Runtime", "INT8", "ICP", "NumPy / SciPy"],
    github: "https://github.com/angestephane06/asymmetry-unet",
    image: "/asymmetry-faces.png",
  },
  {
    id: "cbir",
    title: { fr: "Recherche d'images par le contenu", en: "Content-based image retrieval" },
    context: { fr: "Projet académique — ESIR3", en: "Academic project — ESIR3" },
    problem: {
      fr: "Retrouver dans une base les images visuellement proches d'une image requête, et comparer descripteurs locaux et descripteurs appris.",
      en: "Retrieve the images of a collection that look like a query image, and compare local descriptors with learned ones.",
    },
    approach: {
      fr: "Descripteurs locaux SIFT contre descripteurs globaux d'un CNN pré-entraîné (VGG16), recherche linéaire et par KD-Tree, évaluation par courbes rappel-précision et mAP sur les bases COREL et NISTER.",
      en: "Local SIFT descriptors against global descriptors from a pre-trained CNN (VGG16), linear and KD-tree search, evaluated with precision-recall curves and mAP on the COREL and NISTER datasets.",
    },
    result: {
      fr: "mAP de 0,97 (COREL) et 0,95 (NISTER) avec VGG16, contre 0,95 et 0,83 avec SIFT. Le KD-Tree accélère la recherche SIFT d'environ 500 fois (7,8 s → 0,015 s par requête sur COREL) mais fait baisser sa mAP ; VGG16 répond en moins d'une milliseconde.",
      en: "mAP of 0.97 (COREL) and 0.95 (NISTER) with VGG16, against 0.95 and 0.83 with SIFT. The KD-tree makes SIFT search about 500 times faster (7.8 s → 0.015 s per query on COREL) but lowers its mAP; VGG16 answers in under a millisecond.",
    },
    tech: ["Python", "OpenCV", "VGG16", "scikit-learn"],
    report: "/rapports/recherche-images-cbir.pdf",
  },
];

export const others: Project[] = [
  {
    id: "graph-rag-industriel",
    title: { fr: "Graph RAG pour LLM", en: "Graph RAG for LLMs" },
    context: { fr: "Projet industriel — ESIR3", en: "Industrial project — ESIR3" },
    problem: {
      fr: "Améliorer la pertinence des réponses d'un LLM sur un corpus technique en structurant les connaissances en graphe.",
      en: "Make an LLM's answers on a technical corpus more relevant by structuring knowledge as a graph.",
    },
    approach: {
      fr: "Extraction d'entités et de relations, graphe de connaissances, recherche en deux temps (vecteurs puis expansion dans le graphe), évaluation par précision@5.",
      en: "Entity and relation extraction, a knowledge graph, two-stage retrieval (vectors, then graph expansion), precision@5 evaluation.",
    },
    result: null,
    tech: ["Python", "LLM", "NetworkX", "RAG"],
    github: "https://github.com/angestephane06/projet_industriel_GRAPH-RAG",
  },
  {
    id: "vq-vae",
    title: { fr: "VQ-VAE : modèles génératifs", en: "VQ-VAE generative models" },
    context: { fr: "Projet académique — ESIR3", en: "Academic project — ESIR3" },
    problem: {
      fr: "Comprendre et comparer un VAE et un VQ-VAE à espace latent discret.",
      en: "Understand and compare a VAE with a discrete-latent VQ-VAE.",
    },
    approach: {
      fr: "Implémentation des deux modèles, straight-through estimator, entraînement sur MNIST et CIFAR-10, analyse du codebook par t-SNE et ACP.",
      en: "Both models implemented, straight-through estimator, training on MNIST and CIFAR-10, codebook analysis with t-SNE and PCA.",
    },
    result: null,
    tech: ["PyTorch"],
  },
  {
    id: "cuda",
    title: { fr: "Raytracing et Jeu de la vie en CUDA", en: "Raytracing and Game of Life in CUDA" },
    context: { fr: "Projets académiques — ESIR3 HPC", en: "Academic projects — ESIR3 HPC" },
    problem: {
      fr: "Accélérer sur GPU deux calculs massivement parallèles et mesurer le gain face au CPU.",
      en: "Speed up two massively parallel computations on a GPU and measure the gain over the CPU.",
    },
    approach: {
      fr: "Un thread par pixel ou par cellule, mémoire partagée et cellules fantômes, version distribuée MPI, mesures de speedup sur des tailles croissantes.",
      en: "One thread per pixel or cell, shared memory and ghost cells, a distributed MPI version, speedup measured on growing sizes.",
    },
    result: null,
    tech: ["CUDA", "C++", "MPI"],
  },
  {
    id: "pose",
    title: { fr: "Estimation de pose et géométrie épipolaire", en: "Pose estimation and epipolar geometry" },
    context: { fr: "TP — ESIR3 Vision", en: "Lab work — ESIR3 Vision" },
    problem: {
      fr: "Retrouver la position d'une caméra et la géométrie 3D d'une scène à partir d'images.",
      en: "Recover a camera's pose and a scene's 3D geometry from images.",
    },
    approach: {
      fr: "Calibration, points SIFT, homographie et pose pour la réalité augmentée ; matrice fondamentale par 8 points et RANSAC, triangulation.",
      en: "Calibration, SIFT keypoints, homography and pose for augmented reality; fundamental matrix with 8 points and RANSAC, triangulation.",
    },
    result: null,
    tech: ["OpenCV", "ViSP", "Python"],
  },
  {
    id: "medical",
    title: { fr: "Fusion de segmentations (STAPLE)", en: "Segmentation fusion (STAPLE)" },
    context: { fr: "TP — ESIR3 Imagerie médicale", en: "Lab work — ESIR3 Medical imaging" },
    problem: {
      fr: "Obtenir une segmentation de référence à partir de plusieurs annotations d'experts en désaccord.",
      en: "Derive a reference segmentation from several disagreeing expert annotations.",
    },
    approach: {
      fr: "Algorithme STAPLE (espérance-maximisation) estimant à la fois la vérité terrain et la sensibilité/spécificité de chaque annotateur.",
      en: "The STAPLE algorithm (expectation-maximisation), estimating both the ground truth and each annotator's sensitivity and specificity.",
    },
    result: null,
    tech: ["Python", "NumPy"],
  },
];

export const experience: Entry[] = [
  {
    period: { fr: "Juin — oct. 2026", en: "Jun. — Oct. 2026" },
    title: { fr: "Ingénieur R&D IA multimodale (stage de fin d'études)", en: "Multimodal AI R&D engineer (final-year internship)" },
    place: "eXo maKina",
    desc: {
      fr: "Plateforme d'analyse multimodale par Graph RAG, exécutée hors réseau.",
      en: "Multimodal analysis platform built on Graph RAG, running fully offline.",
    },
  },
  {
    period: { fr: "Juil. — sept. 2025", en: "Jul. — Sep. 2025" },
    title: { fr: "Développeur web et mobile", en: "Web and mobile developer" },
    place: "ID Protect, Paris",
    desc: {
      fr: "Modules d'analyse de données et de détection de fraude.",
      en: "Data analysis and fraud detection modules.",
    },
  },
  {
    period: { fr: "Oct. 2022 — juin 2024", en: "Oct. 2022 — Jun. 2024" },
    title: { fr: "Développeur full-stack et mobile", en: "Full-stack and mobile developer" },
    place: "Akuna Lab, Yamoussoukro",
    desc: {
      fr: "Applications mobiles multiplateformes (Flutter/Dart), bases de données SQL, prototypage rapide.",
      en: "Cross-platform mobile apps (Flutter/Dart), SQL databases, rapid prototyping.",
    },
  },
];

export const education: Entry[] = [
  {
    period: { fr: "2024 — 2026", en: "2024 — 2026" },
    title: { fr: "Diplôme d'ingénieur — Imagerie numérique et IA", en: "Engineering degree (MSc level) — Digital imaging and AI" },
    place: "ESIR, Université de Rennes",
    desc: {
      fr: "Vision par ordinateur, deep learning, HPC, compression vidéo, imagerie 3D.",
      en: "Computer vision, deep learning, HPC, video compression, 3D imaging.",
    },
  },
  {
    period: { fr: "2022 — 2024", en: "2022 — 2024" },
    title: { fr: "Cycle ingénieur — STIC", en: "Engineering programme — ICT" },
    place: "INP-HB, Yamoussoukro",
    desc: {
      fr: "Informatique, télécommunications, systèmes embarqués.",
      en: "Computer science, telecommunications, embedded systems.",
    },
  },
];

export const skills: { title: T; items: string[] }[] = [
  { title: { fr: "Langages", en: "Languages" }, items: ["Python", "C / C++", "CUDA", "SQL", "TypeScript", "Bash"] },
  { title: { fr: "IA et vision", en: "AI and vision" }, items: ["PyTorch", "OpenCV", "scikit-learn", "Ollama", "RAG / Graph RAG", "ONNX"] },
  { title: { fr: "Données", en: "Data" }, items: ["Neo4j", "ChromaDB", "SQLite", "pandas"] },
  { title: { fr: "Ingénierie", en: "Engineering" }, items: ["Linux", "Docker", "Git", "GitHub Actions", "GitLab CI", "Ansible", "pytest"] },
];

// Key results shown in the hero terminal and the stats band. Every figure comes from a
// published run or report (see the repositories).
export const highlights: { repo: string; line: T }[] = [
  {
    repo: "llm-ctf-bench",
    line: { fr: "135 épisodes · 51 % pour le meilleur modèle", en: "135 episodes · 51 % for the best model" },
  },
  {
    repo: "multimodal-graph-rag",
    line: { fr: "Cypher 30/30 · précision@5 0,94", en: "Cypher 30/30 · precision@5 0.94" },
  },
  {
    repo: "asymmetry-unet",
    line: { fr: "visages : U-Net Dice 0,88 contre 0,41 · INT8 3,7× plus léger", en: "faces: U-Net Dice 0.88 vs 0.41 · INT8 3.7× smaller" },
  },
];

export const stats: { value: T; label: T }[] = [
  { value: { fr: "135", en: "135" }, label: { fr: "épisodes d'agents LLM en bac à sable", en: "sandboxed LLM agent episodes" } },
  { value: { fr: "30/30", en: "30/30" }, label: { fr: "requêtes Cypher justes", en: "correct Cypher queries" } },
  { value: { fr: "0,88", en: "0.88" }, label: { fr: "Dice du U-Net sur visages (ICP : 0,41)", en: "U-Net Dice on faces (ICP: 0.41)" } },
  { value: { fr: "100 %", en: "100 %" }, label: { fr: "modèles exécutés en local", en: "models run locally" } },
];
