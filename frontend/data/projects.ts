export type ProjectStatus = "Completed" | "In Progress";
export type ProjectDomain = "Electronics" | "Defence" | "Medical" | "AR/VR";

export interface Project {
  slug: string;
  title: string;
  domains: ProjectDomain[];
  status: ProjectStatus;
  shortDescription: string;
  fullDescription: string;
  techStack?: string[];
  highlights?: string[];
  futureGoals?: string[];
  institution?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "lightning-detection-system",
    title: "Real-Time Lightning Detection & Cloud Logging System",
    domains: ["Electronics", "Defence"],
    status: "Completed",
    institution: "Jabalpur Engineering College / ISRO",
    shortDescription:
      "An indigenous, low-cost real-time lightning detection and cloud logging system — a foundational node for a scalable India-made lightning detection network.",
    fullDescription:
      "This project details the design, development, and implementation of an indigenous, real-time lightning detection and cloud logging system. Driven by the need for a cost-effective alternative to expensive, imported commercial systems (such as Boltek sensors), this project utilizes the AS3935 Franklin Lightning Sensor interfaced with an STM32 Nucleo-F302R8 microcontroller. The embedded system performs continuous atmospheric monitoring, categorizes events, calculates relative strike energy, and assigns strength levels. Data is transmitted via UART to a host machine, where a custom Python application logs all atmospheric events to a local SQLite database and pushes confirmed lightning strikes to a Google Sheets cloud platform. The resulting prototype serves as a foundational node for a scalable, low-cost, India-made lightning detection network.",
    techStack: [
      "AS3935 Franklin Lightning Sensor",
      "STM32 Nucleo-F302R8 (ARM Cortex-M4)",
      "C / STM32 HAL Firmware",
      "Python (pyserial)",
      "SQLite",
      "Google Sheets API",
      "SPI Protocol",
    ],
    highlights: [
      "Custom ferrite rod antenna fabricated in-house and tuned to precisely 500 kHz for optimal RF signal capture",
      "Passive Twin-T RC notch filter designed to suppress localized RF interference and reduce false positives",
      "Polling-based firmware architecture engineered to overcome non-functional IRQ pin hardware defect",
      "Dual-tier data logging: local SQLite database + real-time Google Sheets cloud push",
      "Total build cost a fraction of imported commercial alternatives — proving indigenous viability",
      "Detected and logged significant intracloud (IC) and Cloud-to-Ground lightning activity during testing",
    ],
    futureGoals: [
      "Transition Python logging application to Raspberry Pi 3 A+ for a fully standalone edge node",
      "NavIC integration for precise GPS coordinates and time synchronization",
      "Deploy multiple sensor nodes to create a decentralized Time-of-Arrival (TOA) based national lightning location network",
    ],
  },
  {
    slug: "airway-assessment-ml",
    title: "AI-Based Difficult Airway Assessment ML Model",
    domains: ["Medical"],
    status: "In Progress",
    shortDescription:
      "An ML model for pre-intubation airway assessment that standardizes difficult airway prediction for anesthesiologists, reducing human error in critical clinical decisions.",
    fullDescription:
      "Difficult airway management is one of the most critical challenges in anesthesiology. Current assessment relies on multiple manual scoring systems — Mallampati, LEMON, thyromental distance — which are subjective and inconsistent across practitioners. This project develops a machine learning model that takes patient parameters as input and outputs a standardized difficulty prediction and risk score. The goal is to help clinicians make faster, more confident intubation decisions, reducing adverse outcomes in emergency and surgical settings. The model is being developed with a focus on clinical deployability and real-world integration with pre-operative assessment workflows.",
    highlights: [
      "Standardizes pre-intubation scoring across multiple clinical assessment frameworks",
      "Reduces subjectivity and inter-practitioner inconsistency in difficult airway prediction",
      "Designed for integration into pre-operative assessment workflows",
      "Targets reduction of adverse outcomes in emergency and surgical settings",
    ],
    futureGoals: [
      "Clinical validation with real patient datasets",
      "Integration with hospital pre-operative assessment systems",
      "Expansion to cover broader anesthesiology risk assessment parameters",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByDomain(domain: ProjectDomain): Project[] {
  return PROJECTS.filter((p) => p.domains.includes(domain));
}
