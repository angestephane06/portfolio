// Every text of the site, in French and English. A result that has not been checked against
// a report or a run is left empty (`result: null`): the page then says "to be completed"
// instead of showing an invented figure.

export type Lang = "fr" | "en";
type T = Record<Lang, string>;

export interface Project {
  id: string;
  title: T;
  context: T;
  // One plain-language sentence for readers outside the field, shown first.
  summary?: T;
  problem: T;
  approach: T;
  result: T | null;
  // Key figures, each with a plain sentence saying what it measures.
  keyResults?: { value: T; text: T }[];
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
    fr: "Ingénieur en intelligence artificielle",
    en: "Artificial intelligence engineer",
  },
  intro: {
    fr: "Je construis des systèmes d'IA, et surtout je vérifie, chiffres à l'appui, qu'ils font vraiment ce qu'on attend d'eux. Mes projets tournent sur des machines locales : aucune donnée n'est envoyée à un service extérieur.",
    en: "I build AI systems and, above all, I check with hard numbers that they really do what they are expected to do. My projects run on local machines: no data is sent to an outside service.",
  },
  specialties: {
    fr: "Spécialités : évaluation d'agents LLM · Graph RAG multimodal · vision par ordinateur · ingénieur ESIR (imagerie numérique)",
    en: "Focus: LLM agent evaluation · multimodal Graph RAG · computer vision · ESIR engineering degree (digital imaging)",
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
  problem: { fr: "Le problème", en: "The problem" },
  approach: { fr: "Ce que j'ai fait", en: "What I did" },
  whatIDo: { fr: "Ce que je fais", en: "What I do" },
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
    summary: {
      fr: "Peut-on confier un test de cybersécurité à une IA ? J'ai construit un banc d'essai qui fait passer les mêmes 15 épreuves à plusieurs IA, chacune enfermée dans un environnement isolé, jetable et coupé d'Internet, puis compare leurs résultats de façon reproductible.",
      en: "Can an AI be trusted with a security test? I built a test bench that gives the same 15 challenges to several AIs, each locked in an isolated, disposable environment cut off from the Internet, and compares their results reproducibly.",
    },
    problem: {
      fr: "Mesurer la capacité d'agents LLM à résoudre des épreuves de sécurité offensive, sans jamais laisser leurs commandes atteindre la machine hôte ni le réseau, et de façon reproductible.",
      en: "Measure how well LLM agents solve offensive-security challenges, without their commands ever reaching the host or the network, in a reproducible way.",
    },
    approach: {
      fr: "J'ai choisi 15 épreuves publiques de cybersécurité (InterCode-CTF, issues de picoCTF). À chaque partie, l'IA reçoit une machine Linux jetable, coupée d'Internet et sans droits d'administrateur (conteneur Docker), et y tape ses commandes une à une. Tout est décrit dans un fichier de configuration et chaque commande est enregistrée, pour pouvoir rejouer et vérifier chaque partie. Le banc est testé automatiquement à chaque modification (CI GitHub et GitLab) et s'installe en une commande (Ansible).",
      en: "I picked 15 public security challenges (InterCode-CTF, taken from picoCTF). In each run, the AI gets a disposable Linux machine with no Internet access and no admin rights (a Docker container) and types its commands one by one. Everything is described in one configuration file and every command is recorded, so each run can be replayed and checked. The bench is tested automatically on every change (GitHub and GitLab CI) and installs with one command (Ansible).",
    },
    result: {
      fr: "135 épisodes (3 modèles locaux × 15 tâches × 3 graines) : mistral-small3.2 (24B) résout 51 % des épisodes, qwen3:8b 31 %, llama3.1:8b 20 %. Les modèles 8B échouent surtout en répétant la même commande après une erreur (plus d'un quart de leurs tours, contre 9 % pour le 24B).",
      en: "135 episodes (3 local models × 15 tasks × 3 seeds): mistral-small3.2 (24B) solves 51 % of episodes, qwen3:8b 31 %, llama3.1:8b 20 %. The 8B models mostly fail by resending the same command after an error (over a quarter of their turns, against 9 % for the 24B model).",
    },
    keyResults: [
      {
        value: { fr: "51 %", en: "51 %" },
        text: { fr: "des épreuves réussies par le meilleur modèle, mistral-small3.2 (24 milliards de paramètres).", en: "of the challenges solved by the best model, mistral-small3.2 (24 billion parameters)." },
      },
      {
        value: { fr: "20 à 31 %", en: "20 to 31 %" },
        text: { fr: "pour les deux modèles plus petits (8 milliards de paramètres) : la taille du modèle compte le plus.", en: "for the two smaller models (8 billion parameters): model size matters most." },
      },
      {
        value: { fr: "1 tour sur 4", en: "1 turn in 4" },
        text: { fr: "les petits modèles renvoient la même commande après une erreur, au lieu de changer d'approche (9 % des tours pour le grand modèle).", en: "the small models resend the same command after an error instead of changing approach (9 % of turns for the large model)." },
      },
      {
        value: { fr: "135", en: "135" },
        text: { fr: "parties jouées : 3 modèles × 15 épreuves × 3 essais, pour vérifier que les résultats se répètent d'un essai à l'autre.", en: "runs: 3 models × 15 challenges × 3 attempts, to check that results repeat from one attempt to the next." },
      },
    ],
    tech: ["Python", "Docker", "Ollama", "pytest", "GitHub Actions", "GitLab CI", "Ansible", "Streamlit"],
    github: "https://github.com/angestephane06/llm-ctf-bench",
    video: "/media/bench.mp4",
    poster: "/media/bench-poster.jpg",
  },
  {
    id: "multimodal-graph-rag",
    title: { fr: "Graph RAG multimodal, évalué sur vérité terrain", en: "Multimodal Graph RAG, scored against ground truth" },
    context: { fr: "Projet personnel — 2026", en: "Personal project — 2026" },
    summary: {
      fr: "Un assistant qui répond à des questions sur une collection de photos (« combien montrent un chien ? », « trouve des matchs de foot ») en montrant les photos sur lesquelles il s'appuie. Chaque étape est vérifiée contre des réponses de référence.",
      en: "An assistant that answers questions about a photo collection (\"how many show a dog?\", \"find football matches\") and shows the photos it relies on. Every step is checked against reference answers.",
    },
    problem: {
      fr: "Interroger une collection de photos en langage naturel, avec des modèles uniquement locaux, et savoir à quel point les réponses sont justes.",
      en: "Query a photo collection in natural language with local models only, and know how right the answers are.",
    },
    approach: {
      fr: "Une IA de vision (qwen3-vl) décrit chaque photo : légende, lieu, objets visibles. Ces descriptions alimentent une base de données en graphe (Neo4j), pour compter et croiser, et un index de recherche par le sens (ChromaDB). Pour chaque question, un modèle de langage choisit la bonne méthode, écrit la requête (en lecture seule, limitée à 10 secondes) et répond en citant les photos. Tout est mesuré sur 490 photos de la base COCO, dont on connaît le contenu exact.",
      en: "A vision AI (qwen3-vl) describes each photo: caption, setting, visible objects. These descriptions feed a graph database (Neo4j), for counting and cross-checking, and a meaning-based search index (ChromaDB). For each question, a language model picks the right method, writes the query (read-only, limited to 10 seconds) and answers citing the photos. Everything is measured on 490 photos from the COCO dataset, whose exact content is known.",
    },
    result: {
      fr: "Sur 490 images : extraction des objets F1 0,87, routage 40/40, Cypher correct 30/30, précision@5 de 0,94 en recherche sémantique. Les comptages s'écartent de 20 % en médiane de la vérité COCO : l'erreur vient entièrement de la vision, pas du LLM.",
      en: "On 490 images: object extraction F1 0.87, routing 40/40, correct Cypher 30/30, semantic search precision@5 of 0.94. Counts deviate from COCO by 20 % (median): the error comes entirely from vision, not from the LLM.",
    },
    keyResults: [
      {
        value: { fr: "40 / 40", en: "40 / 40" },
        text: { fr: "questions envoyées vers la bonne méthode : compter dans la base de données, ou chercher des photos par leur sens.", en: "questions sent to the right method: counting in the database, or searching photos by meaning." },
      },
      {
        value: { fr: "30 / 30", en: "30 / 30" },
        text: { fr: "questions de comptage traduites sans erreur en requêtes de base de données par le modèle de langage.", en: "counting questions translated without error into database queries by the language model." },
      },
      {
        value: { fr: "94 %", en: "94 %" },
        text: { fr: "des photos proposées par la recherche par le sens sont pertinentes (sur les 5 premières).", en: "of the photos returned by the meaning-based search are relevant (top 5)." },
      },
      {
        value: { fr: "0,87 / 1", en: "0.87 / 1" },
        text: { fr: "qualité du repérage des objets par l'IA de vision, comparé aux annotations de référence (score F1).", en: "quality of object spotting by the vision AI, compared with reference annotations (F1 score)." },
      },
      {
        value: { fr: "20 %", en: "20 %" },
        text: { fr: "écart médian entre les comptages de l'assistant et la réalité : l'erreur vient de la lecture des images, pas du raisonnement.", en: "median gap between the assistant's counts and reality: the error comes from reading the images, not from the reasoning." },
      },
    ],
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
    summary: {
      fr: "Repérer automatiquement une déformation sur un visage en 3D, comme on le fait en imagerie médicale. La méthode classique voit qu'il y a une asymétrie, mais pas de quel côté ; un réseau de neurones apprend à le dire.",
      en: "Automatically spot a deformation on a 3D face, as done in medical imaging. The classic method sees that something is asymmetric, but not on which side; a neural network learns to tell.",
    },
    problem: {
      fr: "Un ICP par plan de symétrie mesure précisément l'asymétrie d'une surface 3D, mais sa carte ne peut pas dire quel côté est déformé : une bosse à gauche crée aussi un écart à l'endroit symétrique, à droite.",
      en: "A symmetry-plane ICP measures the asymmetry of a 3D surface precisely, but its map cannot tell which side is deformed: a bump on the left also creates a gap at the mirrored spot on the right.",
    },
    approach: {
      fr: "J'ai repris la méthode ICP de notre projet ESIR (convertie de MATLAB en Python), puis généré des milliers de visages 3D de synthèse portant des déformations dont on connaît la position exacte. Un réseau de neurones (U-Net) apprend, à partir de la carte d'asymétrie de l'ICP et de la forme du visage, à marquer la zone déformée. Le modèle est ensuite exporté (ONNX) et compressé en entiers 8 bits (INT8) pour tourner sur un simple processeur.",
      en: "I took the ICP method from our ESIR project (converted from MATLAB to Python), then generated thousands of synthetic 3D faces carrying deformations whose exact position is known. A neural network (U-Net) learns, from the ICP asymmetry map and the shape of the face, to mark the deformed area. The model is then exported (ONNX) and compressed to 8-bit integers (INT8) to run on a plain CPU.",
    },
    result: {
      fr: "L'ICP retrouve le plan avec moins de 1° d'erreur, mais seuiller sa carte marque la déformation et son miroir : Dice 0,41 sur 1 000 visages de test. Le U-Net, qui part de cette carte, retrouve le bon côté : Dice 0,88, aucune fausse alerte sur les visages symétriques (0,74 s'il n'a vu que des formes abstraites). En INT8 : même Dice, 3,7 fois plus petit, 1,9 fois plus rapide sur CPU.",
      en: "The ICP finds the plane within 1°, but thresholding its map marks the deformation and its mirror: Dice 0.41 on 1,000 test faces. The U-Net, which starts from that map, finds the right side: Dice 0.88, no false alarm on symmetric faces (0.74 if it only saw abstract shapes). In INT8: same Dice, 3.7 times smaller, 1.9 times faster on CPU.",
    },
    keyResults: [
      {
        value: { fr: "< 1°", en: "< 1°" },
        text: { fr: "d'erreur de la méthode classique (ICP) sur le plan de symétrie : elle mesure bien l'asymétrie.", en: "of error for the classic method (ICP) on the symmetry plane: it measures asymmetry well." },
      },
      {
        value: { fr: "0,41 → 0,88", en: "0.41 → 0.88" },
        text: { fr: "recouvrement entre la zone détectée et la vraie zone déformée (Dice, sur 1), méthode classique puis réseau de neurones, sur 1 000 visages de test.", en: "overlap between the detected area and the true deformed area (Dice, out of 1), classic method then neural network, on 1,000 test faces." },
      },
      {
        value: { fr: "0 %", en: "0 %" },
        text: { fr: "de fausses alertes sur les visages sans déformation, contre 25 % pour la méthode classique.", en: "false alarms on faces without deformation, against 25 % for the classic method." },
      },
      {
        value: { fr: "3,7× / 1,9×", en: "3.7× / 1.9×" },
        text: { fr: "plus petit et plus rapide sur un simple processeur une fois compressé (INT8), sans perte de précision.", en: "smaller and faster on a plain CPU once compressed (INT8), with no loss of accuracy." },
      },
    ],
    tech: ["PyTorch", "U-Net", "ONNX Runtime", "INT8", "ICP", "NumPy / SciPy"],
    github: "https://github.com/angestephane06/asymmetry-unet",
    image: "/asymmetry-faces.png",
  },
  {
    id: "cbir",
    title: { fr: "Recherche d'images par le contenu", en: "Content-based image retrieval" },
    context: { fr: "Projet académique — ESIR3", en: "Academic project — ESIR3" },
    summary: {
      fr: "Retrouver dans une banque d'images celles qui ressemblent à une photo donnée, en comparant une méthode classique et un réseau de neurones.",
      en: "Find the images of a collection that look like a given photo, comparing a classic method with a neural network.",
    },
    problem: {
      fr: "Retrouver dans une base les images visuellement proches d'une image requête, et comparer descripteurs locaux et descripteurs appris.",
      en: "Retrieve the images of a collection that look like a query image, and compare local descriptors with learned ones.",
    },
    approach: {
      fr: "Chaque image est résumée par une signature numérique : soit ses points caractéristiques (SIFT), soit ce qu'en retient un réseau de neurones pré-entraîné (VGG16). Chercher une image revient à trouver les signatures les plus proches, en parcourant toute la base ou avec un index accéléré (KD-Tree). Les deux méthodes sont comparées sur deux banques d'images (COREL et NISTER).",
      en: "Each image is summed up by a numeric signature: either its characteristic points (SIFT), or what a pre-trained neural network (VGG16) retains from it. Finding an image means finding the closest signatures, by scanning the whole collection or with a faster index (KD-tree). The two methods are compared on two image collections (COREL and NISTER).",
    },
    result: {
      fr: "mAP de 0,97 (COREL) et 0,95 (NISTER) avec VGG16, contre 0,95 et 0,83 avec SIFT. Le KD-Tree accélère la recherche SIFT d'environ 500 fois (7,8 s → 0,015 s par requête sur COREL) mais fait baisser sa mAP ; VGG16 répond en moins d'une milliseconde.",
      en: "mAP of 0.97 (COREL) and 0.95 (NISTER) with VGG16, against 0.95 and 0.83 with SIFT. The KD-tree makes SIFT search about 500 times faster (7.8 s → 0.015 s per query on COREL) but lowers its mAP; VGG16 answers in under a millisecond.",
    },
    keyResults: [
      {
        value: { fr: "0,97 et 0,95", en: "0.97 and 0.95" },
        text: { fr: "précision moyenne (mAP, sur 1) du réseau VGG16 sur les deux banques d'images, contre 0,95 et 0,83 pour la méthode classique SIFT.", en: "mean average precision (mAP, out of 1) of the VGG16 network on the two image collections, against 0.95 and 0.83 for the classic SIFT method." },
      },
      {
        value: { fr: "≈ 500×", en: "≈ 500×" },
        text: { fr: "plus rapide pour SIFT grâce à un index KD-Tree (7,8 s → 0,015 s par image), au prix d'une baisse de précision.", en: "faster for SIFT thanks to a KD-tree index (7.8 s → 0.015 s per image), at the cost of lower precision." },
      },
      {
        value: { fr: "< 1 ms", en: "< 1 ms" },
        text: { fr: "par recherche avec VGG16.", en: "per search with VGG16." },
      },
    ],
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

// Plain-language results shown in the hero terminal and the stats band. Every figure comes
// from a published run or report (see the repositories).
export const highlights: { repo: string; line: T }[] = [
  { repo: "llm-ctf-bench", line: { fr: "3 IA face à 15 défis de cybersécurité : la meilleure en réussit la moitié", en: "3 AIs facing 15 security challenges: the best one solves half of them" } },
  { repo: "multimodal-graph-rag", line: { fr: "un assistant photo qui cite ses sources : requêtes justes 30 fois sur 30", en: "a photo assistant that cites its sources: right query 30 times out of 30" } },
  { repo: "asymmetry-unet", line: { fr: "trouve le côté déformé d'un visage 3D : 0,88 sur 1, contre 0,41 en classique", en: "finds the deformed side of a 3D face: 0.88 out of 1, vs 0.41 for the classic method" } },
];

export const stats: { value: T; label: T; hint: T }[] = [
  {
    value: { fr: "135", en: "135" },
    label: { fr: "tests d'IA en cybersécurité", en: "AI security tests" },
    hint: { fr: "chacun dans un environnement isolé et jetable", en: "each in an isolated, disposable environment" },
  },
  {
    value: { fr: "30/30", en: "30/30" },
    label: { fr: "questions bien traduites", en: "questions correctly translated" },
    hint: { fr: "en requêtes de base de données par l'assistant photo", en: "into database queries by the photo assistant" },
  },
  {
    value: { fr: "0,88", en: "0.88" },
    label: { fr: "score de détection sur 1", en: "detection score out of 1" },
    hint: { fr: "zone déformée retrouvée sur des visages 3D (méthode classique : 0,41)", en: "deformed area found on 3D faces (classic method: 0.41)" },
  },
  {
    value: { fr: "100 %", en: "100 %" },
    label: { fr: "exécuté en local", en: "run locally" },
    hint: { fr: "aucune donnée envoyée à un service d'IA extérieur", en: "no data sent to an outside AI service" },
  },
];

export const pillars: { title: T; text: T }[] = [
  {
    title: { fr: "Évaluer des IA", en: "Evaluating AI" },
    text: { fr: "Mesurer ce qu'un système d'IA sait vraiment faire, avec des tests répétables plutôt qu'avec des impressions, et dans des environnements sécurisés quand il exécute des actions.", en: "Measuring what an AI system can really do, with repeatable tests rather than impressions, and in secured environments when it takes actions." },
  },
  {
    title: { fr: "Des assistants qui citent leurs sources", en: "Assistants that cite their sources" },
    text: { fr: "Faire répondre une IA à partir de documents ou d'images, en montrant sur quoi elle s'appuie, pour que chaque réponse puisse être vérifiée.", en: "Having an AI answer from documents or images while showing what it relies on, so that every answer can be checked." },
  },
  {
    title: { fr: "Analyser des images et des formes 3D", en: "Analysing images and 3D shapes" },
    text: { fr: "Détecter, segmenter et comparer, de la photo au scan 3D, avec des modèles assez légers pour tourner sur un simple processeur.", en: "Detecting, segmenting and comparing, from photos to 3D scans, with models light enough to run on a plain CPU." },
  },
];
