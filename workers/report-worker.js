// JARVIS Report Worker
// File: workers/report-worker.js

class ReportWorker {
  constructor() {
    this.name = "JARVIS Report Worker";
    this.version = "1.0.0";
  }

  createReport(title, data = {}) {
    const reportTitle = String(title || "JARVIS Report").trim();

    return {
      success: true,
      title: reportTitle,
      createdAt: new Date().toISOString(),
      sections: this.buildSections(data)
    };
  }

  buildSections(data) {
    const sections = [];

    if (data.summary) {
      sections.push({
        heading: "Summary",
        content: String(data.summary)
      });
    }

    if (Array.isArray(data.results)) {
      sections.push({
        heading: "Results",
        content: data.results.map((item, index) => ({
          number: index + 1,
          title: item.title || "Result",
          description:
            item.description ||
            item.snippet ||
            "",
          url: item.url || ""
        }))
      });
    }

    if (data.notes) {
      sections.push({
        heading: "Notes",
        content: String(data.notes)
      });
    }

    if (sections.length === 0) {
      sections.push({
        heading: "Report Data",
        content: data
      });
    }

    return sections;
  }

  toText(report) {
    if (!report) {
      return "";
    }

    let output = `# ${report.title || "JARVIS Report"}\n\n`;

    if (report.createdAt) {
      output += `Created: ${report.createdAt}\n\n`;
    }

    for (const section of report.sections || []) {
      output += `## ${section.heading}\n`;

      if (Array.isArray(section.content)) {
        section.content.forEach((item) => {
          if (typeof item === "object") {
            output += `${item.number || ""}. ${
              item.title || "Item"
            }\n`;

            if (item.description) {
              output += `   ${item.description}\n`;
            }

            if (item.url) {
              output += `   ${item.url}\n`;
            }

            output += "\n";
          } else {
            output += `- ${item}\n`;
          }
        });
      } else if (typeof section.content === "object") {
        output += JSON.stringify(
          section.content,
          null,
          2
        );
        output += "\n";
      } else {
        output += `${section.content}\n`;
      }

      output += "\n";
    }

    return output.trim();
  }

  async run(title, data = {}) {
    const report = this.createReport(title, data);

    return {
      success: true,
      report,
      text: this.toText(report)
    };
  }
}

module.exports = ReportWorker;
