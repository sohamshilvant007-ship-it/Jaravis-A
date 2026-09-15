const fs = require("fs");
const path = require("path");

class FileService {
  constructor() {
    this.name = "JARVIS File Service";
  }

  exists(filePath) {
    return fs.existsSync(path.resolve(filePath));
  }

  read(filePath) {
    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error("File not found.");
    }

    return fs.readFileSync(fullPath, "utf8");
  }

  write(filePath, content) {
    const fullPath = path.resolve(filePath);

    fs.mkdirSync(path.dirname(fullPath), {
      recursive: true
    });

    fs.writeFileSync(
      fullPath,
      String(content ?? ""),
      "utf8"
    );

    return {
      success: true,
      path: fullPath
    };
  }

  delete(filePath) {
    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      return {
        success: false,
        error: "File not found."
      };
    }

    fs.unlinkSync(fullPath);

    return {
      success: true
    };
  }
}

module.exports = FileService;
